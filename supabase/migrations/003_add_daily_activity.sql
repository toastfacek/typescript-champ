-- Create daily_activity table for contribution grid tracking
CREATE TABLE IF NOT EXISTS public.daily_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  count INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Create index for efficient queries
CREATE INDEX IF NOT EXISTS idx_daily_activity_user_date ON public.daily_activity(user_id, date);

-- Enable RLS
ALTER TABLE public.daily_activity ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own activity
CREATE POLICY "Users can view own activity"
  ON public.daily_activity
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own activity
CREATE POLICY "Users can insert own activity"
  ON public.daily_activity
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own activity
CREATE POLICY "Users can update own activity"
  ON public.daily_activity
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

