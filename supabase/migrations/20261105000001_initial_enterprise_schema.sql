-- ============================================================================
-- WEBLOOM NEXT-GENERATION ENTERPRISE SAAS DATABASE MIGRATION
-- Multi-Tenant PostgreSQL Schema with RLS, Tenant Isolation, & Entitlements
-- Migration: 20261105000001_initial_enterprise_schema.sql
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Clean schema helper function for updated_at timestamps
CREATE OR REPLACE FUNCTION set_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 1. ORGANIZATIONS, WORKSPACES & IAM (Multi-Tenancy)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  logo_url TEXT,
  owner_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'editor', 'analyst', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, slug)
);

CREATE TABLE IF NOT EXISTS public.workspace_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor', 'analyst', 'viewer')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.team_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'editor',
  token VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'revoked', 'expired')),
  invited_by UUID NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 2. SUBSCRIPTIONS, PLANS & ENTITLEMENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.plans (
  id VARCHAR(50) PRIMARY KEY, -- 'free', 'starter', 'pro', 'business', 'agency'
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price_inr_monthly INTEGER NOT NULL DEFAULT 0,
  price_inr_annual INTEGER NOT NULL DEFAULT 0,
  price_usd_monthly NUMERIC(10, 2) NOT NULL DEFAULT 0,
  price_usd_annual NUMERIC(10, 2) NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.plan_entitlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id VARCHAR(50) NOT NULL REFERENCES public.plans(id) ON DELETE CASCADE,
  feature_key VARCHAR(100) NOT NULL,
  entitlement_type VARCHAR(50) NOT NULL CHECK (entitlement_type IN ('boolean', 'limit', 'unlimited')),
  limit_value INTEGER DEFAULT 0,
  description TEXT,
  UNIQUE(plan_id, feature_key)
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  plan_id VARCHAR(50) NOT NULL REFERENCES public.plans(id),
  status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('trialing', 'active', 'past_due', 'canceled', 'unpaid', 'paused')),
  billing_cycle VARCHAR(20) NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'annual')),
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  amount INTEGER NOT NULL DEFAULT 0,
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  payment_provider VARCHAR(50) DEFAULT 'razorpay' CHECK (payment_provider IN ('razorpay', 'stripe', 'manual')),
  external_subscription_id VARCHAR(255),
  external_customer_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.usage_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  metric_key VARCHAR(100) NOT NULL,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, metric_key, period_start)
);

-- ============================================================================
-- 3. PROFILES, CUSTOM DOMAINS & PAGE THEMES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE,
  user_id UUID,
  username VARCHAR(60) UNIQUE NOT NULL,
  display_name VARCHAR(120) NOT NULL,
  headline VARCHAR(255),
  bio TEXT,
  avatar_url TEXT,
  cover_url TEXT,
  location VARCHAR(120),
  website_url TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(50),
  verified BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  seo_indexing BOOLEAN DEFAULT TRUE,
  seo_title VARCHAR(255),
  seo_description TEXT,
  og_image_url TEXT,
  custom_domain VARCHAR(255) UNIQUE,
  theme_id VARCHAR(50) DEFAULT 'minimal',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure enterprise columns exist if profiles table pre-existed
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES public.workspaces(id) ON DELETE CASCADE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS cover_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS website_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(50);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS seo_title VARCHAR(255);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS og_image_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS theme_id VARCHAR(50) DEFAULT 'minimal';

