import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserProgress, LessonProgress, UserSettings } from '@/types'
import { syncUserProgress, syncLessonProgress, syncUserSettings } from '@/services/supabase-sync'

interface AppState {
  // User state
  user: User | null
  settings: UserSettings
  progress: UserProgress | null
  lessonProgress: Record<string, LessonProgress>

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

      completeLesson: (lessonId, xpEarned) =>
        set((state) => {
          const currentProgress = state.progress || defaultProgress
          const alreadyCompleted = currentProgress.lessonsCompleted.includes(lessonId)

          if (alreadyCompleted) return state

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

          const newProgress = {
            ...currentProgress,
            totalXP: newTotalXP,
            level: calculateLevel(newTotalXP),
            lessonsCompleted: [...currentProgress.lessonsCompleted, lessonId],
            lastActivityDate: today,
            currentStreak: newStreak,
            longestStreak: Math.max(currentProgress.longestStreak, newStreak),
          }

          const newLessonProgress = {
            ...state.lessonProgress[lessonId],
            lessonId,
            userId: currentProgress.userId,
            status: 'completed' as const,
            completedAt: new Date(),
            xpEarned,
            currentStepIndex: state.lessonProgress[lessonId]?.currentStepIndex || 0,
            stepsCompleted: state.lessonProgress[lessonId]?.stepsCompleted || [],
            attempts: state.lessonProgress[lessonId]?.attempts || 1,
          }

          // Auto-sync to Supabase (fire-and-forget)
          syncUserProgress(newProgress).catch(err => console.error('Sync error:', err))
          syncLessonProgress(newLessonProgress).catch(err => console.error('Sync error:', err))

          return {
            progress: newProgress,
            lessonProgress: {
              ...state.lessonProgress,
              [lessonId]: newLessonProgress,
            },
          }
        }),

      setLoading: (loading) => set({ isLoading: loading }),

      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

      reset: () =>
        set({
          user: null,
          progress: null,
          lessonProgress: {},
        }),
    }),
    {
      name: 'typescript-champ-storage',
      partialize: (state) => ({
        user: state.user,
        settings: state.settings,
        progress: state.progress,
        lessonProgress: state.lessonProgress,
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
