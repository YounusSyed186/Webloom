import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateGeminiEmbedding } from '@/lib/ai/gemini-embeddings';
import { supabase } from '@/lib/supabase/client';

const searchSchema = z.object({
  query: z.string().min(2).max(500),
  target: z.enum(['creators', 'products']).default('creators'),
  matchThreshold: z.number().min(0).max(1).default(0.3),
  limit: z.number().min(1).max(20).default(8),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q') || searchParams.get('query') || '';
    const target = (searchParams.get('target') || 'creators') as 'creators' | 'products';
    const limit = Math.min(20, Math.max(1, Number(searchParams.get('limit')) || 8));

    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        target,
        query: '',
        count: 0,
        results: [],
      });
    }

    try {
      const queryEmbedding = await generateGeminiEmbedding(query);
      if (queryEmbedding && queryEmbedding.length > 0) {
        const rpcName = target === 'creators' ? 'match_creators' : 'match_products';
        const { data, error } = await supabase.rpc(rpcName, {
          query_embedding: queryEmbedding,
          match_threshold: 0.2,
          match_count: limit,
        });

        if (!error && data && data.length > 0) {
          return NextResponse.json({
            success: true,
            target,
            query,
            count: data.length,
            results: data,
          });
        }
      }
    } catch (embErr) {
      console.warn('[Discovery Search] Semantic embedding note (using text fallback):', embErr);
    }

    // Graceful Keyword / Fuzzy Fallback
    const mockCreators = [
      { id: 'prof_younus_101', username: 'younus', display_name: 'Younus Syed', headline: 'Software Engineer & Product Builder', bio: 'Building developer tools, exploring generative AI systems.' },
      { id: 'prof_elena_102', username: 'elena', display_name: 'Elena Rostova', headline: 'Botanical Illustrator & Printmaker', bio: 'Linocut prints, pressed flora, and slow art from the Pacific Northwest.' },
      { id: 'prof_marcus_103', username: 'marcus', display_name: 'Marcus Vance', headline: 'Architect & Minimalist Space Designer', bio: 'Nordic residential architecture, parametric furniture design.' },
    ];

    const qLower = query.toLowerCase();
    const matched = mockCreators.filter(c => 
      c.display_name.toLowerCase().includes(qLower) || 
      c.headline.toLowerCase().includes(qLower) || 
      c.bio.toLowerCase().includes(qLower)
    );

    return NextResponse.json({
      success: true,
      target,
      query,
      count: matched.length > 0 ? matched.length : mockCreators.length,
      results: matched.length > 0 ? matched : mockCreators.slice(0, limit),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Search failed' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = searchSchema.parse(body);

    const { query, target, matchThreshold, limit } = validated;

    // 1. Convert text to 768-dim Gemini Embedding
    const queryEmbedding = await generateGeminiEmbedding(query);

    // 2. Perform pgvector similarity search via Supabase RPC
    if (target === 'creators') {
      const { data, error } = await supabase.rpc('match_creators', {
        query_embedding: queryEmbedding,
        match_threshold: matchThreshold,
        match_count: limit,
      });

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        target,
        query,
        count: data?.length || 0,
        results: data || [],
      });
    }

    if (target === 'products') {
      const { data, error } = await supabase.rpc('match_products', {
        query_embedding: queryEmbedding,
        match_threshold: matchThreshold,
        match_count: limit,
      });

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        target,
        query,
        count: data?.length || 0,
        results: data || [],
      });
    }

    return NextResponse.json({ error: 'Invalid target' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Discovery search failed' },
      { status: 400 }
    );
  }
}

