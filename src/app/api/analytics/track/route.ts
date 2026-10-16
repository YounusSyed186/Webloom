import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { profileId, linkId, eventType, referrer, device, country } = body;

    if (!profileId || !eventType) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const userAgent = request.headers.get('user-agent') || '';
    const isMobile = /mobile|iphone|android|ipad/i.test(userAgent);
    const isTablet = /ipad|tablet/i.test(userAgent);
    const detectedDevice = device || (isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop');

    const rawReferrer = referrer || request.headers.get('referer') || 'Direct / Bio Link';
    let parsedReferrer = rawReferrer;
    if (rawReferrer.includes('twitter.com') || rawReferrer.includes('t.co') || rawReferrer.includes('x.com')) {
      parsedReferrer = 'X / Twitter';
    } else if (rawReferrer.includes('github.com')) {
      parsedReferrer = 'GitHub';
    } else if (rawReferrer.includes('linkedin.com')) {
      parsedReferrer = 'LinkedIn';
    } else if (rawReferrer.includes('google.com')) {
      parsedReferrer = 'Google Search';
    }

    const clientCountry = country || request.headers.get('x-vercel-ip-country') || 'United States';

    const event = {
      id: `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      profileId,
      linkId: linkId || null,
      eventType,
      referrer: parsedReferrer,
      device: detectedDevice,
      country: clientCountry,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, event });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
