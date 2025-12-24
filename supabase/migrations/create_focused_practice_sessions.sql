-- Create focused_practice_sessions table
create table focused_practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id text not null,
  lesson_title text not null,
  session_data jsonb not null,  -- stores FocusedPracticeMiniLesson
  current_step_index integer default 0,
  completed_steps text[] default '{}',
  status text default 'in_progress',  -- 'in_progress' | 'completed'
  started_at timestamptz default now(),
  completed_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for fast lookup by user and lesson
create index idx_fps_user_lesson on focused_practice_sessions(user_id, lesson_id);

-- Enable RLS
alter table focused_practice_sessions enable row level security;

-- Policy: Users can only see their own sessions
create policy "Users can view their own focused practice sessions"
  on focused_practice_sessions
  for select
  using (auth.uid() = user_id);

-- Policy: Users can insert their own sessions
create policy "Users can insert their own focused practice sessions"
  on focused_practice_sessions
  for insert
  with check (auth.uid() = user_id);

-- Policy: Users can update their own sessions
create policy "Users can update their own focused practice sessions"
  on focused_practice_sessions
  for update
  using (auth.uid() = user_id);

-- Policy: Users can delete their own sessions
create policy "Users can delete their own focused practice sessions"
  on focused_practice_sessions
  for delete
  using (auth.uid() = user_id);

