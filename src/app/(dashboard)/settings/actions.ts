'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function getGamesWithWebhooks() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { games: [] }

  const { data } = await supabase
    .from('games')
    .select('id, name, discord_webhook')
    .eq('owner_id', user.id)

  return { games: data || [] }
}

export async function saveDiscordWebhook(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const gameId = formData.get('game_id') as string
  const webhookUrl = formData.get('webhook_url') as string
  const enabled = formData.get('enabled') === 'true'

  if (!gameId) {
    return { error: 'Game ID is required' }
  }

  const finalUrl = enabled && webhookUrl ? webhookUrl : null

  // Ensure user owns the game before updating
  const { error: updateError } = await supabase
    .from('games')
    .update({ discord_webhook: finalUrl })
    .eq('id', gameId)
    .eq('owner_id', user.id)

  if (updateError) {
    return { error: updateError.message }
  }

  revalidatePath('/settings')
  return { success: true }
}
