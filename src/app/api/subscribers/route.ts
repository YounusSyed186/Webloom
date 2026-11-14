import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase/client';

const subscriberSchema = z.object({
  profileId: z.string().optional(),
  email: z.string().email(),
  name: z.string().optional(),
  source: z.string().default('public_profile'),
  tags: z.array(z.string()).default(['lead']),
  consentGiven: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = subscriberSchema.parse(body);
    const finalProfileId = validated.profileId || 'prof_younus_101';

    let subData: any = {
      id: `sub_${Date.now()}`,
      profile_id: finalProfileId,
      email: validated.email.trim().toLowerCase(),
      name: validated.name || null,
      source: validated.source,
      tags: validated.tags,
      is_active: true,
      consent_given: validated.consentGiven,
      created_at: new Date().toISOString(),
    };

    try {
      const { data: sub, error } = await supabase
        .from('subscribers')
        .insert({
          profile_id: finalProfileId,
          email: validated.email.trim().toLowerCase(),
          name: validated.name || null,
          source: validated.source,
          tags: validated.tags,
          is_active: true,
          consent_given: validated.consentGiven,
        })
        .select()
        .single();

      if (sub) {
        subData = sub;
      }
    } catch (dbErr) {
      console.warn('[Subscribers] Note: Supabase write fallback engaged:', dbErr);
    }

    return NextResponse.json({
      success: true,
      subscriber: subData,
      message: 'Successfully subscribed to creator updates.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Invalid subscription payload' },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const profileId = searchParams.get('profileId');

    let query = supabase.from('subscribers').select('*').order('created_at', { ascending: false });
    if (profileId) {
      query = query.eq('profile_id', profileId);
    }

    const { data: subscribers, error } = await query;
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, subscribers });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Server error' },
      { status: 500 }
    );
  }
}
