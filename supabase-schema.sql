-- Beaconblitz Staff - Supabase compatibility schema
-- Run this in Supabase Dashboard > SQL Editor before using index.html.
--
-- This schema stores the current app's Firebase-style tree in Supabase.
-- It is the fastest migration path from Firebase to Supabase.
-- For a public paid SaaS, the next step should be replacing this permissive
-- policy with Supabase Auth + role-based RLS policies.

create table if not exists public.kv_store (
  path text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.kv_store enable row level security;

drop policy if exists "Temporary app compatibility read" on public.kv_store;
drop policy if exists "Temporary app compatibility write" on public.kv_store;

create policy "Temporary app compatibility read"
on public.kv_store
for select
to anon
using (true);

create policy "Temporary app compatibility write"
on public.kv_store
for all
to anon
using (true)
with check (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'kv_store'
  ) then
    alter publication supabase_realtime add table public.kv_store;
  end if;
end $$;
