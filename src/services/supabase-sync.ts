import { supabase, isDemoMode } from '@/lib/supabase'
import type { User, UserProgress, LessonProgress, UserSettings } from '@/types'
import type { PracticeStats } from '@/types/practice'
import type { StoredFocusedSession, FocusedPracticeMiniLesson } from '@/types/focused-practice'

// Profile methods
export async function getProfile(userId: string): Promise<User | null> {
  if (isDemoMode) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Error fetching profile:', error)
    return null
  }

  if (!data) return null

  return {
    id: (data as any).id,
    email: (data as any).email,
    displayName: (data as any).display_name,
    avatarUrl: (data as any).avatar_url || undefined,
    createdAt: new Date((data as any).created_at),
  }
}

export async function updateProfile(user: Partial<User> & { id: string }): Promise<boolean> {
  if (isDemoMode) return false

  const updateData: any = {}
  if (user.displayName) updateData.display_name = user.displayName
  if (user.avatarUrl !== undefined) updateData.avatar_url = user.avatarUrl

  const { error } = await (supabase as any)
    .from('profiles')
    .update(updateData)
    .eq('id', user.id)

  if (error) {
    console.error('Error updating profile:', error)
    return false
  }

  return true
}

// User progress methods
export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  if (isDemoMode) return null

  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No row found, return null
      return null
    }
    console.error('Error fetching user progress:', error)
    return null
  }

  return {
    userId: (data as any).user_id,
    totalXP: (data as any).total_xp,
    level: (data as any).level,
    currentStreak: (data as any).current_streak,
    longestStreak: (data as any).longest_streak,
    lastActivityDate: (data as any).last_activity_date || new Date().toISOString().split('T')[0],
    lessonsCompleted: (data as any).lessons_completed,
  }
}

export async function syncUserProgress(progress: UserProgress): Promise<boolean> {
  if (isDemoMode || progress.userId === 'demo-user') return false

  const progressData: any = {
    user_id: progress.userId,
    total_xp: progress.totalXP,
    level: progress.level,
    current_streak: progress.currentStreak,
    longest_streak: progress.longestStreak,
    last_activity_date: progress.lastActivityDate,
    lessons_completed: progress.lessonsCompleted,
  }

  const { error } = await supabase
    .from('user_progress')
    .upsert(progressData, { onConflict: 'user_id' })

  if (error) {
    console.error('Error syncing user progress:', error)
    return false
  }

  return true
}

// Lesson progress methods
export async function getLessonProgress(userId: string, lessonId?: string): Promise<LessonProgress[]> {
  if (isDemoMode) return []

  let query = supabase
    .from('lesson_progress')
    .select('*')
    .eq('user_id', userId)

  if (lessonId) {
    query = query.eq('lesson_id', lessonId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching lesson progress:', error)
    return []
  }

  return (data as any[]).map(row => ({
    lessonId: row.lesson_id,
    userId: row.user_id,
    status: row.status as 'not-started' | 'in-progress' | 'completed',
    currentStepIndex: row.current_step_index,
    stepsCompleted: row.steps_completed,
    startedAt: row.started_at ? new Date(row.started_at) : undefined,
    completedAt: row.completed_at ? new Date(row.completed_at) : undefined,
    xpEarned: row.xp_earned,
    attempts: row.attempts,
  }))
}

export async function syncLessonProgress(lessonProgress: LessonProgress): Promise<boolean> {
  if (isDemoMode || lessonProgress.userId === 'demo-user') return false

  const lessonData: any = {
    user_id: lessonProgress.userId,
    lesson_id: lessonProgress.lessonId,
    status: lessonProgress.status,
    current_step_index: lessonProgress.currentStepIndex,
    steps_completed: lessonProgress.stepsCompleted,
    started_at: lessonProgress.startedAt?.toISOString(),
    completed_at: lessonProgress.completedAt?.toISOString(),
    xp_earned: lessonProgress.xpEarned,
    attempts: lessonProgress.attempts,
  }

  const { error } = await supabase
    .from('lesson_progress')
    .upsert(lessonData, { onConflict: 'user_id,lesson_id' })

  if (error) {
    console.error('Error syncing lesson progress:', error)
    return false
  }

  return true
}

// User settings methods
export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  if (isDemoMode) return null

  const { data, error } = await supabase
    .from('user_settings')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      // No row found, return null
      return null
    }
    console.error('Error fetching user settings:', error)
    return null
  }

  return {
    soundEnabled: (data as any).sound_enabled,
    theme: (data as any).theme as 'light' | 'dark' | 'system',
    dailyGoalXP: (data as any).daily_goal_xp,
    emailNotifications: (data as any).email_notifications,
  }
}

