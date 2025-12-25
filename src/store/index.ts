import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserProgress, LessonProgress, UserSettings } from '@/types'
import type { ActivityHistory } from '@/types/gamification'
import { syncUserProgress, syncLessonProgress, syncUserSettings, syncDailyActivity } from '@/services/supabase-sync'

export interface AppState {
  // User state
  user: User | null
  settings: UserSettings
  progress: UserProgress | null
  lessonProgress: Record<string, LessonProgress>
  activityHistory: ActivityHistory

  // UI state
  isLoading: boolean
  isSidebarOpen: boolean

  // Actions
  setUser: (user: User | null) => void
  setProgress: (progress: UserProgress) => void
  updateProgress: (updates: Partial<UserProgress>) => void
  setLessonProgress: (lessonId: string, progress: LessonProgress) => void
  updateSettings: (settings: Partial<UserSettings>) => void
  addXP: (amount: number) => void
  completeLesson: (lessonId: string, xpEarned: number) => void
  redoLesson: (lessonId: string) => void
  recordActivity: () => void
  getActivityForDate: (date: string) => number
  backfillActivityHistory: () => void
  setLoading: (loading: boolean) => void
  toggleSidebar: () => void
  reset: () => void
}

const defaultSettings: UserSettings = {
  soundEnabled: true,
  theme: 'system',
  dailyGoalXP: 50,
  emailNotifications: true,
}

