import { NextRequest, NextResponse } from 'next/server';
import { LinkedTreeStore } from '@/lib/storage';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token || token.length < 5) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid or missing digital download token' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Lookup token in stored orders
    const allOrders: Record<string, any[]> = LinkedTreeStore['getStored']?.('linked_tree_v2_orders', {}) || {};
    let matchedItem: any = null;
    let matchedOrder: any = null;

    for (const pid of Object.keys(allOrders)) {
      const orders = allOrders[pid] || [];
      for (const ord of orders) {
        const item = ord.items?.find((i: any) => i.downloadToken === token);
        if (item) {
          matchedItem = item;
          matchedOrder = ord;
          break;
        }
      }
      if (matchedItem) break;
    }

    // If mock or demo token
    const fileName = matchedItem?.productTitle
      ? `${matchedItem.productTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-bundle.txt`
      : 'webloom-digital-product.txt';

    const fileContent = `================================================================================
WEBLOOM DIGITAL PRODUCT FULFILLMENT
================================================================================

Order Number: ${matchedOrder?.orderNumber || 'ORD-DEMO-2026'}
Item: ${matchedItem?.productTitle || 'Digital Download Package'}
Customer: ${matchedOrder?.customerEmail || 'creator@webloom.site'}
Delivered At: ${new Date().toISOString()}

Thank you for your purchase!
Your digital assets and documentation package are ready.

Documentation: https://webloom.site/docs
Support: support@webloom.site

================================================================================
`;

    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to process digital download', details: error?.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
