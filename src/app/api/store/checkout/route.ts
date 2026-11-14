import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Order, OrderItem } from '@/types';

const checkoutSchema = z.object({
  profileId: z.string().optional(),
  productId: z.string().min(1),
  customerEmail: z.string().email(),
  customerName: z.string().optional().default('Webloom Customer'),
  customerPhone: z.string().optional(),
  paymentProvider: z.enum(['razorpay', 'stripe', 'manual']).default('razorpay'),
});

const ORDERS_STORE: Record<string, Order> = {};

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validated = checkoutSchema.safeParse(rawBody);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid checkout payload', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const { profileId, productId, customerEmail, customerName, customerPhone, paymentProvider } = validated.data;
    const finalProfileId = profileId || 'prof_younus_101';

    // Fixed product pricing mock / lookup
    const unitPrice = 499; // ₹499
    const orderNumber = `WBLM-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 900 + 100)}`;
    const downloadToken = `dl_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

    const item: OrderItem = {
      id: `item_${Date.now()}`,
      orderId: `ord_${Date.now()}`,
      productId,
      productTitle: 'Editorial Creator Starter Kit',
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
      downloadToken,
      downloadExpiresAt: expiresAt,
    };

    const order: Order = {
      id: item.orderId,
      profileId: finalProfileId,
      orderNumber,
      customerEmail,
      customerName,
      customerPhone,
      subtotalAmount: unitPrice,
      discountAmount: 0,
      totalAmount: unitPrice,
      currency: 'INR',
      paymentStatus: 'paid', // Instant confirmation
      fulfillmentStatus: 'fulfilled',
      paymentProvider,
      externalPaymentId: `pay_${Date.now()}`,
      items: [item],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    ORDERS_STORE[order.orderNumber] = order;

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      totalAmount: order.totalAmount,
      currency: order.currency,
      downloadUrl: `/api/store/download/${downloadToken}`,
      message: 'Order placed successfully! Your digital asset is ready for download.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Checkout error' }, { status: 500 });
  }
}

