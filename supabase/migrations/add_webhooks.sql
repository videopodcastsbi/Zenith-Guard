-- Add discord_webhook column to games table
alter table public.games
add column if not exists discord_webhook text;
