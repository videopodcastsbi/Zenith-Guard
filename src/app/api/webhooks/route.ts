import { NextRequest, NextResponse } from 'next/server';
import { webhookSchema } from '@/lib/validators';
import { validateApiKey } from '@/lib/api-key';

export async function GET(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-api-key') || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!apiKey || !validateApiKey(apiKey)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Mock webhooks
    const webhooks = [
      { id: 'wh_1', url: 'https://discord.com/api/webhooks/123/abc', events: ['detection.critical', 'moderation.ban'], active: true },
      { id: 'wh_2', url: 'https://api.mygame.com/webhooks/zenith', events: ['*'], active: false }
    ];

    return NextResponse.json({ success: true, webhooks }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = req.headers.get('x-api-key') || req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!apiKey || !validateApiKey(apiKey)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const result = webhookSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Validation Error', details: result.error.format() },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Webhook created successfully',
        webhook: {
          id: `wh_${Date.now()}`,
          ...result.data
        }
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