export async function syncUserSettings(userId: string, settings: UserSettings): Promise<boolean> {
  if (isDemoMode || userId === 'demo-user') return false

  const settingsData: any = {
    user_id: userId,
    sound_enabled: settings.soundEnabled,
    theme: settings.theme,
    daily_goal_xp: settings.dailyGoalXP,
    email_notifications: settings.emailNotifications,
  }

  const { error } = await supabase
    .from('user_settings')
    .upsert(settingsData, { onConflict: 'user_id' })

  if (error) {
    console.error('Error syncing user settings:', error)
    return false
  }

  return true
}

// Practice stats methods
export async function getPracticeStats(userId: string, topic?: string): Promise<PracticeStats[]> {
  if (isDemoMode) return []

  let query = supabase
    .from('practice_stats')
    .select('*')
    .eq('user_id', userId)

  if (topic) {
    query = query.eq('topic', topic)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching practice stats:', error)
    return []
  }

  return (data as any[]).map(row => ({
    topic: row.topic as PracticeStats['topic'],
    totalAttempts: row.total_attempts,
    totalCompleted: row.total_completed,
    averageTimeSeconds: row.average_time_seconds,
    lastPracticed: row.last_practiced,
    masteryLevel: row.mastery_level as PracticeStats['masteryLevel'],
    byDifficulty: {
      easy: {
        attempts: row.easy_attempts,
        completed: row.easy_completed,
      },
      medium: {
        attempts: row.medium_attempts,
        completed: row.medium_completed,
      },
      hard: {
        attempts: row.hard_attempts,
        completed: row.hard_completed,
      },
    },
  }))
}

export async function syncPracticeStats(userId: string, stats: PracticeStats): Promise<boolean> {
  if (isDemoMode || userId === 'demo-user') return false

  const statsData: any = {
    user_id: userId,
    topic: stats.topic,
    total_attempts: stats.totalAttempts,
    total_completed: stats.totalCompleted,
    average_time_seconds: stats.averageTimeSeconds,
    last_practiced: stats.lastPracticed,
    mastery_level: stats.masteryLevel,
    easy_attempts: stats.byDifficulty.easy.attempts,
    easy_completed: stats.byDifficulty.easy.completed,
    medium_attempts: stats.byDifficulty.medium.attempts,
    medium_completed: stats.byDifficulty.medium.completed,
    hard_attempts: stats.byDifficulty.hard.attempts,
    hard_completed: stats.byDifficulty.hard.completed,
  }

  const { error } = await supabase
    .from('practice_stats')
    .upsert(statsData, { onConflict: 'user_id,topic' })

  if (error) {
    console.error('Error syncing practice stats:', error)
    return false
  }

  return true
}

// Bulk operations for initial sync
export async function syncAllDataToSupabase(
  userId: string,
  progress: UserProgress,
  lessonProgress: Record<string, LessonProgress>,
  settings: UserSettings,
  practiceStats: Record<string, PracticeStats>
): Promise<void> {
  if (isDemoMode || userId === 'demo-user') return

  console.log('Syncing all demo data to Supabase for user:', userId)

  // Sync user progress
  await syncUserProgress(progress)

  // Sync all lesson progress
  for (const lesson of Object.values(lessonProgress)) {
    await syncLessonProgress(lesson)
  }

  // Sync settings
  await syncUserSettings(userId, settings)

  // Sync all practice stats
  for (const stats of Object.values(practiceStats)) {
    await syncPracticeStats(userId, stats)
  }

  console.log('Finished syncing all data to Supabase')
}

export async function loadAllDataFromSupabase(userId: string): Promise<{
  progress: UserProgress | null
  lessonProgress: Record<string, LessonProgress>
  settings: UserSettings | null
  practiceStats: Record<string, PracticeStats>
}> {
  if (isDemoMode) {
    return {
      progress: null,
      lessonProgress: {},
      settings: null,
      practiceStats: {},
    }
  }

  console.log('Loading all data from Supabase for user:', userId)

  // Load user progress
  const progress = await getUserProgress(userId)

  // Load lesson progress
  const lessonProgressArray = await getLessonProgress(userId)
  const lessonProgress: Record<string, LessonProgress> = {}
  for (const lesson of lessonProgressArray) {
    lessonProgress[lesson.lessonId] = lesson
  }

  // Load settings
  const settings = await getUserSettings(userId)

  // Load practice stats
  const practiceStatsArray = await getPracticeStats(userId)
  const practiceStats: Record<string, PracticeStats> = {}
  for (const stats of practiceStatsArray) {
    practiceStats[stats.topic] = stats
  }

  console.log('Finished loading all data from Supabase')

  return {
    progress,
    lessonProgress,
    settings,
    practiceStats,
  }
}

