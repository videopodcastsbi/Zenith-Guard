import { NextRequest, NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Define the incoming payload type
interface IngestPayload {
  playerId: string;
  playerName: string;
  type: string;
  severity?: string;
  description?: string;
  data?: any;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Get API Key from Authorization Header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid Authorization header' }, { status: 401 });
    }
    const apiKey = authHeader.replace('Bearer ', '').trim();

    // 2. Initialize Supabase Admin Client
    // We use the admin client because this endpoint needs to bypass RLS to verify the key and insert the event
    const supabaseAdmin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 3. Verify API Key and get associated Game & Owner
    const { data: keyData, error: keyError } = await supabaseAdmin
      .from('api_keys')
      .select('game_id, games ( owner_id, discord_webhook, users ( subscription_tier ) )')
      .eq('key_hash', apiKey)
      .single();

    if (keyError || !keyData) {
      return NextResponse.json({ error: 'Invalid API Key' }, { status: 403 });
    }

    const gameId = keyData.game_id;
    // @ts-ignore - Supabase type inference for joined tables can be tricky
    const game = keyData.games as any;
    const ownerId = game.owner_id;
    const discordWebhookUrl = game.discord_webhook;
    const subscriptionTier = game.users?.subscription_tier || 'free';

    // 4. Parse incoming payload
    const payload: IngestPayload = await req.json();

    if (!payload.playerId || !payload.type) {
      return NextResponse.json({ error: 'Missing required fields: playerId, type' }, { status: 400 });
    }

    // 5. Insert Event into Database
    const { error: insertError } = await supabaseAdmin
      .from('events')
      .insert({
        game_id: gameId,
        player_id: payload.playerId.toString(),
        player_name: payload.playerName || 'Unknown',
        event_type: payload.type,
        severity: payload.severity || 'medium',
        description: payload.description || `Event ${payload.type} triggered by ${payload.playerId}`,
        metadata: payload.data || {}
      });

    if (insertError) {
      console.error('Failed to insert event:', insertError);
      return NextResponse.json({ error: 'Failed to process event' }, { status: 500 });
    }

    // 6. Update API Key last_used_at
    await supabaseAdmin
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('key_hash', apiKey);

    // 7. Fire Discord Webhook if user is PRO and has a webhook configured
    if (subscriptionTier === 'pro' && discordWebhookUrl) {
      try {
        const embed = {
          title: `⚠️ Zenith-Guard Alert: ${payload.type}`,
          color: payload.severity === 'critical' ? 16711680 : payload.severity === 'high' ? 16734003 : 16753920,
          fields: [
            { name: 'Player ID', value: payload.playerId.toString(), inline: true },
            { name: 'Player Name', value: payload.playerName || 'Unknown', inline: true },
            { name: 'Severity', value: payload.severity || 'medium', inline: true },
            { name: 'Description', value: payload.description || 'No description provided', inline: false }
          ],
          footer: { text: 'Zenith-Guard Anti-Cheat System' },
          timestamp: new Date().toISOString()
        };

        await fetch(discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ embeds: [embed] })
        });
      } catch (webhookError) {
        console.error('Failed to fire Discord webhook:', webhookError);
        // We don't fail the request if the webhook fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Ingest API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
