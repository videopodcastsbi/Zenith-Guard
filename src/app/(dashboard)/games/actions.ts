'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function getGames() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return { error: error.message }
  }

  const enrichedGames = await Promise.all(data.map(async (game) => {
    let live_players = 0;
    let visits = 0;
    let playing = 0;
    
    try {
      // 1. Get Universe ID (with 3s timeout to prevent hanging)
      const uniRes = await fetch(`https://apis.roblox.com/universes/v1/places/${game.place_id}/universe`, { 
        next: { revalidate: 30 },
        signal: AbortSignal.timeout(3000)
      });
      if (uniRes.ok) {
        const uniData = await uniRes.json();
        const universeId = uniData.universeId;
        
        if (universeId) {
          // 2. Get Game Stats (with 3s timeout)
          const statsRes = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`, { 
            next: { revalidate: 30 },
            signal: AbortSignal.timeout(3000)
          });
          if (statsRes.ok) {
            const statsData = await statsRes.json();
            if (statsData.data && statsData.data.length > 0) {
              live_players = statsData.data[0].playing || 0;
              visits = statsData.data[0].visits || 0;
            }
          }
        }
      }
    } catch (e) {
      console.error("Failed to fetch Roblox stats for place:", game.place_id);
    }
    
    return {
      ...game,
      live_players,
      servers: Math.ceil(live_players / 40) // Estimate server count
    };
  }));

  return { games: enrichedGames }
}

export async function addGame(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const name = formData.get('name') as string
  const place_id = formData.get('place_id') as string

  if (!name || !place_id) {
    return { error: 'Name and Place ID are required' }
  }

  // Ensure user exists in public.users to prevent foreign key constraint errors
  // We use the service_role key to bypass RLS because public.users has no INSERT policy
  const supabaseAdmin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  await supabaseAdmin.from('users').upsert({
    id: user.id,
    email: user.email || 'unknown@example.com',
    name: user.user_metadata?.full_name || user.user_metadata?.name || 'User'
  }, { onConflict: 'id' })

  // Check subscription limits
  const { data: userData } = await supabaseAdmin
    .from('users')
    .select('subscription_tier')
    .eq('id', user.id)
    .single()

  if (userData?.subscription_tier === 'free') {
    const { count } = await supabaseAdmin
      .from('games')
      .select('*', { count: 'exact', head: true })
      .eq('owner_id', user.id)
    
    if (count !== null && count >= 2) {
      return { error: 'Free tier limit reached (Max 2 games). Please upgrade to Pro.' }
    }
  }

  const { error } = await supabase
    .from('games')
    .insert({
      owner_id: user.id,
      name,
      place_id,
      status: 'Healthy'
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/games')
  return { success: true }
}
