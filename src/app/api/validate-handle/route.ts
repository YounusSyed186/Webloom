import { NextRequest, NextResponse } from 'next/server';
import { validateUsername, normalizeUsername } from '@/lib/validation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get('handle') || '';

  const validation = validateUsername(handle);
  if (!validation.valid) {
    return NextResponse.json({
      available: false,
      normalized: normalizeUsername(handle),
      error: validation.error,
    }, { status: 400 });
  }

  return NextResponse.json({
    available: true,
    normalized: normalizeUsername(handle),
  });
}
