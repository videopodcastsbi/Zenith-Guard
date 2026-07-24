'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { v4 as uuidv4 } from 'uuid'

export async function getApiKeys() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Fetch API keys and join with games to get game name
  const { data, error } = await supabase
    .from('api_keys')
    .select(`
      *,
      games (
        name,
        owner_id
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    return { error: error.message }
  }

  // Filter keys by games owned by the user (since RLS might handle it, but just in case)
  const userKeys = data.filter((k: any) => k.games?.owner_id === user.id)

  return { apiKeys: userKeys }
}

export async function addApiKey(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const name = formData.get('name') as string
  const game_id = formData.get('game_id') as string

  if (!name || !game_id) {
    return { error: 'Name and Game are required' }
  }

  const rawKey = `ZG-${uuidv4()}`

  const { error } = await supabase
    .from('api_keys')
    .insert({
      game_id,
      name,
      key_hash: rawKey,
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/api-keys')
  return { success: true, key: rawKey }
}

export async function getGamesList() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { games: [] }
  
  const { data } = await supabase.from('games').select('id, name').eq('owner_id', user.id)
  return { games: data || [] }
}
