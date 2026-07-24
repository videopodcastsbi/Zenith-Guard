import { NextRequest, NextResponse } from 'next/server';
import { moderationSchema } from '@/lib/validators';
import { validateApiKey } from '@/lib/api-key';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-api-key') || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!apiKey || !validateApiKey(apiKey)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const rateLimit = checkRateLimit(ip, 'moderation');
    
    if (!rateLimit.allowed) {
      return NextResponse.json({ success: false, error: 'Too Many Requests' }, { status: 429 });
    }

    const body = await req.json();
    const result = moderationSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Validation Error', details: result.error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Moderation action queued' },
      { status: 202 }
    );

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
    },
  });
}
