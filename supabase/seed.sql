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
