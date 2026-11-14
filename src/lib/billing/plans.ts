import { Plan, PlanId, FeatureKey } from '@/types';

export const PLANS: Record<PlanId, Plan> = {
  free: {
    id: 'free',
    name: 'Seed · Free',
    description: 'Essential toolkit to establish your digital identity and showcase links.',
    tagline: 'Everything you need to carve out your corner of the internet.',
    ctaLabel: 'Start for free',
    priceInrMonthly: 0,
    priceInrAnnual: 0,
    priceUsdMonthly: 0,
    priceUsdAnnual: 0,
    features: [
      'Personal Webloom page & custom handle',
      'Unlimited links, notes & social profiles',
      'Portfolio & featured projects showcase',
      'Curated editorial & botanical templates',
      'Core visitor & click analytics',
      'Custom vector QR code card',
    ],
    entitlements: {
      max_profiles: { featureKey: 'max_profiles', type: 'limit', limitValue: 1, description: '1 Creator Profile' },
      max_links: { featureKey: 'max_links', type: 'unlimited', description: 'Unlimited Basic Links' },
      custom_domain: { featureKey: 'custom_domain', type: 'boolean', limitValue: 0, description: 'Custom Domain' },
      remove_branding: { featureKey: 'remove_branding', type: 'boolean', limitValue: 0, description: 'Remove Platform Badge' },
      digital_store: { featureKey: 'digital_store', type: 'boolean', limitValue: 0, description: 'Digital Storefront' },
      ai_assistant: { featureKey: 'ai_assistant', type: 'boolean', limitValue: 0, description: 'AI Writing Assistant' },
      smart_routing: { featureKey: 'smart_routing', type: 'boolean', limitValue: 0, description: 'Smart Link Routing' },
      analytics_retention_days: { featureKey: 'analytics_retention_days', type: 'limit', limitValue: 30, description: '30 Days Telemetry' },
      team_collaboration: { featureKey: 'team_collaboration', type: 'boolean', limitValue: 0, description: 'Team Workspace' },
      instagram_automation: { featureKey: 'instagram_automation', type: 'boolean', limitValue: 0, description: 'Instagram Automation' },
    },
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'Elevated themes, scheduled links, and 90-day audience analytics.',
    tagline: 'Elevated themes and scheduled link curation.',
    ctaLabel: 'Start Starter trial',
    priceInrMonthly: 199,
    priceInrAnnual: 1990,
    priceUsdMonthly: 4,
    priceUsdAnnual: 39,
    badge: 'Popular for Creators',
    features: [
      'Everything in Seed Free, plus:',
      '2 Creator Profiles',
      'Scheduled Links',
      '90 Days Analytics History',
      'Priority Email Support',
    ],
    entitlements: {
      max_profiles: { featureKey: 'max_profiles', type: 'limit', limitValue: 2, description: '2 Creator Profiles' },
      max_links: { featureKey: 'max_links', type: 'unlimited', description: 'Unlimited Links + Scheduling' },
      custom_domain: { featureKey: 'custom_domain', type: 'boolean', limitValue: 0, description: 'Custom Domain' },
      remove_branding: { featureKey: 'remove_branding', type: 'boolean', limitValue: 0, description: 'Remove Platform Badge' },
      digital_store: { featureKey: 'digital_store', type: 'boolean', limitValue: 0, description: 'Digital Storefront' },
      ai_assistant: { featureKey: 'ai_assistant', type: 'boolean', limitValue: 0, description: 'AI Writing Assistant' },
      smart_routing: { featureKey: 'smart_routing', type: 'boolean', limitValue: 0, description: 'Smart Link Routing' },
      analytics_retention_days: { featureKey: 'analytics_retention_days', type: 'limit', limitValue: 90, description: '90 Days Telemetry' },
      team_collaboration: { featureKey: 'team_collaboration', type: 'boolean', limitValue: 0, description: 'Team Workspace' },
      instagram_automation: { featureKey: 'instagram_automation', type: 'boolean', limitValue: 0, description: 'Instagram Automation' },
    },
  },
  pro: {
    id: 'pro',
    name: 'Creator Pro',
    description: 'Custom domain, digital storefront, bookings, and AI assistant.',
    tagline: 'For builders, writers, and designers who want their own domain and full creative control.',
    ctaLabel: 'Create your Pro space',
    priceInrMonthly: 499,
    priceInrAnnual: 4990,
    priceUsdMonthly: 8,
    priceUsdAnnual: 60,
    badge: 'Most Popular',
    isPopular: true,
    features: [
      'Everything in Seed Free, plus:',
      'Custom domain support (yourname.com)',
      'Full typography, layout & palette studio',
      'Blog, journal & long-form publishing',
      'Deep referral & conversion analytics',
      'Remove all Webloom branding & badges',
    ],
    entitlements: {
      max_profiles: { featureKey: 'max_profiles', type: 'limit', limitValue: 5, description: '5 Creator Profiles' },
      max_links: { featureKey: 'max_links', type: 'unlimited', description: 'Unlimited Links' },
      custom_domain: { featureKey: 'custom_domain', type: 'boolean', limitValue: 1, description: 'Custom Domain (CNAME/Apex)' },
      remove_branding: { featureKey: 'remove_branding', type: 'boolean', limitValue: 1, description: '100% White-Label (No Branding)' },
      digital_store: { featureKey: 'digital_store', type: 'boolean', limitValue: 1, description: 'Sell E-books, Presets, Courses' },
      ai_assistant: { featureKey: 'ai_assistant', type: 'boolean', limitValue: 1, description: 'AI Bio & Copywriting Suite' },
      smart_routing: { featureKey: 'smart_routing', type: 'boolean', limitValue: 0, description: 'Smart Link Routing' },
      analytics_retention_days: { featureKey: 'analytics_retention_days', type: 'limit', limitValue: 365, description: '365 Days Telemetry' },
      team_collaboration: { featureKey: 'team_collaboration', type: 'boolean', limitValue: 0, description: 'Team Workspace' },
      instagram_automation: { featureKey: 'instagram_automation', type: 'boolean', limitValue: 0, description: 'Instagram Automation' },
    },
  },
  business: {
    id: 'business',
    name: 'Studio',
    description: 'For small studios, collectives, and freelancers managing multiple digital spaces.',
    tagline: 'For small studios, collectives, and freelancers managing multiple digital spaces.',
    ctaLabel: 'Start Studio trial',
    priceInrMonthly: 999,
    priceInrAnnual: 9990,
    priceUsdMonthly: 19,
    priceUsdAnnual: 168,
    badge: 'Pro Studios',
    features: [
      'Everything in Creator Pro, plus:',
      'Up to 5 custom-domain Webloom spaces',
      'Collaborative team editing & roles',
      'Custom CSS & head script injection',
      'Exportable client & traffic reports',
      'Priority human support',
    ],
    entitlements: {
      max_profiles: { featureKey: 'max_profiles', type: 'limit', limitValue: 15, description: '15 Creator Profiles' },
      max_links: { featureKey: 'max_links', type: 'unlimited', description: 'Unlimited Links' },
      custom_domain: { featureKey: 'custom_domain', type: 'boolean', limitValue: 1, description: 'Custom Domains' },
      remove_branding: { featureKey: 'remove_branding', type: 'boolean', limitValue: 1, description: 'Remove Branding' },
      digital_store: { featureKey: 'digital_store', type: 'boolean', limitValue: 1, description: 'Unlimited Digital Products' },
      ai_assistant: { featureKey: 'ai_assistant', type: 'boolean', limitValue: 1, description: 'Full AI Suite & Analytics Advisor' },
      smart_routing: { featureKey: 'smart_routing', type: 'boolean', limitValue: 1, description: 'Geo & Device Traffic Routing' },
      analytics_retention_days: { featureKey: 'analytics_retention_days', type: 'unlimited', description: 'Unlimited Telemetry Retention' },
      team_collaboration: { featureKey: 'team_collaboration', type: 'boolean', limitValue: 1, description: 'Team Workspaces & Roles' },
      instagram_automation: { featureKey: 'instagram_automation', type: 'boolean', limitValue: 1, description: 'Instagram DM Automations' },
    },
  },
  agency: {
    id: 'agency',
    name: 'Agency & Network',
    description: 'Multi-client workspaces, white-label client handoff, and priority SLA.',
    priceInrMonthly: 2499,
    priceInrAnnual: 24990,
    priceUsdMonthly: 49,
    priceUsdAnnual: 489,
    entitlements: {
      max_profiles: { featureKey: 'max_profiles', type: 'unlimited', description: 'Unlimited Client Profiles' },
      max_links: { featureKey: 'max_links', type: 'unlimited', description: 'Unlimited Links' },
      custom_domain: { featureKey: 'custom_domain', type: 'boolean', limitValue: 1, description: 'Unlimited Custom Domains' },
      remove_branding: { featureKey: 'remove_branding', type: 'boolean', limitValue: 1, description: 'Complete Agency White-Label' },
      digital_store: { featureKey: 'digital_store', type: 'boolean', limitValue: 1, description: 'Client Commerce Stores' },
      ai_assistant: { featureKey: 'ai_assistant', type: 'boolean', limitValue: 1, description: 'Unlimited AI Generation' },
      smart_routing: { featureKey: 'smart_routing', type: 'boolean', limitValue: 1, description: 'Advanced Traffic Matrix' },
      analytics_retention_days: { featureKey: 'analytics_retention_days', type: 'unlimited', description: 'Lifetime Telemetry Data' },
      team_collaboration: { featureKey: 'team_collaboration', type: 'boolean', limitValue: 1, description: 'Enterprise Multi-User Workspaces' },
      instagram_automation: { featureKey: 'instagram_automation', type: 'boolean', limitValue: 1, description: 'Instagram DM Automations' },
    },
  },
};

