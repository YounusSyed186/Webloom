-- ==============================================================================
-- WEBLOOM AI EMBEDDINGS & PGVECTOR SEMANTIC DISCOVERY
-- Migration: 20261105000003_pgvector_embeddings.sql
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS vector;

-- 1. AI Embeddings Table (Gemini Embedding 768-dim)
CREATE TABLE IF NOT EXISTS public.ai_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID,
  entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('profile', 'product', 'template', 'audience_cluster', 'faq')),
  entity_id VARCHAR(255) NOT NULL,
  content_text TEXT NOT NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  embedding vector(768) NOT NULL,
  model_id VARCHAR(100) NOT NULL DEFAULT 'gemini-embedding-2',
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(entity_type, entity_id)
);

CREATE INDEX IF NOT EXISTS idx_ai_embeddings_lookup ON public.ai_embeddings(entity_type, entity_id);

-- 2. Semantic Search RPC for Creator Discovery
CREATE OR REPLACE FUNCTION match_creators(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  profile_id UUID,
  username VARCHAR(60),
  display_name VARCHAR(120),
  headline VARCHAR(255),
  bio TEXT,
  similarity float
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id AS profile_id,
    p.username,
    p.display_name,
    p.headline,
    p.bio,
    1 - (e.embedding <=> query_embedding) AS similarity
  FROM public.ai_embeddings e
  JOIN public.profiles p ON p.id::text = e.entity_id
  WHERE e.entity_type = 'profile'
    AND (1 - (e.embedding <=> query_embedding)) >= match_threshold
    AND p.is_published = TRUE
  ORDER BY e.embedding <=> query_embedding ASC
  LIMIT match_count;
END;
$$;

-- 3. Semantic Search RPC for Product Discovery
CREATE OR REPLACE FUNCTION match_products(
  query_embedding vector(768),
  match_threshold float DEFAULT 0.5,
  match_count int DEFAULT 10
)
RETURNS TABLE (
  product_id UUID,
  title VARCHAR(255),
  description TEXT,
  price_inr INTEGER,
  currency VARCHAR(10),
  cover_image_url TEXT,
  similarity float
)
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT
    pr.id AS product_id,
    pr.title,
    pr.description,
    pr.price_inr,
    pr.currency,
    pr.cover_image_url,
    1 - (e.embedding <=> query_embedding) AS similarity
  FROM public.ai_embeddings e
  JOIN public.products pr ON pr.id::text = e.entity_id
  WHERE e.entity_type = 'product'
    AND (1 - (e.embedding <=> query_embedding)) >= match_threshold
    AND pr.is_active = TRUE
  ORDER BY e.embedding <=> query_embedding ASC
  LIMIT match_count;
END;
$$;

-- Enable RLS
ALTER TABLE public.ai_embeddings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_can_read_embeddings" ON public.ai_embeddings
  FOR SELECT
  USING (true);

CREATE POLICY "creators_manage_embeddings" ON public.ai_embeddings
  FOR ALL
  USING (true)
  WITH CHECK (true);

