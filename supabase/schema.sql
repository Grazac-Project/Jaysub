-- Run once in your Supabase project's SQL Editor.
create table if not exists public.enquiries (
  id uuid primary key,
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) <= 254),
  company text not null default '' check (char_length(company) <= 160),
  service text not null check (service in ('IT consulting', 'Business analysis', 'Web & mobile solutions', 'I’d like some guidance')),
  message text not null check (char_length(message) between 20 and 5000),
  created_at timestamptz not null default now()
);
alter table public.enquiries enable row level security;
revoke all on table public.enquiries from anon, authenticated;
grant usage on schema public to service_role;
grant select, insert on table public.enquiries to service_role;
-- No public policies: visitors use your validated Next.js API route.
-- View submitted enquiries in Supabase's Table Editor.
