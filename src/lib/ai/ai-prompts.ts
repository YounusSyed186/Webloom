import { z } from 'zod';

export const AI_SYSTEM_INSTRUCTION = `You are Webloom's Principal AI Creator Architect & Business Strategist.
Your goal is to build sophisticated, high-converting, editorial-grade creator platforms.
Always output clean, validated JSON adhering strictly to the requested schema. Never output markdown codeblocks around JSON unless requested.`;

// 1. Page Builder Structured Schema
export const PageBuilderOutputSchema = z.object({
  pageTitle: z.string(),
  headline: z.string(),
  bio: z.string(),
  themeRecommendation: z.object({
    themeId: z.string(),
    background: z.string(),
    accentColor: z.string(),
    font: z.string(),
  }),
  blocks: z.array(
    z.object({
      blockType: z.enum([
        'link',
        'heading',
        'product',
        'countdown',
        'newsletter',
        'booking',
        'divider',
      ]),
      title: z.string(),
      subtitle: z.string().optional(),
      config: z.record(z.string(), z.any()),
    })
  ),
  rationale: z.string(),
});

export type PageBuilderOutput = z.infer<typeof PageBuilderOutputSchema>;

// 2. Bio Rewriter Structured Schema
export const BioWriterOutputSchema = z.object({
  variants: z.array(
    z.object({
      tone: z.enum(['storyteller', 'minimalist', 'direct', 'high_energy']),
      headline: z.string(),
      bio: z.string(),
      callToAction: z.string(),
    })
  ),
});

export type BioWriterOutput = z.infer<typeof BioWriterOutputSchema>;

// 3. Analytics Advisor Output Schema
export const AnalyticsAdvisorOutputSchema = z.object({
  summary: z.string(),
  keyMetrics: z.object({
    viewsTrend: z.string(),
    topPerformingSource: z.string(),
    conversionRateVerdict: z.string(),
  }),
  recommendedActions: z.array(
    z.object({
      priority: z.enum(['high', 'medium', 'low']),
      title: z.string(),
      description: z.string(),
      expectedImpact: z.string(),
    })
  ),
});

export type AnalyticsAdvisorOutput = z.infer<typeof AnalyticsAdvisorOutputSchema>;

