import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/service'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid Authorization header' }, { status: 401 })
    }

    const apiKey = authHeader.split(' ')[1]

    const supabase = createAdminClient()

    // 1. Verify the API key exists
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('game_id, id')
      .eq('key_hash', apiKey)
      .single()

    if (keyError || !keyData) {
      return NextResponse.json({ error: 'Invalid API Key' }, { status: 401 })
    }

    // 2. Parse the payload
    const body = await request.json()
    const { playerId, playerName, type, severity, description, metadata } = body

    if (!playerId || !type || !severity || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 3. Insert the event
    const { error: insertError } = await supabase
      .from('events')
      .insert({
        game_id: keyData.game_id,
        player_id: playerId.toString(),
        player_name: playerName || 'Unknown Player',
        event_type: type,
        severity: severity,
        description: description,
        metadata: metadata || {}
      })

    if (insertError) {
      console.error('Error inserting event:', insertError)
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

    // 4. Update the last_used_at for the API key (fire and forget)
    supabase.from('api_keys').update({ last_used_at: new Date().toISOString() }).eq('id', keyData.id).then()

    return NextResponse.json({ success: true, message: 'Event logged successfully' }, { status: 201 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
