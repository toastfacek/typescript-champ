import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  PracticeTopic,
  PracticeDifficulty,
  PracticeExercise,
  PracticeSession,
  PracticeStats,
  MasteryLevel
} from '@/types/practice'
import { generateExercise as apiGenerateExercise } from '@/services/api-client'

interface PracticeState {
  // Current session
  currentSession: PracticeSession | null
  currentExercise: PracticeExercise | null
  isGenerating: boolean
  generationError: string | null

  // Stats (persisted)
  practiceStats: Record<PracticeTopic, PracticeStats>

  // Actions
  startSession: (
    topic: PracticeTopic,
    difficulty: PracticeDifficulty,
    exerciseType: 'code-exercise' | 'fill-in-blank' | 'quiz' | 'mixed'
  ) => void
  endSession: () => void
  generateNextExercise: () => Promise<void>
  completeExercise: (success: boolean, timeSeconds: number) => void
  getStats: (topic: PracticeTopic) => PracticeStats
  resetStats: () => void
}

const defaultStats = (topic: PracticeTopic): PracticeStats => ({
  topic,
  totalAttempts: 0,
  totalCompleted: 0,
  averageTimeSeconds: 0,
  lastPracticed: null,
  masteryLevel: 'learning',
  byDifficulty: {
    easy: { attempts: 0, completed: 0 },
    medium: { attempts: 0, completed: 0 },
    hard: { attempts: 0, completed: 0 }
  }
})

function calculateMasteryLevel(stats: PracticeStats): MasteryLevel {
  const { totalCompleted, byDifficulty } = stats

  if (totalCompleted === 0) return 'learning'

  const hardCompletion = byDifficulty.hard.completed
  const mediumCompletion = byDifficulty.medium.completed

  if (hardCompletion >= 5 && mediumCompletion >= 5) return 'mastered'
  if (mediumCompletion >= 5 || (hardCompletion >= 2 && mediumCompletion >= 3)) return 'confident'
  if (totalCompleted >= 5) return 'practicing'

  return 'learning'
}

export const usePracticeStore = create<PracticeState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentSession: null,
      currentExercise: null,
      isGenerating: false,
      generationError: null,
      practiceStats: {} as Record<PracticeTopic, PracticeStats>,

      // Actions
      startSession: (topic, difficulty, exerciseType) => {
        const session: PracticeSession = {
          id: `session-${Date.now()}`,
          topic,
          difficulty,
          exerciseType,
          startedAt: new Date(),
          exercisesAttempted: 0,
          exercisesCompleted: 0
        }
        set({
          currentSession: session,
          currentExercise: null,
          generationError: null
        })
      },

      endSession: () => {
        const { currentSession } = get()
        if (currentSession) {
          set({
            currentSession: {
              ...currentSession,
              endedAt: new Date()
            }
          })
        }
        // Clear after a brief delay to allow UI to show summary
        setTimeout(() => {
          set({
            currentSession: null,
            currentExercise: null
          })
        }, 100)
      },

      generateNextExercise: async () => {
        const { currentSession } = get()
        if (!currentSession) {
          set({ generationError: 'No active session' })
          return
        }

        set({ isGenerating: true, generationError: null })

        try {
          // Determine exercise type
          let exerciseType: 'code-exercise' | 'fill-in-blank' | 'quiz'
          if (currentSession.exerciseType === 'mixed') {
            const types: Array<'code-exercise' | 'fill-in-blank' | 'quiz'> = [
              'code-exercise',
              'fill-in-blank',
              'quiz'
            ]
            exerciseType = types[Math.floor(Math.random() * types.length)]
          } else {
            exerciseType = currentSession.exerciseType as 'code-exercise' | 'fill-in-blank' | 'quiz'
          }

          const response = await apiGenerateExercise({
            topic: currentSession.topic,
            difficulty: currentSession.difficulty,
            exerciseType
          })

          if (!response.success || !response.exercise) {
            throw new Error(response.error || 'Failed to generate exercise')
          }

          set({
            currentExercise: response.exercise,
            isGenerating: false
          })
        } catch (error) {
          set({
            isGenerating: false,
            generationError: error instanceof Error ? error.message : 'Unknown error'
          })
        }
      },

      completeExercise: (success, timeSeconds) => {
        const { currentSession, currentExercise, practiceStats } = get()
        if (!currentSession || !currentExercise) return

        const topic = currentSession.topic
        const difficulty = currentSession.difficulty
        const currentStats = practiceStats[topic] || defaultStats(topic)

        // Update difficulty-specific stats
        const diffStats = currentStats.byDifficulty[difficulty]
        const newDiffStats = {
          attempts: diffStats.attempts + 1,
          completed: diffStats.completed + (success ? 1 : 0)
        }

        // Calculate new average time
        const newTotalAttempts = currentStats.totalAttempts + 1
        const newTotalCompleted = currentStats.totalCompleted + (success ? 1 : 0)
        const newAverageTime = success
          ? (currentStats.averageTimeSeconds * currentStats.totalCompleted + timeSeconds) /
            Math.max(newTotalCompleted, 1)
          : currentStats.averageTimeSeconds

        const updatedStats: PracticeStats = {
          ...currentStats,
          totalAttempts: newTotalAttempts,
          totalCompleted: newTotalCompleted,
          averageTimeSeconds: Math.round(newAverageTime),
          lastPracticed: new Date().toISOString(),
          byDifficulty: {
            ...currentStats.byDifficulty,
            [difficulty]: newDiffStats
          },
          masteryLevel: 'learning' // Will be recalculated
        }

        updatedStats.masteryLevel = calculateMasteryLevel(updatedStats)

        // Update session
        const updatedSession: PracticeSession = {
          ...currentSession,
          exercisesAttempted: currentSession.exercisesAttempted + 1,
          exercisesCompleted: currentSession.exercisesCompleted + (success ? 1 : 0)
        }

        set({
          currentSession: updatedSession,
          currentExercise: null, // Clear for next exercise
          practiceStats: {
            ...practiceStats,
            [topic]: updatedStats
          }
        })
      },

      getStats: (topic) => {
        const { practiceStats } = get()
        return practiceStats[topic] || defaultStats(topic)
      },

      resetStats: () => {
        set({ practiceStats: {} as Record<PracticeTopic, PracticeStats> })
      }
    }),
    {
      name: 'typescript-champ-practice',
      partialize: (state) => ({
        practiceStats: state.practiceStats
      })
    }
  )
)
