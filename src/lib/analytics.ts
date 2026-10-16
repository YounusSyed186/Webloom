import { AnalyticsEvent, AnalyticsSummary, Link } from '@/types';

export function aggregateAnalytics(
  events: AnalyticsEvent[],
  links: Link[],
  timeRange: '7d' | '30d' | '90d' | '1y' = '30d'
): AnalyticsSummary {
  const now = new Date();
  let days = 30;
  if (timeRange === '7d') days = 7;
  if (timeRange === '90d') days = 90;
  if (timeRange === '1y') days = 365;

  const currentCutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  const previousCutoff = new Date(now.getTime() - days * 2 * 24 * 60 * 60 * 1000);

  // Filter events in the current range
  const currentEvents = events.filter(e => new Date(e.timestamp) >= currentCutoff);
  const previousEvents = events.filter(e => {
    const d = new Date(e.timestamp);
    return d >= previousCutoff && d < currentCutoff;
  });

  // Current period totals
  const profileViewEvents = currentEvents.filter(e => e.eventType === 'PROFILE_VIEW');
  const linkClickEvents = currentEvents.filter(e => e.eventType === 'LINK_CLICK');

  const profileViews = profileViewEvents.length;
  const linkClicks = linkClickEvents.length;
  const clickThroughRate = profileViews > 0
    ? Number(((linkClicks / profileViews) * 100).toFixed(1))
    : 0;

  // Previous period totals for trend calculation
  const prevViews = previousEvents.filter(e => e.eventType === 'PROFILE_VIEW').length;
  const prevClicks = previousEvents.filter(e => e.eventType === 'LINK_CLICK').length;
  const prevCtr = prevViews > 0 ? (prevClicks / prevViews) * 100 : 0;

  const calcChange = (cur: number, prev: number) => {
    if (prev === 0) return cur > 0 ? '+100%' : '0%';
    const pct = ((cur - prev) / prev) * 100;
    return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`;
  };

  const viewsChange = calcChange(profileViews, prevViews);
  const clicksChange = calcChange(linkClicks, prevClicks);
  const ctrChange = calcChange(clickThroughRate, prevCtr);

  // Build daily timeline buckets
  const bucketCount = days <= 7 ? 7 : days <= 30 ? 7 : days <= 90 ? 12 : 12;
  const bucketDurationMs = (days * 24 * 60 * 60 * 1000) / bucketCount;

  const viewsChart: { date: string; views: number }[] = [];
  const clicksChart: { date: string; clicks: number }[] = [];

  for (let i = 0; i < bucketCount; i++) {
    const bucketStart = new Date(currentCutoff.getTime() + i * bucketDurationMs);
    const bucketEnd = new Date(currentCutoff.getTime() + (i + 1) * bucketDurationMs);

    const dateLabel = bucketStart.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    const viewsInBucket = profileViewEvents.filter(e => {
      const d = new Date(e.timestamp);
      return d >= bucketStart && d < bucketEnd;
    }).length;

    const clicksInBucket = linkClickEvents.filter(e => {
      const d = new Date(e.timestamp);
      return d >= bucketStart && d < bucketEnd;
    }).length;

    viewsChart.push({ date: dateLabel, views: viewsInBucket });
    clicksChart.push({ date: dateLabel, clicks: clicksInBucket });
  }

  // Device Breakdown
  const deviceCounts: Record<string, number> = { mobile: 0, desktop: 0, tablet: 0 };
  currentEvents.forEach(e => {
    const dev = (e.device || 'mobile').toLowerCase();
    if (dev.includes('mobile')) deviceCounts.mobile++;
    else if (dev.includes('tablet')) deviceCounts.tablet++;
    else deviceCounts.desktop++;
  });

  const totalDeviceEvents = Object.values(deviceCounts).reduce((a, b) => a + b, 0) || 1;
  const deviceBreakdown = [
    {
      name: 'Mobile (iOS & Android)',
      value: Math.round((deviceCounts.mobile / totalDeviceEvents) * 100) || (profileViews > 0 ? 0 : 55),
      color: '#3B82F6',
    },
    {
      name: 'Desktop (macOS & Windows)',
      value: Math.round((deviceCounts.desktop / totalDeviceEvents) * 100) || (profileViews > 0 ? 0 : 38),
      color: '#8B5CF6',
    },
    {
      name: 'Tablet (iPad & Android)',
      value: Math.round((deviceCounts.tablet / totalDeviceEvents) * 100) || (profileViews > 0 ? 0 : 7),
      color: '#10B981',
    },
  ];

  // Top Referrers
  const referrerCounts: Record<string, number> = {};
  currentEvents.forEach(e => {
    const ref = e.referrer || 'Direct / Bio Link';
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
  });

  const totalReferrers = Object.values(referrerCounts).reduce((a, b) => a + b, 0) || 1;
  const topReferrers = Object.entries(referrerCounts)
    .map(([source, visits]) => ({
      source,
      visits,
      percentage: Number(((visits / totalReferrers) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 5);

  if (topReferrers.length === 0) {
    topReferrers.push(
      { source: 'Direct / Bio Link', visits: profileViews, percentage: 100 }
    );
  }

  // Top Locations
  const countryCounts: Record<string, number> = {};
  currentEvents.forEach(e => {
    const c = e.country || 'United States';
    countryCounts[c] = (countryCounts[c] || 0) + 1;
  });

  const countryCodeMap: Record<string, string> = {
    'United States': 'US',
    'United Kingdom': 'GB',
    'Germany': 'DE',
    'Canada': 'CA',
    'Australia': 'AU',
    'India': 'IN',
    'France': 'FR',
    'Japan': 'JP',
    'Netherlands': 'NL',
    'Brazil': 'BR',
  };

  const topLocations = Object.entries(countryCounts)
    .map(([country, visitors]) => ({
      country,
      code: countryCodeMap[country] || 'UN',
      visitors,
    }))
    .sort((a, b) => b.visitors - a.visitors)
    .slice(0, 6);

  if (topLocations.length === 0) {
    topLocations.push({ country: 'United States', code: 'US', visitors: profileViews });
  }

  // Top Links Ranking
  const linkClickCounts: Record<string, number> = {};
  linkClickEvents.forEach(e => {
    if (e.linkId) {
      linkClickCounts[e.linkId] = (linkClickCounts[e.linkId] || 0) + 1;
    }
  });

  const topLinks = links.map(link => {
    const clicks = linkClickCounts[link.id] ?? link.clickCount ?? 0;
    const ctr = profileViews > 0
      ? Number(((clicks / profileViews) * 100).toFixed(1))
      : 0;
    return {
      id: link.id,
      title: link.title,
      url: link.url,
      clicks,
      ctr,
    };
  }).sort((a, b) => b.clicks - a.clicks);

  return {
    profileViews,
    linkClicks,
    clickThroughRate,
    viewsChange,
    clicksChange,
    ctrChange,
    followersCount: profileViews > 0 ? Math.floor(profileViews * 0.12) : 0,
    viewsChart,
    clicksChart,
    deviceBreakdown,
    topReferrers,
    topLocations,
    topLinks,
  };
}
