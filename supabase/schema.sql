-- Linked Tree Database Schema for Supabase
-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  headline TEXT,
  bio TEXT,
  avatar TEXT,
  cover_image TEXT,
  location TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  verified BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  seo_indexing BOOLEAN DEFAULT true,
  custom_domain TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for username search & lookup
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_custom_domain ON public.profiles(custom_domain);

-- 2. Links Table
CREATE TABLE IF NOT EXISTS public.links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  icon TEXT,
  thumbnail TEXT,
  type TEXT DEFAULT 'url',
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  click_count INT DEFAULT 0,
  open_in_new_tab BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_links_profile_id ON public.links(profile_id);
CREATE INDEX IF NOT EXISTS idx_links_sort_order ON public.links(sort_order);

-- 3. Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_social_links_profile_id ON public.social_links(profile_id);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  url TEXT,
  github_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_projects_profile_id ON public.projects(profile_id);

-- 5. Appearance Settings Table
CREATE TABLE IF NOT EXISTS public.appearance_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'midnight',
  background_type TEXT DEFAULT 'gradient',
  background_color TEXT DEFAULT '#09090B',
  background_gradient TEXT DEFAULT 'linear-gradient(135deg, #09090b 0%, #111116 50%, #18181b 100%)',
  background_image TEXT,
  primary_color TEXT DEFAULT '#3B82F6',
  secondary_color TEXT DEFAULT '#94A3B8',
  text_color TEXT DEFAULT '#F8FAFC',
  card_color TEXT DEFAULT 'rgba(24, 24, 27, 0.75)',
  card_text_color TEXT DEFAULT '#F8FAFC',
  button_style TEXT DEFAULT 'glass',
  button_radius TEXT DEFAULT '14px',
  font TEXT DEFAULT 'Geist',
  layout TEXT DEFAULT 'standard',
  card_style TEXT DEFAULT 'glass',
  animation TEXT DEFAULT 'smooth',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Analytics Events Table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  link_id UUID REFERENCES public.links(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  referrer TEXT,
  country TEXT,
  device TEXT,
  browser TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_profile_id ON public.analytics_events(profile_id);
CREATE INDEX IF NOT EXISTS idx_analytics_link_id ON public.analytics_events(link_id);
CREATE INDEX IF NOT EXISTS idx_analytics_timestamp ON public.analytics_events(timestamp);

-- 7. Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activity_profile_id ON public.activity_logs(profile_id);
CREATE INDEX IF NOT EXISTS idx_activity_created_at ON public.activity_logs(created_at);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appearance_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public profiles are readable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Public links are readable by everyone" 
  ON public.links FOR SELECT USING (true);

CREATE POLICY "Public social links are readable by everyone" 
  ON public.social_links FOR SELECT USING (true);

CREATE POLICY "Public projects are readable by everyone" 
  ON public.projects FOR SELECT USING (true);

CREATE POLICY "Public appearance is readable by everyone" 
  ON public.appearance_settings FOR SELECT USING (true);

CREATE POLICY "Anyone can insert analytics events" 
  ON public.analytics_events FOR INSERT WITH CHECK (true);

-- User management policies (owner only)
CREATE POLICY "Users can manage their own profile" 
  ON public.profiles FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own links" 
  ON public.links FOR ALL USING (
    profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their own social links" 
  ON public.social_links FOR ALL USING (
    profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their own projects" 
  ON public.projects FOR ALL USING (
    profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their own appearance" 
  ON public.appearance_settings FOR ALL USING (
    profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can view their own analytics" 
  ON public.analytics_events FOR SELECT USING (
    profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can manage their own activity logs" 
  ON public.activity_logs FOR ALL USING (
    profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())
  );
