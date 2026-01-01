import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  SprintModule,
  SprintProgress,
  SprintExercise,
  SprintModuleStatus
} from '@/types/sprints'
import type { PracticeTopic } from '@/types/practice'
import { getSprintModules } from '@/constants/sprint-modules'
import { SPRINT_CONFIG } from '@/constants/sprint-config'
import { generateExercise as apiGenerateExercise } from '@/services/api-client'
import { syncSprintProgress } from '@/services/supabase-sync'
import { useStore } from './index'

interface SprintsState {
  // Module data
  modules: SprintModule[]
  moduleProgress: Record<string, SprintProgress>
  language: 'typescript' | 'python'

  // Current session
  currentModuleId: string | null
  currentExercise: SprintExercise | null
  exerciseQueue: SprintExercise[]
  isGenerating: boolean
  generationError: string | null

  // Session tracking
  sessionStartTime: Date | null
  exercisesCompletedInSession: number

  // Actions
  initializeModules: (language: 'typescript' | 'python') => void
  setLanguage: (language: 'typescript' | 'python') => void
  startModule: (moduleId: string) => void
  endSession: () => void
  generateNextExercise: () => Promise<void>
  generateBatch: (moduleId: string) => Promise<void>
  completeExercise: (success: boolean, timeSeconds: number) => void
  getModuleProgress: (moduleId: string) => SprintProgress
  getTotalSprintXP: () => number
  isModuleUnlocked: (moduleId: string) => boolean
  getModuleStatus: (moduleId: string) => SprintModuleStatus
  reset: () => void
}

// Default progress for a module
const defaultProgress = (moduleId: string): SprintProgress => ({
  moduleId,
  xpEarned: 0,
  exercisesAttempted: 0,
  exercisesCompleted: 0,
  startedAt: null,
  completedAt: null,
  lastPracticed: null,
  status: 'locked'
})

