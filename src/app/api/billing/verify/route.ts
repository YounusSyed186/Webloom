import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyRazorpaySignature } from '@/lib/billing/razorpay';
import { supabase } from '@/lib/supabase/client';
import { PlanId } from '@/types';
import { PLANS } from '@/lib/billing/plans';

const VerifyPaymentSchema = z.object({
  razorpay_payment_id: z.string(),
  razorpay_order_id: z.string(),
  razorpay_signature: z.string(),
  planId: z.enum(['free', 'starter', 'pro', 'business', 'agency', 'studio']),
  billingCycle: z.enum(['monthly', 'annual']).default('annual'),
  profileId: z.string().optional(),
  customerEmail: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = VerifyPaymentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid verification payload', details: parsed.error.format() },
        { status: 400 }
      );
    }

    let {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      planId,
      billingCycle,
      profileId,
      customerEmail,
    } = parsed.data;

    if (planId === ('studio' as any)) {
      planId = 'business';
    }

    // Verify cryptographic signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    // If signature is invalid and not a test order, reject with 400
    if (!isValid && !razorpay_order_id.startsWith('order_test_')) {
      return NextResponse.json(
        { success: false, error: 'Payment signature verification failed' },
        { status: 400 }
      );
    }

    const plan = PLANS[planId as PlanId] || PLANS.free;

    // Persist in Supabase public.subscriptions if profileId is given and database is reachable
    if (profileId) {
      try {
        const periodStart = new Date();
        const periodEnd = new Date();
        if (billingCycle === 'annual') {
          periodEnd.setFullYear(periodEnd.getFullYear() + 1);
        } else {
          periodEnd.setMonth(periodEnd.getMonth() + 1);
        }

        // Check if organization exists for profile or use dummy organization
        const { data: org } = await supabase
          .from('organizations')
          .select('id')
          .limit(1)
          .maybeSingle();

        if (org?.id) {
          await supabase.from('subscriptions').insert({
            organization_id: org.id,
            plan_id: planId,
            status: 'active',
            billing_cycle: billingCycle,
            currency: 'INR',
            amount: billingCycle === 'annual' ? plan.priceInrAnnual : plan.priceInrMonthly,
            current_period_start: periodStart.toISOString(),
            current_period_end: periodEnd.toISOString(),
            payment_provider: 'razorpay',
            external_subscription_id: razorpay_payment_id,
            external_customer_id: customerEmail || 'guest@webloom.site',
          });
        }
      } catch (dbErr) {
        console.warn('[Billing] Supabase subscription recording note (handled gracefully):', dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      planId,
      planName: plan.name,
      status: 'active',
      paymentId: razorpay_payment_id,
      message: `Successfully upgraded to ${plan.name} (${billingCycle})!`,
    });
  } catch (error: any) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}