CREATE TABLE IF NOT EXISTS public.profile_domains (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  domain VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending_verification' CHECK (status IN ('pending_verification', 'active', 'failed', 'revoked')),
  verification_token VARCHAR(255),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.themes (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  background_type VARCHAR(50) DEFAULT 'solid',
  background_color VARCHAR(50) NOT NULL,
  background_gradient TEXT,
  background_image TEXT,
  primary_color VARCHAR(50) NOT NULL,
  secondary_color VARCHAR(50) NOT NULL,
  text_color VARCHAR(50) NOT NULL,
  card_color VARCHAR(50),
  card_text_color VARCHAR(50),
  button_style VARCHAR(50) DEFAULT 'soft',
  button_radius VARCHAR(20) DEFAULT '12px',
  font_family VARCHAR(50) DEFAULT 'Inter',
  card_style VARCHAR(50) DEFAULT 'border',
  animation VARCHAR(50) DEFAULT 'smooth',
  is_system BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 4. MODULAR PAGE BLOCKS (Block-Based Visual Builder)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.page_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  block_type VARCHAR(50) NOT NULL CHECK (block_type IN (
    'link', 'heading', 'text', 'image', 'gallery', 'video', 'youtube',
    'spotify', 'music_player', 'product', 'booking', 'contact_form',
    'newsletter', 'countdown', 'map', 'faq', 'testimonials', 'pricing',
    'tip_jar', 'divider', 'spacer', 'custom_html'
  )),
  title VARCHAR(255),
  subtitle TEXT,
  config JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_pinned BOOLEAN DEFAULT FALSE,
  schedule_start TIMESTAMPTZ,
  schedule_end TIMESTAMPTZ,
  visibility_rule VARCHAR(50) DEFAULT 'all' CHECK (visibility_rule IN ('all', 'mobile_only', 'desktop_only', 'members_only')),
  click_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.link_routing_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  block_id UUID NOT NULL REFERENCES public.page_blocks(id) ON DELETE CASCADE,
  rule_type VARCHAR(50) NOT NULL CHECK (rule_type IN ('country', 'device', 'referrer', 'time', 'language')),
  operator VARCHAR(20) NOT NULL DEFAULT 'equals',
  match_value TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  priority INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 5. DIGITAL COMMERCE & STOREFRONT
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  product_type VARCHAR(50) NOT NULL CHECK (product_type IN ('digital_download', 'course', 'membership', 'service', 'booking', 'physical')),
  price_inr INTEGER NOT NULL DEFAULT 0,
  price_usd NUMERIC(10, 2) NOT NULL DEFAULT 0,
  compare_at_price_inr INTEGER,
  currency VARCHAR(10) DEFAULT 'INR',
  cover_image_url TEXT,
  gallery_urls JSONB DEFAULT '[]'::jsonb,
  download_file_url TEXT,
  redirect_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  inventory_count INTEGER DEFAULT -1, -- -1 = unlimited
  sales_count INTEGER DEFAULT 0,
  total_revenue_inr INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, slug)
);

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_number VARCHAR(100) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255),
  customer_phone VARCHAR(50),
  subtotal_amount INTEGER NOT NULL,
  discount_amount INTEGER NOT NULL DEFAULT 0,
  total_amount INTEGER NOT NULL,
  currency VARCHAR(10) NOT NULL DEFAULT 'INR',
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'processing', 'paid', 'failed', 'refunded')),
  fulfillment_status VARCHAR(50) NOT NULL DEFAULT 'unfulfilled' CHECK (fulfillment_status IN ('unfulfilled', 'fulfilled', 'partially_fulfilled')),
  payment_provider VARCHAR(50) DEFAULT 'razorpay',
  external_payment_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id),
  product_title VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price INTEGER NOT NULL,
  total_price INTEGER NOT NULL,
  download_token VARCHAR(255) UNIQUE,
  download_expires_at TIMESTAMPTZ
);

-- ============================================================================
-- 6. AUDIENCE CRM, SUBSCRIBERS & MARKETING AUTOMATION
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  phone VARCHAR(50),
  source VARCHAR(100) DEFAULT 'bio_form',
  tags JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  consent_given BOOLEAN DEFAULT TRUE,
  consent_ip VARCHAR(60),
  consent_timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, email)
);

CREATE TABLE IF NOT EXISTS public.email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content_html TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'canceled')),
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  recipients_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.email_automations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  trigger_type VARCHAR(50) NOT NULL CHECK (trigger_type IN ('new_subscriber', 'product_purchase', 'booking_completed')),
  is_active BOOLEAN DEFAULT TRUE,
  steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 7. SERVICES & APPOINTMENT BOOKINGS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  price_inr INTEGER NOT NULL DEFAULT 0,
  currency VARCHAR(10) DEFAULT 'INR',
  location_type VARCHAR(50) DEFAULT 'video' CHECK (location_type IN ('video', 'phone', 'in_person')),
  meeting_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES public.services(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'rescheduled', 'completed', 'canceled')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 8. CREATOR MEDIA KIT & BRAND DEALS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.media_kits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID UNIQUE NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  bio TEXT,
  monthly_views INTEGER DEFAULT 0,
  engagement_rate NUMERIC(5, 2) DEFAULT 0,
  audience_demographics JSONB DEFAULT '{}'::jsonb,
  previous_sponsors JSONB DEFAULT '[]'::jsonb,
  packages JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT TRUE,
  custom_slug VARCHAR(100),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.brand_deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  brand_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255),
  contact_email VARCHAR(255),
  deal_value_inr INTEGER DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'lead' CHECK (status IN ('lead', 'negotiating', 'contract_signed', 'delivering', 'completed', 'cancelled')),
  deadline TIMESTAMPTZ,
  deliverables TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 9. AI SUBSYSTEM & USAGE AUDIT
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.ai_generations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  feature_type VARCHAR(50) NOT NULL CHECK (feature_type IN (
    'profile_builder', 'bio_writer', 'copy_assistant', 'analytics_advisor',
    'conversion_optimizer', 'design_suggester'
  )),
  prompt TEXT NOT NULL,
  result JSONB NOT NULL,
  model VARCHAR(50) NOT NULL DEFAULT 'gemini-2.5-flash',
  tokens_consumed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  month_year VARCHAR(7) NOT NULL, -- '2026-11'
  total_tokens INTEGER DEFAULT 0,
  total_calls INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(organization_id, month_year)
);

