-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS TABLE
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  name text,
  role text default 'user'::text not null, -- 'admin' or 'user'
  subscription_tier text default 'free'::text not null, -- 'free', 'pro', 'enterprise'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- GAMES TABLE
create table public.games (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.users on delete cascade not null,
  name text not null,
  place_id text not null,
  status text default 'active'::text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- API KEYS TABLE
create table public.api_keys (
  id uuid default uuid_generate_v4() primary key,
  game_id uuid references public.games on delete cascade not null,
  key_hash text not null,
  name text not null,
  last_used_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) Setup

-- Enable RLS
alter table public.users enable row level security;
alter table public.games enable row level security;
alter table public.api_keys enable row level security;

-- Users policies
create policy "Users can view their own profile"
  on public.users for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on public.users for update
  using ( auth.uid() = id );

-- Games policies
create policy "Users can view their own games"
  on public.games for select
  using ( auth.uid() = owner_id );

create policy "Users can insert their own games"
  on public.games for insert
  with check ( auth.uid() = owner_id );

create policy "Users can update their own games"
  on public.games for update
  using ( auth.uid() = owner_id );

create policy "Users can delete their own games"
  on public.games for delete
  using ( auth.uid() = owner_id );

-- API Keys policies
create policy "Users can view API keys for their games"
  on public.api_keys for select
  using (
    exists (
      select 1 from public.games
      where public.games.id = api_keys.game_id
      and public.games.owner_id = auth.uid()
    )
  );

create policy "Users can insert API keys for their games"
  on public.api_keys for insert
  with check (
    exists (
      select 1 from public.games
      where public.games.id = api_keys.game_id
      and public.games.owner_id = auth.uid()
    )
  );

create policy "Users can delete API keys for their games"
  on public.api_keys for delete
  using (
    exists (
      select 1 from public.games
      where public.games.id = api_keys.game_id
      and public.games.owner_id = auth.uid()
    )
  );

-- Function to handle new user registration automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user registration
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
