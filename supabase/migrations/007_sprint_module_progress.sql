-- Migration: Sprint Module Progress
-- Description: Add sprint_module_progress table for Sprints mode XP tracking and progress
-- Created: 2025-12-30

-- Create sprint_module_progress table
CREATE TABLE IF NOT EXISTS sprint_module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  xp_earned INTEGER DEFAULT 0 CHECK (xp_earned >= 0),
  exercises_attempted INTEGER DEFAULT 0 CHECK (exercises_attempted >= 0),
  exercises_completed INTEGER DEFAULT 0 CHECK (exercises_completed >= 0),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_practiced TIMESTAMPTZ,
  status TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked', 'in-progress', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_sprint_module_progress_user
  ON sprint_module_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_sprint_module_progress_user_status
  ON sprint_module_progress(user_id, status);

CREATE INDEX IF NOT EXISTS idx_sprint_module_progress_module
  ON sprint_module_progress(module_id);

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_sprint_module_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sprint_module_progress_updated_at
  BEFORE UPDATE ON sprint_module_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_sprint_module_progress_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE sprint_module_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can view their own sprint progress
CREATE POLICY "Users can view own sprint progress"
  ON sprint_module_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own sprint progress
CREATE POLICY "Users can insert own sprint progress"
  ON sprint_module_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own sprint progress
CREATE POLICY "Users can update own sprint progress"
  ON sprint_module_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own sprint progress (for resets)
CREATE POLICY "Users can delete own sprint progress"
  ON sprint_module_progress
  FOR DELETE
  USING (auth.uid() = user_id);

-- Add comment for documentation
COMMENT ON TABLE sprint_module_progress IS 'Tracks user progress through Sprint modules with XP-gated progression';
COMMENT ON COLUMN sprint_module_progress.module_id IS 'Sprint module identifier (e.g., ts-sprint-01-fundamentals)';
COMMENT ON COLUMN sprint_module_progress.xp_earned IS 'Total XP earned in this module (15 XP per exercise)';
COMMENT ON COLUMN sprint_module_progress.status IS 'Module status: locked, unlocked, in-progress, or completed';