const defaultProgress: UserProgress = {
  userId: '',
  totalXP: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: '',
  lessonsCompleted: [],
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      settings: defaultSettings,
      progress: null,
      lessonProgress: {},
      activityHistory: {},
      isLoading: false,
      isSidebarOpen: true,

      // Actions
      setUser: (user) => set({ user }),

      setProgress: (progress) => {
        set({ progress })
        // Auto-sync to Supabase (fire-and-forget)
        syncUserProgress(progress).catch(err => console.error('Sync error:', err))
      },

      updateProgress: (updates) =>
        set((state) => {
          const newProgress = state.progress
            ? { ...state.progress, ...updates }
            : { ...defaultProgress, ...updates }

          // Auto-sync to Supabase (fire-and-forget)
          syncUserProgress(newProgress).catch(err => console.error('Sync error:', err))

          return { progress: newProgress }
        }),

      setLessonProgress: (lessonId, progress) =>
        set((state) => {
          // Auto-sync to Supabase (fire-and-forget)
          syncLessonProgress(progress).catch(err => console.error('Sync error:', err))

          return { lessonProgress: { ...state.lessonProgress, [lessonId]: progress } }
        }),

      updateSettings: (updates) =>
        set((state) => {
          const newSettings = { ...state.settings, ...updates }

          // Auto-sync to Supabase (fire-and-forget)
          if (state.user?.id) {
            syncUserSettings(state.user.id, newSettings).catch(err => console.error('Sync error:', err))
          }

          return { settings: newSettings }
        }),

      addXP: (amount) =>
        set((state) => {
          if (!state.progress) return state
          const newTotalXP = state.progress.totalXP + amount
          // Calculate new level based on XP
          const newLevel = calculateLevel(newTotalXP)
          const newProgress = {
            ...state.progress,
            totalXP: newTotalXP,
            level: newLevel,
          }

          // Auto-sync to Supabase (fire-and-forget)
          syncUserProgress(newProgress).catch(err => console.error('Sync error:', err))

          return { progress: newProgress }
        }),

      recordActivity: () =>
        set((state) => {
          const today = new Date().toISOString().split('T')[0]
          const currentCount = state.activityHistory[today] || 0
          const newActivityHistory = {
            ...state.activityHistory,
            [today]: currentCount + 1,
          }

          // Sync to Supabase if user is logged in
          const userId = state.user?.id
          if (userId) {
            syncDailyActivity(userId, today, currentCount + 1).catch(err =>
              console.error('Sync error:', err)
            )
          }

          return { activityHistory: newActivityHistory }
        }),

      getActivityForDate: (date: string): number => {
        return useStore.getState().activityHistory[date] || 0
      },

      backfillActivityHistory: () =>
        set((state) => {
          // Only backfill if activityHistory is empty or very sparse
          const hasActivity = Object.keys(state.activityHistory).length > 0
          if (hasActivity) return state

          const newActivityHistory: ActivityHistory = { ...state.activityHistory }

          // Backfill from lesson progress completedAt dates
          for (const [, lessonProgress] of Object.entries(state.lessonProgress)) {
            if (lessonProgress.status === 'completed' && lessonProgress.completedAt) {
              const completedDate = new Date(lessonProgress.completedAt)
              const dateStr = completedDate.toISOString().split('T')[0]
              newActivityHistory[dateStr] = (newActivityHistory[dateStr] || 0) + 1
            }
          }

          // Sync to Supabase if user is logged in
          const userId = state.user?.id
          if (userId && Object.keys(newActivityHistory).length > 0) {
            // Sync all backfilled dates
            for (const [date, count] of Object.entries(newActivityHistory)) {
              syncDailyActivity(userId, date, count).catch(err =>
                console.error('Sync error:', err)
              )
            }
          }

          return { activityHistory: newActivityHistory }
        }),

      completeLesson: (lessonId: string, xpEarned: number) =>
        set((state) => {
          const currentProgress = state.progress || defaultProgress
          const alreadyCompleted = currentProgress.lessonsCompleted.includes(lessonId)

          if (alreadyCompleted) return state

          // Record activity for lesson completion
          const today = new Date().toISOString().split('T')[0]
          const currentActivityCount = state.activityHistory[today] || 0
          const newActivityHistory = {
            ...state.activityHistory,
            [today]: currentActivityCount + 1,
          }

          // Sync to Supabase if user is logged in
          const userId = state.user?.id
          if (userId) {
            syncDailyActivity(userId, today, currentActivityCount + 1).catch(err =>
              console.error('Sync error:', err)
            )
          }

          const existingLessonProgress = state.lessonProgress[lessonId]
          const hasEarnedXP = existingLessonProgress?.hasEarnedXP === true

          // If XP was already earned (redo scenario), skip XP and streak updates
          let newProgress: UserProgress
          if (hasEarnedXP) {
            // Don't add XP or update streaks, just mark as completed
            newProgress = {
              ...currentProgress,
              lessonsCompleted: [...currentProgress.lessonsCompleted, lessonId],
            }
          } else {
            // First time completion - award XP and update streaks
            const newTotalXP = currentProgress.totalXP + xpEarned
            const today = new Date().toISOString().split('T')[0]
            const lastDate = currentProgress.lastActivityDate

            // Calculate streak
            let newStreak = currentProgress.currentStreak
            if (lastDate !== today) {
              const yesterday = new Date()
              yesterday.setDate(yesterday.getDate() - 1)
              const yesterdayStr = yesterday.toISOString().split('T')[0]

              if (lastDate === yesterdayStr) {
                newStreak += 1
              } else if (lastDate !== today) {
                newStreak = 1
              }
            }

            newProgress = {
              ...currentProgress,
              totalXP: newTotalXP,
              level: calculateLevel(newTotalXP),
              lessonsCompleted: [...currentProgress.lessonsCompleted, lessonId],
              lastActivityDate: today,
              currentStreak: newStreak,
              longestStreak: Math.max(currentProgress.longestStreak, newStreak),
            }
          }

          const newLessonProgress: LessonProgress = {
            ...existingLessonProgress,
            lessonId,
            userId: currentProgress.userId,
            status: 'completed' as const,
            completedAt: new Date(),
            xpEarned: hasEarnedXP ? (existingLessonProgress?.xpEarned || 0) : xpEarned,
            currentStepIndex: existingLessonProgress?.currentStepIndex || 0,
            stepsCompleted: existingLessonProgress?.stepsCompleted || [],
            attempts: (existingLessonProgress?.attempts || 0) + 1,
            hasEarnedXP: hasEarnedXP || true, // Set to true if not already set
          }

          // Auto-sync to Supabase (fire-and-forget)
          syncUserProgress(newProgress).catch(err => console.error('Sync error:', err))
          syncLessonProgress(newLessonProgress).catch(err => console.error('Sync error:', err))

          // Trigger recap generation in background (fire-and-forget)
          setTimeout(async () => {
            try {
              const { useRecapStore } = await import('./recap-store')
              const { usePracticeStore } = await import('./practice-store')
              const { calculateChallengeScore } = await import('@/lib/challenge-scorer')
              const { lessons } = await import('@/content/curriculum')
              
              const lesson = lessons[lessonId]
              if (!lesson) return

              const challengeScore = calculateChallengeScore(
                lessonId,
                newLessonProgress,
                usePracticeStore.getState().practiceStats,
                usePracticeStore.getState().focusedPracticeStats
              )

              if (challengeScore) {
                const currentCache = useRecapStore.getState().cache
                // Only generate if this lesson has a higher score than current cache
                if (!currentCache || challengeScore.score > currentCache.challengeScore) {
                  await useRecapStore.getState().generateRecapForLesson(lesson, challengeScore.score)
                }
              }
            } catch (error) {
              console.error('Failed to trigger recap generation:', error)
              // Silently fail
            }
          }, 0)

          return {
            progress: newProgress,
            lessonProgress: {
              ...state.lessonProgress,
              [lessonId]: newLessonProgress,
            },
            activityHistory: newActivityHistory,
          }
        }),

      redoLesson: (lessonId: string) =>
        set((state) => {
          const currentProgress = state.progress || defaultProgress
          const existingLessonProgress = state.lessonProgress[lessonId]

          // Remove from completed list
          const newLessonsCompleted = currentProgress.lessonsCompleted.filter(
            (id) => id !== lessonId
          )

          // Reset lesson progress but preserve hasEarnedXP flag
          const resetLessonProgress: LessonProgress = {
            lessonId,
            userId: currentProgress.userId,
            status: 'not-started' as const,
            currentStepIndex: 0,
            stepsCompleted: [],
            xpEarned: existingLessonProgress?.xpEarned || 0,
            attempts: existingLessonProgress?.attempts || 0,
            hasEarnedXP: existingLessonProgress?.hasEarnedXP || false, // Preserve the flag
            // Clear completedAt but keep startedAt if it exists
            startedAt: existingLessonProgress?.startedAt,
          }

          const newProgress: UserProgress = {
            ...currentProgress,
            lessonsCompleted: newLessonsCompleted,
          }

          // Auto-sync to Supabase (fire-and-forget)
          syncUserProgress(newProgress).catch(err => console.error('Sync error:', err))
          syncLessonProgress(resetLessonProgress).catch(err => console.error('Sync error:', err))

          return {
            progress: newProgress,
            lessonProgress: {
              ...state.lessonProgress,
              [lessonId]: resetLessonProgress,
            },
          }
        }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      reset: () =>
        set({
          user: null,
          progress: null,
          lessonProgress: {},
          activityHistory: {},
        }),
    }),
    {
      name: 'typescript-champ-storage',
      partialize: (state) => ({
        user: state.user,
        settings: state.settings,
        progress: state.progress,
        lessonProgress: state.lessonProgress,
        activityHistory: state.activityHistory,
      }),
    }
  )
)

// Helper function to calculate level from XP
function calculateLevel(totalXP: number): number {
  const thresholds = [0, 100, 250, 500, 850, 1300, 1900, 2600, 3500, 4600]
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (totalXP >= thresholds[i]) {
      return i + 1
    }
  }
  return 1
}
