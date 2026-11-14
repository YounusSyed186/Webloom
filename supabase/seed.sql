-- ==============================================================================
-- Webloom Supabase Seed Data
-- Run this in Supabase SQL Editor to seed the demo account and sample data
-- ==============================================================================

-- 1. Insert or update the demo profile
INSERT INTO public.profiles (
  id,
  username,
  display_name,
  headline,
  bio,
  avatar,
  cover_image,
  location,
  website,
  email,
  verified,
  is_published,
  seo_indexing
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'younus',
  'Younus Syed',
  'Software Engineer & Product Builder',
  'Building developer tools, exploring generative AI systems, and crafting high-performance personal web spaces. Welcome to my Webloom 🌱',
  '/images/avatar.jpg',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
  'San Francisco, CA',
  'https://webloom.site/younus',
  'demo@webloom.site',
  true,
  true,
  true
)
ON CONFLICT (username) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  headline = EXCLUDED.headline,
  bio = EXCLUDED.bio,
  avatar = EXCLUDED.avatar,
  cover_image = EXCLUDED.cover_image,
  location = EXCLUDED.location,
  website = EXCLUDED.website,
  email = EXCLUDED.email,
  verified = EXCLUDED.verified,
  is_published = EXCLUDED.is_published;

-- 2. Insert Social Links
INSERT INTO public.social_links (profile_id, platform, url, sort_order)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'github', 'https://github.com/younus', 0),
  ('a0000000-0000-0000-0000-000000000001', 'x', 'https://x.com/younus_dev', 1),
  ('a0000000-0000-0000-0000-000000000001', 'linkedin', 'https://linkedin.com/in/younus-syed', 2),
  ('a0000000-0000-0000-0000-000000000001', 'youtube', 'https://youtube.com/@younustech', 3),
  ('a0000000-0000-0000-0000-000000000001', 'discord', 'https://discord.gg/buildspace', 4),
  ('a0000000-0000-0000-0000-000000000001', 'spotify', 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M', 5)
ON CONFLICT DO NOTHING;

-- 3. Insert Showcase Links
INSERT INTO public.links (profile_id, title, description, url, icon, thumbnail, type, is_active, sort_order, click_count, open_in_new_tab)
VALUES
  (
    'a0000000-0000-0000-0000-000000000001',
    'Interactive Portfolio & Work',
    'Explore my latest engineering work, open source libraries, and design concepts.',
    'https://webloom.site/younus',
    'Globe',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=300&auto=format&fit=crop&q=80',
    'url',
    true,
    0,
    3842,
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000001',
    'GitHub Repositories & OSS Agents',
    'Star my open-source Next.js templates, AI agents, and CLI utilities.',
    'https://github.com/younus',
    'Github',
    NULL,
    'social',
    true,
    1,
    2915,
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000001',
    'Download Senior Full-Stack Resume (PDF)',
    'Verified 1-page engineering summary with enterprise impact metrics.',
    'https://younus.dev/resume.pdf',
    'FileText',
    NULL,
    'file',
    true,
    2,
    1420,
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000001',
    'Watch: Building Modern Web Apps with Next.js 15 & Supabase',
    '45-minute masterclass on real-time architectures, optimistic state, and RLS security.',
    'https://youtube.com/watch?v=demo-video',
    'Video',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80',
    'video',
    true,
    3,
    940,
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000001',
    'Book a 1:1 Advisory Session',
    'Architecture reviews, frontend performance audits, and startup advising.',
    'https://cal.com/younus',
    'ExternalLink',
    NULL,
    'url',
    true,
    4,
    685,
    true
  ),
  (
    'a0000000-0000-0000-0000-000000000001',
    'Curated Coding & Focus Playlist (Spotify)',
    'Atmospheric ambient and deep electronic mixes for sustained flow state.',
    'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
    'Music',
    NULL,
    'music',
    true,
    5,
    520,
    true
  )
ON CONFLICT DO NOTHING;

-- 4. Insert Featured Projects
INSERT INTO public.projects (profile_id, title, description, image, url, github_url, technologies, featured, sort_order)
VALUES
  (
    'a0000000-0000-0000-0000-000000000001',
    'PropertyLedge SaaS',
    'Enterprise commercial and residential property management platform with automated lease tracking and rent reconciliation.',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    'https://propertyledge.app',
    'https://github.com/younus/propertyledge',
    ARRAY['Next.js 15', 'Supabase', 'Tailwind CSS', 'TypeScript', 'Stripe'],
    true,
    0
  ),
  (
    'a0000000-0000-0000-0000-000000000001',
    'Agentic Studio AI',
    'Autonomous multi-agent workflow orchestration UI built with WebSockets and streaming LLM function tools.',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80',
    'https://agenticstudio.dev',
    'https://github.com/younus/agentic-studio',
    ARRAY['React 19', 'FastAPI', 'PostgreSQL', 'Docker', 'Framer Motion'],
    true,
    1
  ),
  (
    'a0000000-0000-0000-0000-000000000001',
    'VectorFlow Engine',
    'High-throughput lightweight vector search indexing service capable of handling 50k QPS on edge nodes.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
    'https://vectorflow.io',
    'https://github.com/younus/vectorflow',
    ARRAY['Rust', 'WebAssembly', 'TypeScript', 'Node.js'],
    false,
    2
  ),
  (
    'a0000000-0000-0000-0000-000000000001',
    'BloomKit Design System',
    'Accessible, dark-mode native component system crafted with Tailwind CSS and Radix UI primitives.',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    'https://bloomkit.dev',
    'https://github.com/younus/bloomkit',
    ARRAY['Tailwind CSS', 'Radix UI', 'Storybook', 'Figma'],
    true,
    3
  )
ON CONFLICT DO NOTHING;

-- 5. Insert Appearance Settings
INSERT INTO public.appearance_settings (
  profile_id,
  theme,
  background_type,
  background_color,
  background_gradient,
  primary_color,
  secondary_color,
  text_color,
  card_color,
  card_text_color,
  button_style,
  button_radius,
  font,
  layout,
  card_style,
  animation
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'midnight',
  'gradient',
  '#09090B',
  'linear-gradient(135deg, #09090b 0%, #111116 50%, #18181b 100%)',
  '#A78BFA',
  '#A6A7AE',
  '#F4F3F0',
  'rgba(24, 24, 27, 0.75)',
  '#F4F3F0',
  'glass',
  '14px',
  'Geist',
  'standard',
  'glass',
  'smooth'
)
ON CONFLICT (profile_id) DO NOTHING;

-- 6. Insert Activity Logs
INSERT INTO public.activity_logs (profile_id, title, type, created_at)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Theme updated to "Midnight Obsidian"', 'theme', NOW() - INTERVAL '2 hours'),
  ('a0000000-0000-0000-0000-000000000001', 'Added project "PropertyLedge SaaS"', 'project', NOW() - INTERVAL '1 day'),
  ('a0000000-0000-0000-0000-000000000001', 'New link "Interactive Portfolio & Work" published', 'link', NOW() - INTERVAL '3 days'),
  ('a0000000-0000-0000-0000-000000000001', 'Added project "Agentic Studio AI"', 'project', NOW() - INTERVAL '4 days')
ON CONFLICT DO NOTHING;


-- 7. Insert Organization & Workspace
INSERT INTO public.organizations (id, name, slug, owner_id)
VALUES ('10000000-0000-0000-0000-000000000001', 'Younus Studio', 'younus-studio', 'a0000000-0000-0000-0000-000000000001')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.workspaces (id, organization_id, name, slug, is_default)
VALUES ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Default Workspace', 'default', true)
ON CONFLICT DO NOTHING;

-- Link profile to workspace
UPDATE public.profiles
SET workspace_id = '20000000-0000-0000-0000-000000000001'
WHERE id = 'a0000000-0000-0000-0000-000000000001';

-- 8. Insert Digital Products
INSERT INTO public.products (id, profile_id, title, slug, description, product_type, price_inr, price_usd, currency, cover_image_url, download_file_url, sales_count, is_active)
VALUES 
  (
    '30000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'Next.js 15 Production SaaS Starter Kit',
    'nextjs-15-saas-starter',
    'Battle-tested Next.js App Router codebase with Supabase authentication, multi-tenant workspace isolation, Stripe checkout, and Tailwind CSS.',
    'digital_download',
    999,
    14,
    'INR',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80',
    'https://downloads.webloom.site/packages/nextjs15-enterprise-saas-v2.zip',
    142,
    true
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'Autonomous AI Agents Blueprint & Prompts',
    'ai-agents-blueprint',
    'System prompts, routing patterns, and code recipes for building production-grade LLM agents.',
    'digital_download',
    499,
    7,
    'INR',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    'https://downloads.webloom.site/packages/agentic-ai-blueprints.pdf',
    89,
    true
  )
ON CONFLICT DO NOTHING;

-- 9. Insert Page Blocks
INSERT INTO public.page_blocks (id, profile_id, block_type, title, subtitle, config, is_active, is_pinned, sort_order)
VALUES
  (
    '40000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'heading',
    'Featured Resources & Downloads',
    'Free tools and open-source project boilerplates',
    '{}'::jsonb,
    true,
    false,
    0
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'product',
    'Next.js 15 Production SaaS Starter Kit',
    'Full-stack boilerplate with Supabase Auth, Stripe, and Tailwind v4',
    '{"price": 999, "currency": "INR", "originalPrice": 1999, "badge": "Bestseller", "downloadUrl": "https://downloads.webloom.site/packages/nextjs15-enterprise-saas-v2.zip"}'::jsonb,
    true,
    true,
    1
  ),
  (
    '40000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000001',
    'countdown',
    'Next Cohort: AI Agents Masterclass Launch',
    'Early bird registration closes in:',
    '{"targetDate": "2026-11-30T23:59:59Z", "ctaText": "Claim Early Bird Pass (₹499)", "ctaUrl": "https://webloom.site/younus/checkout/cohort"}'::jsonb,
    true,
    false,
    2
  ),
  (
    '40000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000001',
    'newsletter',
    'Join The Webloom Creator Dispatch',
    'Weekly teardowns on creator monetization, AI tools, and frontend engineering.',
    '{"placeholder": "Enter your email address...", "buttonText": "Subscribe", "disclaimer": "No spam. One-click unsubscribe anytime."}'::jsonb,
    true,
    false,
    3
  ),
  (
    '40000000-0000-0000-0000-000000000005',
    'a0000000-0000-0000-0000-000000000001',
    'booking',
    'Book a 1:1 Engineering Advisory Call',
    'Architecture review, frontend performance audit, or startup advisory session with Younus.',
    '{"durationMinutes": 45, "price": 2499, "currency": "INR", "availability": ["Mon", "Wed", "Fri"]}'::jsonb,
    true,
    false,
    4
  )
ON CONFLICT DO NOTHING;

-- 10. Insert Subscribers
INSERT INTO public.subscribers (profile_id, email, name, source, tags, is_active, consent_given)
VALUES
  ('a0000000-0000-0000-0000-000000000001', 'marcus.vance@ambientlabs.com', 'Marcus Vance', 'Newsletter Block', '["newsletter", "engineering", "early-adopter"]'::jsonb, true, true),
  ('a0000000-0000-0000-0000-000000000001', 'charlotte.dupont@sorbonne.fr', 'Charlotte Dupont', 'Public Profile', '["newsletter", "design"]'::jsonb, true, true),
  ('a0000000-0000-0000-0000-000000000001', 'rahul.deshmukh@hypergrowth.co', 'Rahul Deshmukh', 'Lead Magnet', '["customer", "saas-starter", "vip"]'::jsonb, true, true)
ON CONFLICT DO NOTHING;

-- 11. Insert Services & Bookings
INSERT INTO public.services (id, profile_id, title, description, duration_minutes, price_inr, currency, is_active)
VALUES
  ('50000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', '1:1 Technical Architecture Consultation', 'Deep dive into your Next.js and Supabase database architecture.', 45, 2499, 'INR', true),
  ('50000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'Frontend Performance Audit & Quick Fixes', 'Targeted performance audit of Core Web Vitals (LCP, INP, CLS).', 20, 999, 'INR', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.bookings (id, profile_id, service_id, client_name, client_email, scheduled_at, duration_minutes, status, notes)
VALUES
  ('60000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001', 'Sarah Jenkins', 'sarah.jenkins@fintechprime.com', '2026-11-12T15:00:00Z', 45, 'confirmed', 'Architecture review and database optimization session.'),
  ('60000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000002', 'Arjun Mehta', 'arjun.mehta@devstudio.in', '2026-11-15T11:00:00Z', 20, 'confirmed', 'Core Web Vitals and LCP audit.')
ON CONFLICT DO NOTHING;
