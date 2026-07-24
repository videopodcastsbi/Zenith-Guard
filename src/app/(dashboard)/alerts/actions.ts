'use server'

import { createClient } from '@/lib/supabase/server'

export async function getAlerts() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Fetch events belonging to user's games
  const { data, error } = await supabase
    .from('events')
    .select(`
      *,
      games!inner(
        name,
        owner_id
      )
    `)
    .eq('games.owner_id', user.id)
    .order('created_at', { ascending: false })
    .limit(100) // Show last 100 alerts

  if (error) {
    return { error: error.message }
  }

  // Format them for the UI
  const alerts = data.map((event: any) => ({
    id: event.id,
    title: `${event.event_type} Detected`,
    severity: capitalizeFirstLetter(event.severity),
    player: event.player_name || event.player_id,
    game: event.games?.name || 'Unknown',
    time: formatTimeAgo(new Date(event.created_at)),
    description: event.description
  }))

  return { alerts }
}

function capitalizeFirstLetter(string: string) {
  if (!string) return 'Medium'
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function formatTimeAgo(date: Date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}s ago`;
  } else if (diffInSeconds < 3600) {
    return `${Math.floor(diffInSeconds / 60)}m ago`;
  } else if (diffInSeconds < 86400) {
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  } else {
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  }
}