export function getPlan(planId?: string): Plan {
  if (planId && planId in PLANS) {
    return PLANS[planId as PlanId];
  }
  return PLANS.free;
}

export function checkEntitlement(
  planId: PlanId,
  featureKey: FeatureKey,
  currentUsageCount?: number
): { allowed: boolean; reason?: string; limit?: number | 'unlimited' } {
  const plan = getPlan(planId);
  const entitlement = plan.entitlements[featureKey];

  if (!entitlement) {
    return { allowed: false, reason: `Feature ${featureKey} not supported on your plan.` };
  }

  if (entitlement.type === 'boolean') {
    const isAllowed = Boolean(entitlement.limitValue);
    return {
      allowed: isAllowed,
      reason: isAllowed ? undefined : `${featureKey} requires a higher tier plan (Upgrade to Pro or Business).`,
    };
  }

  if (entitlement.type === 'unlimited') {
    return { allowed: true, limit: 'unlimited' };
  }

  if (entitlement.type === 'limit') {
    const max = entitlement.limitValue ?? 0;
    if (typeof currentUsageCount === 'number' && currentUsageCount >= max) {
      return {
        allowed: false,
        limit: max,
        reason: `Reached maximum limit of ${max} for ${featureKey}. Please upgrade your plan.`,
      };
    }
    return { allowed: true, limit: max };
  }

  return { allowed: false, reason: 'Unknown entitlement configuration' };
}

