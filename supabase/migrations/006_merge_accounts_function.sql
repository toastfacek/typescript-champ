-- Function to find account by email (bypasses RLS for account merging)
CREATE OR REPLACE FUNCTION public.find_account_by_email(
  search_email TEXT
)
RETURNS TABLE(user_id UUID, email TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT p.id, p.email
  FROM public.profiles p
  WHERE p.email = search_email
  LIMIT 1;
END;
$$;

-- Function to merge user accounts by email
-- This allows transferring progress from an email/password account to an OAuth account
-- with the same email address
CREATE OR REPLACE FUNCTION public.merge_account_by_email(
  target_user_id UUID,
  source_email TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  source_user_id UUID;
  merged_data JSONB;
BEGIN
  -- Find the source account by email
  SELECT id INTO source_user_id
  FROM public.profiles
  WHERE email = source_email AND id != target_user_id
  LIMIT 1;

  -- If no source account found, return empty result
  IF source_user_id IS NULL THEN
    RETURN jsonb_build_object('merged', false, 'message', 'No account found with this email');
  END IF;

  -- Merge user_progress
  INSERT INTO public.user_progress (
    user_id, total_xp, level, current_streak, longest_streak,
    last_activity_date, lessons_completed
  )
  SELECT 
    target_user_id,
    COALESCE(total_xp, 0),
    COALESCE(level, 1),
    COALESCE(current_streak, 0),
    COALESCE(longest_streak, 0),
    last_activity_date,
    COALESCE(lessons_completed, '{}')
  FROM public.user_progress
  WHERE user_id = source_user_id
  ON CONFLICT (user_id) DO UPDATE SET
    total_xp = GREATEST(user_progress.total_xp, EXCLUDED.total_xp),
    level = GREATEST(user_progress.level, EXCLUDED.level),
    current_streak = GREATEST(user_progress.current_streak, EXCLUDED.current_streak),
    longest_streak = GREATEST(user_progress.longest_streak, EXCLUDED.longest_streak),
    last_activity_date = COALESCE(
      NULLIF(GREATEST(user_progress.last_activity_date, EXCLUDED.last_activity_date), ''),
      user_progress.last_activity_date,
      EXCLUDED.last_activity_date
    ),
    lessons_completed = (
      SELECT array_agg(DISTINCT unnest)
      FROM (
        SELECT unnest(user_progress.lessons_completed)
        UNION
        SELECT unnest(EXCLUDED.lessons_completed)
      ) AS combined
    );

  -- Merge lesson_progress (use ON CONFLICT to merge individual lessons)
  INSERT INTO public.lesson_progress (
    user_id, lesson_id, status, current_step_index, steps_completed,
    started_at, completed_at, xp_earned, attempts
  )
  SELECT 
    target_user_id,
    lesson_id,
    status,
    GREATEST(current_step_index, 0),
    steps_completed,
    started_at,
    completed_at,
    xp_earned,
    attempts
  FROM public.lesson_progress
  WHERE user_id = source_user_id
  ON CONFLICT (user_id, lesson_id) DO UPDATE SET
    status = CASE 
      WHEN EXCLUDED.status = 'completed' OR lesson_progress.status = 'completed' THEN 'completed'
      WHEN EXCLUDED.status = 'in-progress' OR lesson_progress.status = 'in-progress' THEN 'in-progress'
      ELSE 'not-started'
    END,
    current_step_index = GREATEST(lesson_progress.current_step_index, EXCLUDED.current_step_index),
    steps_completed = (
      SELECT array_agg(DISTINCT unnest)
      FROM (
        SELECT unnest(lesson_progress.steps_completed)
        UNION
        SELECT unnest(EXCLUDED.steps_completed)
      ) AS combined
    ),
    started_at = COALESCE(
      LEAST(lesson_progress.started_at, EXCLUDED.started_at),
      lesson_progress.started_at,
      EXCLUDED.started_at
    ),
    completed_at = COALESCE(
      GREATEST(lesson_progress.completed_at, EXCLUDED.completed_at),
      lesson_progress.completed_at,
      EXCLUDED.completed_at
    ),
    xp_earned = GREATEST(lesson_progress.xp_earned, EXCLUDED.xp_earned),
    attempts = lesson_progress.attempts + EXCLUDED.attempts;

  -- Merge practice_stats
  INSERT INTO public.practice_stats (
    user_id, topic, total_attempts, total_completed, average_time_seconds,
    last_practiced, mastery_level,
    easy_attempts, easy_completed, medium_attempts, medium_completed,
    hard_attempts, hard_completed
  )
  SELECT 
    target_user_id,
    topic,
    total_attempts,
    total_completed,
    average_time_seconds,
    last_practiced,
    mastery_level,
    easy_attempts,
    easy_completed,
    medium_attempts,
    medium_completed,
    hard_attempts,
    hard_completed
  FROM public.practice_stats
  WHERE user_id = source_user_id
  ON CONFLICT (user_id, topic) DO UPDATE SET
    total_attempts = practice_stats.total_attempts + EXCLUDED.total_attempts,
    total_completed = practice_stats.total_completed + EXCLUDED.total_completed,
    average_time_seconds = CASE
      WHEN practice_stats.total_attempts + EXCLUDED.total_attempts > 0 THEN
        ((practice_stats.average_time_seconds * practice_stats.total_attempts) +
         (EXCLUDED.average_time_seconds * EXCLUDED.total_attempts)) /
        (practice_stats.total_attempts + EXCLUDED.total_attempts)
      ELSE practice_stats.average_time_seconds
    END,
    last_practiced = GREATEST(practice_stats.last_practiced, EXCLUDED.last_practiced),
    mastery_level = CASE
      WHEN EXCLUDED.mastery_level = 'expert' OR practice_stats.mastery_level = 'expert' THEN 'expert'
      WHEN EXCLUDED.mastery_level = 'advanced' OR practice_stats.mastery_level = 'advanced' THEN 'advanced'
      WHEN EXCLUDED.mastery_level = 'intermediate' OR practice_stats.mastery_level = 'intermediate' THEN 'intermediate'
      ELSE 'novice'
    END,
    easy_attempts = practice_stats.easy_attempts + EXCLUDED.easy_attempts,
    easy_completed = practice_stats.easy_completed + EXCLUDED.easy_completed,
    medium_attempts = practice_stats.medium_attempts + EXCLUDED.medium_attempts,
    medium_completed = practice_stats.medium_completed + EXCLUDED.medium_completed,
    hard_attempts = practice_stats.hard_attempts + EXCLUDED.hard_attempts,
    hard_completed = practice_stats.hard_completed + EXCLUDED.hard_completed;

  -- Merge user_settings (prefer target user's settings, but merge if missing)
  INSERT INTO public.user_settings (
    user_id, sound_enabled, theme, daily_goal_xp, email_notifications
  )
  SELECT 
    target_user_id,
    sound_enabled,
    theme,
    daily_goal_xp,
    email_notifications
  FROM public.user_settings
  WHERE user_id = source_user_id
  ON CONFLICT (user_id) DO NOTHING;

  -- Return success with source user ID
  RETURN jsonb_build_object(
    'merged', true,
    'source_user_id', source_user_id,
    'target_user_id', target_user_id,
    'message', 'Account merged successfully'
  );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.find_account_by_email(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION public.merge_account_by_email(UUID, TEXT) TO authenticated;