-- ============================================================================
-- 10. REAL-TIME TELEMETRY & ANALYTICS AGGREGATES
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  block_id UUID,
  event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('profile_view', 'block_click', 'product_view', 'checkout_start', 'conversion')),
  referrer TEXT,
  source VARCHAR(100),
  device_type VARCHAR(20),
  browser VARCHAR(50),
  os VARCHAR(50),
  country_code VARCHAR(10),
  city VARCHAR(100),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.analytics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views_count INTEGER NOT NULL DEFAULT 0,
  unique_visitors INTEGER NOT NULL DEFAULT 0,
  clicks_count INTEGER NOT NULL DEFAULT 0,
  revenue_amount INTEGER NOT NULL DEFAULT 0,
  UNIQUE(profile_id, date)
);

-- ============================================================================
-- 11. AUDIT LOGS & PLATFORM INTEGRATIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
  user_id UUID,
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(100) NOT NULL,
  resource_id VARCHAR(255),
  metadata JSONB DEFAULT '{}'::jsonb,
  ip_address VARCHAR(60),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 12. PERFORMANCE INDEXING
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_org_members_user ON public.organization_members(user_id);
CREATE INDEX IF NOT EXISTS idx_workspaces_org ON public.workspaces(organization_id);
CREATE INDEX IF NOT EXISTS idx_profiles_workspace ON public.profiles(workspace_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_custom_domain ON public.profiles(custom_domain);
CREATE INDEX IF NOT EXISTS idx_blocks_profile ON public.page_blocks(profile_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_blocks_active ON public.page_blocks(profile_id, is_active);
CREATE INDEX IF NOT EXISTS idx_products_profile ON public.products(profile_id);
CREATE INDEX IF NOT EXISTS idx_orders_profile ON public.orders(profile_id);
CREATE INDEX IF NOT EXISTS idx_subscribers_profile ON public.subscribers(profile_id);
CREATE INDEX IF NOT EXISTS idx_analytics_profile_ts ON public.analytics_events(profile_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_daily_lookup ON public.analytics_daily(profile_id, date);

-- ============================================================================
-- 13. SEED DEFAULT PLANS & SYSTEM ENTITLEMENTS
-- ============================================================================

INSERT INTO public.plans (id, name, description, price_inr_monthly, price_inr_annual, sort_order)
VALUES
  ('free', 'Free Creator', 'Everything you need to share your identity and links online', 0, 0, 1),
  ('starter', 'Starter', 'Advanced themes, link scheduling, and extended analytics', 199, 1990, 2),
  ('pro', 'Pro Creator', 'Custom domains, digital storefront, bookings, and AI writing', 499, 4990, 3),
  ('business', 'Business Studio', 'Full marketing automations, CRM, AI analytics, and smart routing', 999, 9990, 4),
  ('agency', 'Agency & Teams', 'Multi-client workspaces, white-labeling, and audit logging', 2499, 24990, 5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price_inr_monthly = EXCLUDED.price_inr_monthly,
  price_inr_annual = EXCLUDED.price_inr_annual;

-- Seed default entitlements for Free plan
INSERT INTO public.plan_entitlements (plan_id, feature_key, entitlement_type, limit_value, description)
VALUES
  ('free', 'max_profiles', 'limit', 1, 'Maximum number of creator profiles'),
  ('free', 'max_links', 'unlimited', 0, 'Unlimited basic link creation'),
  ('free', 'custom_domain', 'boolean', 0, 'Use your own custom domain'),
  ('free', 'remove_branding', 'boolean', 0, 'Remove Webloom platform branding'),
  ('free', 'digital_store', 'boolean', 0, 'Sell digital downloads and services'),
  ('free', 'ai_assistant', 'boolean', 0, 'AI profile and copywriting assistant'),
  ('free', 'smart_routing', 'boolean', 0, 'Rule-based geolocation/device routing'),
  ('free', 'analytics_retention_days', 'limit', 30, 'Days of telemetry history'),
  
  -- Starter Plan
  ('starter', 'max_profiles', 'limit', 2, 'Maximum number of creator profiles'),
  ('starter', 'max_links', 'unlimited', 0, 'Unlimited links with scheduling'),
  ('starter', 'custom_domain', 'boolean', 0, 'Use your own custom domain'),
  ('starter', 'remove_branding', 'boolean', 0, 'Remove Webloom platform branding'),
  ('starter', 'digital_store', 'boolean', 0, 'Sell digital downloads and services'),
  ('starter', 'ai_assistant', 'boolean', 0, 'AI profile and copywriting assistant'),
  ('starter', 'smart_routing', 'boolean', 0, 'Rule-based geolocation/device routing'),
  ('starter', 'analytics_retention_days', 'limit', 90, 'Days of telemetry history'),

  -- Pro Plan
  ('pro', 'max_profiles', 'limit', 5, 'Maximum number of creator profiles'),
  ('pro', 'max_links', 'unlimited', 0, 'Unlimited links'),
  ('pro', 'custom_domain', 'boolean', 1, 'Use your own custom domain'),
  ('pro', 'remove_branding', 'boolean', 1, 'Remove Webloom platform branding'),
  ('pro', 'digital_store', 'boolean', 1, 'Sell digital downloads and services'),
  ('pro', 'ai_assistant', 'boolean', 1, 'AI profile and copywriting assistant'),
  ('pro', 'smart_routing', 'boolean', 0, 'Rule-based geolocation/device routing'),
  ('pro', 'analytics_retention_days', 'limit', 365, 'Days of telemetry history'),

  -- Business Plan
  ('business', 'max_profiles', 'limit', 15, 'Maximum number of creator profiles'),
  ('business', 'max_links', 'unlimited', 0, 'Unlimited links'),
  ('business', 'custom_domain', 'boolean', 1, 'Use your own custom domain'),
  ('business', 'remove_branding', 'boolean', 1, 'Remove Webloom platform branding'),
  ('business', 'digital_store', 'boolean', 1, 'Sell digital downloads and services'),
  ('business', 'ai_assistant', 'boolean', 1, 'Full AI suite with analytics advisor'),
  ('business', 'smart_routing', 'boolean', 1, 'Rule-based geolocation/device routing'),
  ('business', 'analytics_retention_days', 'unlimited', 0, 'Unlimited telemetry history'),

  -- Agency Plan
  ('agency', 'max_profiles', 'unlimited', 0, 'Unlimited client creator profiles'),
  ('agency', 'max_links', 'unlimited', 0, 'Unlimited links'),
  ('agency', 'custom_domain', 'boolean', 1, 'Unlimited custom domains'),
  ('agency', 'remove_branding', 'boolean', 1, 'Full white-label branding'),
  ('agency', 'digital_store', 'boolean', 1, 'Unlimited storefronts'),
  ('agency', 'ai_assistant', 'boolean', 1, 'Unlimited AI generation'),
  ('agency', 'smart_routing', 'boolean', 1, 'Advanced traffic routing engine'),
  ('agency', 'analytics_retention_days', 'unlimited', 0, 'Unlimited telemetry history')
ON CONFLICT (plan_id, feature_key) DO UPDATE SET
  entitlement_type = EXCLUDED.entitlement_type,
  limit_value = EXCLUDED.limit_value;

-- ============================================================================
-- 14. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

-- 1. Organizations: Users can view organizations where they are members
CREATE POLICY "org_member_access" ON public.organizations
  FOR ALL
  USING (
    auth.uid() = owner_id OR
    EXISTS (
      SELECT 1 FROM public.organization_members
      WHERE organization_members.organization_id = organizations.id
      AND organization_members.user_id = auth.uid()
    )
  );

-- 2. Profiles: Public profiles are visible to all (anon & authenticated)
CREATE POLICY "public_profiles_viewable" ON public.profiles
  FOR SELECT
  USING (is_published = TRUE);

-- 3. Profiles: Editable only by workspace members with editor/admin role
CREATE POLICY "workspace_members_manage_profiles" ON public.profiles
  FOR ALL
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM public.workspace_members
      WHERE workspace_members.workspace_id = profiles.workspace_id
      AND workspace_members.user_id = auth.uid()
    )
  );

-- 4. Page Blocks: Public can read active blocks for published profiles
CREATE POLICY "public_blocks_viewable" ON public.page_blocks
  FOR SELECT
  USING (
    is_active = TRUE AND
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = page_blocks.profile_id
      AND profiles.is_published = TRUE
    )
  );

-- 5. Page Blocks: Managed by profile creators/workspace editors
CREATE POLICY "manage_page_blocks" ON public.page_blocks
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      JOIN public.workspace_members ON workspace_members.workspace_id = profiles.workspace_id
      WHERE profiles.id = page_blocks.profile_id
      AND workspace_members.user_id = auth.uid()
    )
  );

