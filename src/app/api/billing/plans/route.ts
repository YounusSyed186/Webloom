import { NextRequest, NextResponse } from 'next/server';
import { getPublicPricingPlans, PLANS } from '@/lib/billing/plans';

/**
 * GET /api/billing/plans
 * Query parameters:
 *   - currency: 'USD' | 'INR' (default: 'USD')
 *   - cycle: 'monthly' | 'annual' (default: 'annual')
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const currency = (searchParams.get('currency')?.toUpperCase() === 'INR' ? 'INR' : 'USD') as 'INR' | 'USD';
    const cycle = (searchParams.get('cycle')?.toLowerCase() === 'monthly' ? 'monthly' : 'annual') as 'monthly' | 'annual';

    const formattedPlans = getPublicPricingPlans(currency, cycle);

    return NextResponse.json({
      success: true,
      currency,
      cycle,
      plans: formattedPlans,
      rawPlans: PLANS,
      gateway: {
        provider: 'razorpay',
        keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || 'rzp_test_TSYMqlKTLTRNMn',
        supportsInternational: true,
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error: any) {
    console.error('Error fetching billing plans:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch billing plans' },
      { status: 500 }
    );
  }
}