export interface FormattedPricingTier {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPrice: string;
  annualPrice: string;
  displayPrice: string;
  rawAmount: number; // minor units (paise or cents)
  currency: 'INR' | 'USD';
  periodLabel: string;
  ctaLabel: string;
  featured: boolean;
  badge?: string;
  savingsBadge?: string;
  features: string[];
  bgStyle: string;
  borderColor: string;
  darkBgStyle: string;
  darkBorderColor: string;
  tapeRotate: string;
}

export function getPublicPricingPlans(
  currency: 'INR' | 'USD' = 'USD',
  billingCycle: 'monthly' | 'annual' = 'annual'
): FormattedPricingTier[] {
  const tiers: { id: PlanId; featured: boolean; bgStyle: string; borderColor: string; darkBgStyle: string; darkBorderColor: string; tapeRotate: string }[] = [
    {
      id: 'free',
      featured: false,
      bgStyle: 'linear-gradient(155deg, #F6EFE2 0%, #EDE2CE 100%)',
      borderColor: '#DCD0BC',
      darkBgStyle: 'linear-gradient(155deg, #212620 0%, #191D18 100%)',
      darkBorderColor: '#363F34',
      tapeRotate: '-rotate-2',
    },
    {
      id: 'pro',
      featured: true,
      bgStyle: 'linear-gradient(155deg, #F5E8D3 0%, #EBD7BA 100%)',
      borderColor: '#D6BE9C',
      darkBgStyle: 'linear-gradient(155deg, #2C221A 0%, #211913 100%)',
      darkBorderColor: '#544130',
      tapeRotate: 'rotate-2',
    },
    {
      id: 'business',
      featured: false,
      bgStyle: 'linear-gradient(155deg, #EFE7F2 0%, #E4D8E9 100%)',
      borderColor: '#D2C3D8',
      darkBgStyle: 'linear-gradient(155deg, #261F2B 0%, #1C1720 100%)',
      darkBorderColor: '#3F3447',
      tapeRotate: '-rotate-1',
    },
  ];

  return tiers.map(tier => {
    const plan = PLANS[tier.id];
    const isFree = tier.id === 'free';
    const isUsd = currency === 'USD';

    let monthlyPriceFormatted = '$0';
    let annualPriceFormatted = '$0';
    let displayPrice = '$0';
    let rawAmount = 0;
    let periodLabel = 'forever free';

    if (isFree) {
      displayPrice = isUsd ? '$0' : '₹0';
      monthlyPriceFormatted = displayPrice;
      annualPriceFormatted = displayPrice;
      rawAmount = 0;
      periodLabel = 'forever free';
    } else if (isUsd) {
      monthlyPriceFormatted = `$${plan.priceUsdMonthly}`;
      // In annual mode, show per-month breakdown ($5/mo for Pro, $14/mo for Studio)
      const perMonthAnnual = Math.round(plan.priceUsdAnnual / 12);
      annualPriceFormatted = `$${perMonthAnnual}`;
      displayPrice = billingCycle === 'annual' ? annualPriceFormatted : monthlyPriceFormatted;
      // In annual mode, raw amount charged is full annual amount in cents ($60 or $168)
      rawAmount = billingCycle === 'annual' ? plan.priceUsdAnnual * 100 : plan.priceUsdMonthly * 100;
      periodLabel = 'per month';
    } else {
      // INR
      monthlyPriceFormatted = `₹${plan.priceInrMonthly.toLocaleString('en-IN')}`;
      const perMonthAnnualInr = Math.round(plan.priceInrAnnual / 12);
      annualPriceFormatted = `₹${perMonthAnnualInr.toLocaleString('en-IN')}`;
      displayPrice = billingCycle === 'annual' ? annualPriceFormatted : monthlyPriceFormatted;
      // raw amount charged in paise (₹4,990 = 499000 or ₹9,990 = 999000)
      rawAmount = billingCycle === 'annual' ? plan.priceInrAnnual * 100 : plan.priceInrMonthly * 100;
      periodLabel = 'per month';
    }

    return {
      id: tier.id,
      name: plan.name,
      tagline: plan.tagline || plan.description,
      monthlyPrice: monthlyPriceFormatted,
      annualPrice: annualPriceFormatted,
      displayPrice,
      rawAmount,
      currency,
      periodLabel,
      ctaLabel: plan.ctaLabel || (isFree ? 'Start for free' : 'Upgrade now'),
      featured: tier.featured,
      badge: plan.badge,
      savingsBadge: tier.id === 'pro' ? 'Save 37%' : tier.id === 'business' ? 'Save 26%' : undefined,
      features: plan.features || [],
      bgStyle: tier.bgStyle,
      borderColor: tier.borderColor,
      darkBgStyle: tier.darkBgStyle,
      darkBorderColor: tier.darkBorderColor,
      tapeRotate: tier.tapeRotate,
    };
  });
}

