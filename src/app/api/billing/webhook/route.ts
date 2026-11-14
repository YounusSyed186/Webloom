import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!secret || !signature) {
      return NextResponse.json({ error: 'Missing webhook signature or secret' }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (expectedSignature !== signature) {
      console.warn('[Razorpay Webhook] Invalid webhook signature detected.');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    console.log(`[Razorpay Webhook] Received verified event: ${event.event}`);

    // Handle events such as payment.captured, order.paid, subscription.activated
    switch (event.event) {
      case 'payment.captured':
      case 'order.paid':
        console.log('[Razorpay Webhook] Payment confirmed:', event.payload?.payment?.entity?.id);
        break;
      case 'subscription.activated':
        console.log('[Razorpay Webhook] Subscription activated:', event.payload?.subscription?.entity?.id);
        break;
      default:
        console.log(`[Razorpay Webhook] Unhandled event type: ${event.event}`);
    }

    return NextResponse.json({ received: true, status: 'processed' });
  } catch (error: any) {
    console.error('Error processing Razorpay webhook:', error);
    return NextResponse.json({ error: error.message || 'Webhook processing failed' }, { status: 500 });
  }
}