export const useSprintsStore = create<SprintsState>()(
  persist(
    (set, get) => ({
      // Initial state
      modules: [],
      moduleProgress: {},
      language: 'typescript',

      currentModuleId: null,
      currentExercise: null,
      exerciseQueue: [],
      isGenerating: false,
      generationError: null,

      sessionStartTime: null,
      exercisesCompletedInSession: 0,

      // Initialize modules for a language
      initializeModules: (language: 'typescript' | 'python') => {
        const modules = getSprintModules(language)
        const existingProgress = get().moduleProgress

        // Initialize progress for all modules if not exists
        const moduleProgress: Record<string, SprintProgress> = {}
        modules.forEach(module => {
          if (existingProgress[module.id]) {
            moduleProgress[module.id] = existingProgress[module.id]
          } else {
            moduleProgress[module.id] = defaultProgress(module.id)
          }
        })

        // Update status based on unlock logic
        modules.forEach(module => {
          const totalXP = Object.values(moduleProgress).reduce((sum, p) => sum + p.xpEarned, 0)
          const isUnlocked = module.order === 1 || totalXP >= module.unlockThresholdXP

          if (moduleProgress[module.id].status === 'locked' && isUnlocked) {
            moduleProgress[module.id].status = 'unlocked'
          }
        })

        set({ modules, moduleProgress, language })
      },

      // Set language and reinitialize
      setLanguage: (language: 'typescript' | 'python') => {
        get().initializeModules(language)
      },

      // Start a sprint module
      startModule: (moduleId: string) => {
        const { modules, moduleProgress, isModuleUnlocked } = get()

        // Verify module exists and is unlocked
        const module = modules.find(m => m.id === moduleId)
        if (!module) {
          console.error(`Module ${moduleId} not found`)
          return
        }

        if (!isModuleUnlocked(moduleId)) {
          console.error(`Module ${moduleId} is locked`)
          return
        }

        // Update progress status
        const progress = moduleProgress[moduleId] || defaultProgress(moduleId)
        if (progress.status === 'unlocked' || progress.status === 'locked') {
          progress.status = 'in-progress'
          progress.startedAt = new Date().toISOString()
        }
        progress.lastPracticed = new Date().toISOString()

        set({
          currentModuleId: moduleId,
          moduleProgress: { ...moduleProgress, [moduleId]: progress },
          sessionStartTime: new Date(),
          exercisesCompletedInSession: 0,
          currentExercise: null,
          exerciseQueue: []
        })

        // Start generating exercises in background
        get().generateBatch(moduleId)
      },

      // End current session
      endSession: () => {
        set({
          currentModuleId: null,
          currentExercise: null,
          sessionStartTime: null,
          exercisesCompletedInSession: 0
        })
      },

      // Generate next exercise (from queue or new)
      generateNextExercise: async () => {
        const { currentModuleId, exerciseQueue, modules, language } = get()

        if (!currentModuleId) {
          console.error('No active module')
          return
        }

        const module = modules.find(m => m.id === currentModuleId)
        if (!module) {
          console.error(`Module ${currentModuleId} not found`)
          return
        }

        // Use queued exercise if available
        if (exerciseQueue.length > 0) {
          const [nextExercise, ...remainingQueue] = exerciseQueue
          set({
            currentExercise: nextExercise,
            exerciseQueue: remainingQueue
          })

          // Auto-refill queue if running low
          if (remainingQueue.length < SPRINT_CONFIG.MIN_QUEUE_SIZE) {
            get().generateBatch(currentModuleId)
          }
          return
        }

        // Generate single exercise
        set({ isGenerating: true, generationError: null })

        try {
          const topic = module.topics[Math.floor(Math.random() * module.topics.length)] as PracticeTopic
          const difficulty = SPRINT_CONFIG.DIFFICULTY  // Always use fundamental difficulty

          const exercise = await apiGenerateExercise({
            topic,
            difficulty,
            exerciseType: 'code-exercise',
            language,
            sprintMode: true
          })

          if (!exercise.exercise) {
            throw new Error('No exercise returned from API')
          }

          if (exercise.exercise.step.type !== 'code-exercise') {
            throw new Error('Expected code-exercise step type')
          }

          const sprintExercise: SprintExercise = {
            id: crypto.randomUUID(),
            moduleId: currentModuleId,
            type: 'code-exercise',
            difficulty: 'easy' as const,  // Always fundamental difficulty
            topic,
            step: exercise.exercise.step,
            generatedAt: new Date().toISOString(),
            aiMetadata: exercise.exercise.aiMetadata
          }

          set({
            currentExercise: sprintExercise,
            isGenerating: false
          })

          // Start background batch generation
          get().generateBatch(currentModuleId)
        } catch (error) {
          console.error('Failed to generate exercise:', error)
          set({
            isGenerating: false,
            generationError: error instanceof Error ? error.message : 'Failed to generate exercise'
          })
        }
      },

      // Generate batch of exercises
      generateBatch: async (moduleId: string) => {
        const { modules, language, isGenerating } = get()

        // Don't start new batch if already generating
        if (isGenerating) return

        const module = modules.find(m => m.id === moduleId)
        if (!module) return

        set({ isGenerating: true, generationError: null })

        try {
          // Generate exercises concurrently (with limit)
          const promises: Promise<SprintExercise>[] = []

          for (let i = 0; i < SPRINT_CONFIG.BATCH_SIZE; i++) {
            // Randomize topic only - always use fundamental difficulty
            const topic = module.topics[Math.floor(Math.random() * module.topics.length)] as PracticeTopic
            const difficulty = SPRINT_CONFIG.DIFFICULTY  // Always use fundamental difficulty

            const promise = apiGenerateExercise({
              topic,
              difficulty,
              exerciseType: 'code-exercise',
              language,
              sprintMode: true
            }).then(exercise => {
              if (!exercise.exercise) {
                throw new Error('No exercise returned from API')
              }
              if (exercise.exercise.step.type !== 'code-exercise') {
                throw new Error('Expected code-exercise step type')
              }
              return {
                id: crypto.randomUUID(),
                moduleId,
                type: 'code-exercise' as const,
                difficulty: 'easy' as const,  // Always fundamental difficulty
                topic,
                step: exercise.exercise.step,
                generatedAt: new Date().toISOString(),
                aiMetadata: exercise.exercise.aiMetadata
              }
            })

            promises.push(promise)

            // Execute in batches of MAX_CONCURRENT_GENERATIONS
            if (promises.length >= SPRINT_CONFIG.MAX_CONCURRENT_GENERATIONS) {
              const exercises = await Promise.all(promises)
              set(state => ({
                exerciseQueue: [...state.exerciseQueue, ...exercises]
              }))
              promises.length = 0
            }
          }

          // Execute remaining promises
          if (promises.length > 0) {
            const exercises = await Promise.all(promises)
            set(state => ({
              exerciseQueue: [...state.exerciseQueue, ...exercises]
            }))
          }

          set({ isGenerating: false })
        } catch (error) {
          console.error('Failed to generate batch:', error)
          set({
            isGenerating: false,
            generationError: error instanceof Error ? error.message : 'Failed to generate exercises'
          })
        }
      },

      // Complete exercise and award XP
      completeExercise: (success: boolean, _timeSeconds: number) => {
        const { currentModuleId, moduleProgress, exercisesCompletedInSession } = get()

        if (!currentModuleId) return

        const progress = moduleProgress[currentModuleId] || defaultProgress(currentModuleId)

        // Update stats
        progress.exercisesAttempted++
        if (success) {
          progress.exercisesCompleted++
          progress.xpEarned += SPRINT_CONFIG.XP_PER_EXERCISE
        }
        progress.lastPracticed = new Date().toISOString()

        // Check if module is completed (reached target)
        const module = get().modules.find(m => m.id === currentModuleId)
        if (module && progress.exercisesCompleted >= module.targetExerciseCount) {
          progress.status = 'completed'
          progress.completedAt = new Date().toISOString()
          // Bonus XP for completion
          progress.xpEarned += SPRINT_CONFIG.MODULE_COMPLETION_BONUS
        }

        // Update all module unlock statuses based on new total XP
        const updatedProgress = { ...moduleProgress, [currentModuleId]: progress }
        const totalXP = Object.values(updatedProgress).reduce((sum, p) => sum + p.xpEarned, 0)

        get().modules.forEach(m => {
          if (m.order > 1 && updatedProgress[m.id].status === 'locked') {
            if (totalXP >= m.unlockThresholdXP) {
              updatedProgress[m.id] = { ...updatedProgress[m.id], status: 'unlocked' }
            }
          }
        })

        set({
          moduleProgress: updatedProgress,
          exercisesCompletedInSession: exercisesCompletedInSession + (success ? 1 : 0)
        })

        // Record activity in main store (for streaks)
        if (success) {
          useStore.getState().recordActivity()
          useStore.getState().updateStreakFromActivity()
        }

        // Sync to Supabase (fire-and-forget)
        const userId = useStore.getState().user?.id
        if (userId && userId !== 'demo-user') {
          syncSprintProgress(userId, currentModuleId, progress).catch(err =>
            console.error('Failed to sync sprint progress:', err)
          )
        }
      },

      // Get progress for a module
      getModuleProgress: (moduleId: string) => {
        const { moduleProgress } = get()
        return moduleProgress[moduleId] || defaultProgress(moduleId)
      },

      // Get total XP across all modules
      getTotalSprintXP: () => {
        const { moduleProgress } = get()
        return Object.values(moduleProgress).reduce((sum, p) => sum + p.xpEarned, 0)
      },

      // Check if module is unlocked
      isModuleUnlocked: (moduleId: string) => {
        const { modules, moduleProgress } = get()
        const module = modules.find(m => m.id === moduleId)
        if (!module) return false

        // First module always unlocked
        if (module.order === 1) return true

        // Check total XP
        const totalXP = Object.values(moduleProgress).reduce((sum, p) => sum + p.xpEarned, 0)
        return totalXP >= module.unlockThresholdXP
      },

      // Get module status
      getModuleStatus: (moduleId: string) => {
        const { moduleProgress, isModuleUnlocked } = get()
        const progress = moduleProgress[moduleId]

        if (!progress) {
          return isModuleUnlocked(moduleId) ? 'unlocked' : 'locked'
        }

        return progress.status
      },

      // Reset all progress
      reset: () => {
        set({
          moduleProgress: {},
          currentModuleId: null,
          currentExercise: null,
          exerciseQueue: [],
          sessionStartTime: null,
          exercisesCompletedInSession: 0
        })
        get().initializeModules(get().language)
      }
    }),
    {
      name: SPRINT_CONFIG.STORAGE_KEY,
      partialize: (state) => ({
        moduleProgress: state.moduleProgress,
        language: state.language
      })
    }
  )
)
