-- Create a table for public profiles
CREATE TABLE profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone default now(),
  username text unique,
  first_name text,
  last_name text,
  full_name text generated always as (first_name || ' ' || last_name) stored,
  avatar_url text,
  subscription_level text default 'free' check (subscription_level in ('free', 'pro', 'lifetime')),

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check ((select auth.uid()) = id);

create policy "Users can update own profile." on profiles
  for update using ((select auth.uid()) = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create or replace function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name, avatar_url, subscription_level)
  values (
    new.id, 
    new.raw_user_meta_data->>'first_name', 
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'avatar_url',
    'free'  -- Default subscription level for new users
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create new trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage buckets for avatars
insert into storage.buckets (id, name, public)
  values ('avatars', 'avatars', true)
  on conflict (id) do nothing;

-- Set up access controls for storage
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Users can upload their own avatar." on storage.objects
  for insert with check (bucket_id = 'avatars' and (select auth.uid()) = owner);

create policy "Users can update their own avatar." on storage.objects
  for update using (bucket_id = 'avatars' and (select auth.uid()) = owner);

create policy "Users can delete their own avatar." on storage.objects
  for delete using (bucket_id = 'avatars' and (select auth.uid()) = owner);

