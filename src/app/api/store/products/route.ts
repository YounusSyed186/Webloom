import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Product } from '@/types';
import { LinkedTreeStore } from '@/lib/data-store';

const productSchema = z.object({
  profileId: z.string().min(1),
  title: z.string().min(2).max(255),
  slug: z.string().min(2).max(100),
  description: z.string().min(5),
  productType: z.enum(['digital_download', 'course', 'membership', 'service', 'booking', 'physical']),
  priceInr: z.number().nonnegative(),
  priceUsd: z.number().nonnegative(),
  compareAtPriceInr: z.number().optional(),
  coverImageUrl: z.string().optional(),
  downloadFileUrl: z.string().optional(),
  redirectUrl: z.string().optional(),
  inventoryCount: z.number().default(-1),
  isActive: z.boolean().default(true),
});

// In-memory / data store bridge for multi-tenant products
const STORE_PRODUCTS: Record<string, Product[]> = {};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const profileId = searchParams.get('profileId') || 'prof_default';

  const products = STORE_PRODUCTS[profileId] || [
    {
      id: 'prod_starter_kit',
      profileId,
      title: 'Editorial Creator Starter Kit (Figma + Notion)',
      slug: 'creator-starter-kit',
      description: 'Comprehensive design system, Notion content operating system, and 12 email templates designed for independent digital creators.',
      productType: 'digital_download',
      priceInr: 499,
      priceUsd: 6,
      compareAtPriceInr: 999,
      currency: 'INR',
      coverImageUrl: '/generated/thumb-monogram.jpg',
      downloadFileUrl: 'https://example.com/starter-kit.zip',
      isActive: true,
      inventoryCount: -1,
      salesCount: 42,
      totalRevenueInr: 20958,
      createdAt: '2026-02-01T10:00:00Z',
      updatedAt: '2026-11-01T10:00:00Z',
    },
    {
      id: 'prod_consultation',
      profileId,
      title: '60-Minute Architecture & Product Strategy Session',
      slug: 'strategy-consultation',
      description: 'Deep-dive 1:1 call to review your portfolio, SaaS architecture, or product monetization roadmap.',
      productType: 'service',
      priceInr: 2499,
      priceUsd: 30,
      currency: 'INR',
      coverImageUrl: '/generated/thumb-landscape.jpg',
      isActive: true,
      inventoryCount: 10,
      salesCount: 14,
      totalRevenueInr: 34986,
      createdAt: '2026-03-15T10:00:00Z',
      updatedAt: '2026-11-02T10:00:00Z',
    },
  ];

  return NextResponse.json({ success: true, products });
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const validated = productSchema.safeParse(rawBody);

    if (!validated.success) {
      return NextResponse.json(
        { error: 'Invalid product details', details: validated.error.flatten() },
        { status: 400 }
      );
    }

    const data = validated.data;
    const newProduct: Product = {
      id: `prod_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      profileId: data.profileId,
      title: data.title,
      slug: data.slug,
      description: data.description,
      productType: data.productType,
      priceInr: data.priceInr,
      priceUsd: data.priceUsd,
      compareAtPriceInr: data.compareAtPriceInr,
      currency: 'INR',
      coverImageUrl: data.coverImageUrl,
      downloadFileUrl: data.downloadFileUrl,
      redirectUrl: data.redirectUrl,
      isActive: data.isActive,
      inventoryCount: data.inventoryCount,
      salesCount: 0,
      totalRevenueInr: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (!STORE_PRODUCTS[data.profileId]) {
      STORE_PRODUCTS[data.profileId] = [];
    }
    STORE_PRODUCTS[data.profileId].unshift(newProduct);

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error creating product' }, { status: 500 });
  }
}

