import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, UserProgress, LessonProgress, UserSettings } from '@/types'

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

      setProgress: (progress) => set({ progress }),

      updateProgress: (updates) =>
        set((state) => ({
          progress: state.progress
            ? { ...state.progress, ...updates }
            : { ...defaultProgress, ...updates },
        })),

      setLessonProgress: (lessonId, progress) =>
        set((state) => ({
          lessonProgress: { ...state.lessonProgress, [lessonId]: progress },
        })),

      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),

      addXP: (amount) =>
        set((state) => {
          if (!state.progress) return state
          const newTotalXP = state.progress.totalXP + amount
          // Calculate new level based on XP
          const newLevel = calculateLevel(newTotalXP)
          return {
            progress: {
              ...state.progress,
              totalXP: newTotalXP,
              level: newLevel,
            },
          }
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

          return {
            progress: {
              ...currentProgress,
              totalXP: newTotalXP,
              level: calculateLevel(newTotalXP),
              lessonsCompleted: [...currentProgress.lessonsCompleted, lessonId],
              lastActivityDate: today,
              currentStreak: newStreak,
              longestStreak: Math.max(currentProgress.longestStreak, newStreak),
            },
            lessonProgress: {
              ...state.lessonProgress,
              [lessonId]: {
                ...state.lessonProgress[lessonId],
                status: 'completed',
                completedAt: new Date(),
                xpEarned,
              },
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
