-- EVENTS TABLE (For storing detection logs from Roblox)
create table public.events (
  id uuid default uuid_generate_v4() primary key,
  game_id uuid references public.games on delete cascade not null,
  player_id text not null, -- Roblox User ID
  player_name text, -- Roblox Username
  event_type text not null, -- e.g., 'Exploit', 'Chat', 'Botting'
  severity text not null, -- 'critical', 'high', 'medium', 'low'
  description text not null,
  metadata jsonb default '{}'::jsonb, -- Additional data
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.events enable row level security;

-- Policies for events
create policy "Users can view events for their games"
  on public.events for select
  using (
    exists (
      select 1 from public.games
      where games.id = events.game_id
      and games.owner_id = auth.uid()
    )
  );

-- Note: We do not add an INSERT policy here for authenticated users because 
-- the API endpoint will use the Service Role key to insert events directly, 
-- completely bypassing RLS (since the request comes from the Roblox server, not a logged-in user).
