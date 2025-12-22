-- TypeScript Champ Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text not null,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- User progress table
create table if not exists public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  total_xp integer default 0 not null,
  level integer default 1 not null,
  current_streak integer default 0 not null,
  longest_streak integer default 0 not null,
  last_activity_date text,
  lessons_completed text[] default '{}' not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Lesson progress table
create table if not exists public.lesson_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  lesson_id text not null,
  status text default 'not_started' not null,
  current_step_index integer default 0 not null,
  steps_completed text[] default '{}' not null,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  xp_earned integer default 0 not null,
  attempts integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id)
);

-- User settings table
create table if not exists public.user_settings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  sound_enabled boolean default true not null,
  theme text default 'light' not null,
  daily_goal_xp integer default 50 not null,
  email_notifications boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Practice stats table
create table if not exists public.practice_stats (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  topic text not null,
  total_attempts integer default 0 not null,
  total_completed integer default 0 not null,
  average_time_seconds integer default 0 not null,
  last_practiced timestamp with time zone,
  mastery_level text default 'learning' not null,
  easy_attempts integer default 0 not null,
  easy_completed integer default 0 not null,
  medium_attempts integer default 0 not null,
  medium_completed integer default 0 not null,
  hard_attempts integer default 0 not null,
  hard_completed integer default 0 not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, topic)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.user_settings enable row level security;
alter table public.practice_stats enable row level security;

-- RLS Policies: Users can only access their own data

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- User progress policies
create policy "Users can view their own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

-- Lesson progress policies
create policy "Users can view their own lesson progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can update their own lesson progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id);

create policy "Users can insert their own lesson progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

-- User settings policies
create policy "Users can view their own settings"
  on public.user_settings for select
  using (auth.uid() = user_id);

create policy "Users can update their own settings"
  on public.user_settings for update
  using (auth.uid() = user_id);

create policy "Users can insert their own settings"
  on public.user_settings for insert
  with check (auth.uid() = user_id);

-- Practice stats policies
create policy "Users can view their own practice stats"
  on public.practice_stats for select
  using (auth.uid() = user_id);

create policy "Users can update their own practice stats"
  on public.practice_stats for update
  using (auth.uid() = user_id);

create policy "Users can insert their own practice stats"
  on public.practice_stats for insert
  with check (auth.uid() = user_id);

-- Function to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add updated_at triggers to all tables
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.update_updated_at_column();

create trigger update_user_progress_updated_at
  before update on public.user_progress
  for each row execute procedure public.update_updated_at_column();

create trigger update_lesson_progress_updated_at
  before update on public.lesson_progress
  for each row execute procedure public.update_updated_at_column();

create trigger update_user_settings_updated_at
  before update on public.user_settings
  for each row execute procedure public.update_updated_at_column();

create trigger update_practice_stats_updated_at
  before update on public.practice_stats
  for each row execute procedure public.update_updated_at_column();

