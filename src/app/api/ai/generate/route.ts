import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AIGateway } from '@/lib/ai/ai-gateway';
import { enforceEntitlement } from '@/lib/billing/entitlements';

const aiRequestSchema = z.object({
  featureType: z.enum([
    'page_builder',
    'profile_builder',
    'bio_writer',
    'analytics_advisor',
    'copy_assistant',
  ]),
  prompt: z.string().min(2).max(4000),
  context: z.record(z.string(), z.any()).optional(),
  planId: z.string().optional(),
  userId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    
    // Normalize aliases
    const featureTypeRaw = rawBody.featureType || rawBody.type || 'bio_writer';
    let featureType = featureTypeRaw;
    if (featureTypeRaw === 'bio') featureType = 'bio_writer';
    if (featureTypeRaw === 'copy') featureType = 'copy_assistant';
    if (featureTypeRaw === 'page') featureType = 'page_builder';
    if (featureTypeRaw === 'profile') featureType = 'profile_builder';
    if (featureTypeRaw === 'analytics') featureType = 'analytics_advisor';

    const prompt = rawBody.prompt || rawBody.payload?.prompt || 'Create a creative bio';
    const context = rawBody.context || rawBody.payload?.context || {};
    const planId = rawBody.planId || 'pro';
    const userId = rawBody.userId || 'user_demo_1';

    // 1. Server-side Entitlement Check
    const entitlement = enforceEntitlement(planId, 'ai_assistant');
    if (!entitlement.authorized) {
      return NextResponse.json(
        { error: entitlement.error, requiresUpgrade: true },
        { status: 403 }
      );
    }

    // 2. Dispatch to Groq LLM Gateway
    if (featureType === 'page_builder' || featureType === 'profile_builder') {
      const result = await AIGateway.generatePageLayout(prompt, context, userId);
      return NextResponse.json(result);
    }

    if (featureType === 'bio_writer' || featureType === 'copy_assistant') {
      const result = await AIGateway.generateBioVariants(prompt, userId);
      return NextResponse.json(result);
    }

    if (featureType === 'analytics_advisor') {
      const result = await AIGateway.analyzeAnalytics(prompt, context || {}, userId);
      return NextResponse.json(result);
    }

    return NextResponse.json(
      { error: `Unsupported AI feature type: ${featureType}` },
      { status: 400 }
    );
  } catch (err: any) {
    console.error('AI Gateway Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal AI Gateway Error' },
      { status: 500 }
    );
  }
}