// Focused practice session methods
export async function saveFocusedPracticeSession(
  userId: string,
  session: StoredFocusedSession
): Promise<boolean> {
  if (isDemoMode || userId === 'demo-user') return false

  const sessionData: any = {
    id: session.id,
    user_id: userId,
    lesson_id: session.lessonId,
    lesson_title: session.lessonTitle,
    session_data: session.miniLesson as any,
    current_step_index: session.currentStepIndex,
    completed_steps: session.completedSteps,
    status: session.status,
    started_at: session.startedAt,
    completed_at: session.completedAt || null,
  }

  const { error } = await supabase
    .from('focused_practice_sessions')
    .upsert(sessionData, { onConflict: 'id' })

  if (error) {
    console.error('Error saving focused practice session:', error)
    return false
  }

  return true
}

export async function getFocusedPracticeSessions(
  userId: string,
  lessonId?: string
): Promise<StoredFocusedSession[]> {
  if (isDemoMode) return []

  let query = supabase
    .from('focused_practice_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('started_at', { ascending: false })

  if (lessonId) {
    query = query.eq('lesson_id', lessonId)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching focused practice sessions:', error)
    return []
  }

  return (data as any[]).map(row => ({
    id: row.id,
    lessonId: row.lesson_id,
    lessonTitle: row.lesson_title,
    miniLesson: row.session_data as FocusedPracticeMiniLesson,
    currentStepIndex: row.current_step_index,
    completedSteps: row.completed_steps || [],
    status: row.status as 'in_progress' | 'completed',
    startedAt: row.started_at,
    completedAt: row.completed_at || undefined,
  }))
}

export async function deleteFocusedPracticeSession(
  userId: string,
  sessionId: string
): Promise<boolean> {
  if (isDemoMode || userId === 'demo-user') return false

  const { error } = await supabase
    .from('focused_practice_sessions')
    .delete()
    .eq('id', sessionId)
    .eq('user_id', userId)

  if (error) {
    console.error('Error deleting focused practice session:', error)
    return false
  }

  return true
}

// Daily activity methods
export async function syncDailyActivity(
  userId: string,
  date: string,
  count: number
): Promise<boolean> {
  if (isDemoMode || userId === 'demo-user') return false

  const activityData: any = {
    user_id: userId,
    date,
    count,
    updated_at: new Date().toISOString(),
  }

  const { error } = await supabase
    .from('daily_activity')
    .upsert(activityData, { onConflict: 'user_id,date' })

  if (error) {
    console.error('Error syncing daily activity:', error)
    return false
  }

  return true
}

export async function getDailyActivity(
  userId: string,
  startDate: string,
  endDate: string
): Promise<Record<string, number>> {
  if (isDemoMode) return {}

  const { data, error } = await supabase
    .from('daily_activity')
    .select('date, count')
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate)

  if (error) {
    console.error('Error fetching daily activity:', error)
    return {}
  }

  const activityHistory: Record<string, number> = {}
  for (const row of data || []) {
    activityHistory[(row as any).date] = (row as any).count
  }

  return activityHistory
}

// Account merging functions
export async function findAccountByEmail(email: string): Promise<{ userId: string; email: string } | null> {
  if (isDemoMode) return null

  const { data, error } = await supabase.rpc('find_account_by_email', {
    search_email: email,
  })

  if (error) {
    console.error('Error finding account by email:', error)
    return null
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return null
  }

  const result = Array.isArray(data) ? data[0] : data
  return {
    userId: (result as any).user_id,
    email: (result as any).email,
  }
}

export async function mergeAccountByEmail(
  targetUserId: string,
  sourceEmail: string
): Promise<{ success: boolean; message: string; sourceUserId?: string }> {
  if (isDemoMode) {
    return { success: false, message: 'Cannot merge accounts in demo mode' }
  }

  const { data, error } = await supabase.rpc('merge_account_by_email', {
    target_user_id: targetUserId,
    source_email: sourceEmail,
  })

  if (error) {
    console.error('Error merging account:', error)
    return { success: false, message: error.message }
  }

  const result = data as any
  if (result?.merged) {
    return {
      success: true,
      message: result.message || 'Account merged successfully',
      sourceUserId: result.source_user_id,
    }
  }

  return {
    success: false,
    message: result?.message || 'No account found to merge',
  }
}
