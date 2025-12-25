import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RecapCache, GenerateRecapRequest } from '@/types/recap'
import type { Lesson } from '@/types/lesson'
import { generateRecap } from '@/services/api-client'
import { findMostChallengingLesson } from '@/lib/challenge-scorer'
import { useStore } from './index'
import { usePracticeStore } from './practice-store'

interface RecapState {
  cache: RecapCache | null
  
  // Actions
  generateRecapForLesson: (lesson: Lesson, challengeScore: number) => Promise<void>
  completeRecap: () => Promise<void>
  getValidCache: () => RecapCache | null
  clearCache: () => void
}

const CACHE_TTL_DAYS = 7

export const useRecapStore = create<RecapState>()(
  persist(
    (set, get) => ({
      cache: null,

      /**
       * Generate recap exercise for a lesson and cache it.
       * Called during lesson completion if this lesson has a higher challenge score.
       */
      generateRecapForLesson: async (lesson: Lesson, challengeScore: number) => {
        try {
          // Build recap content from lesson data (no LLM needed)
          const recapContent = buildRecapContent(lesson)

          const request: GenerateRecapRequest = {
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            lessonDescription: lesson.description,
            lessonTags: lesson.tags,
            difficulty: lesson.difficulty,
            language: lesson.language || 'typescript',
            timesCompleted: get().cache?.timesCompleted || 0
          }

          const response = await generateRecap(request)

          if (response.success && response.exercise) {
            const cache: RecapCache = {
              lessonId: lesson.id,
              lessonTitle: lesson.title,
              lessonLanguage: lesson.language || 'typescript',
              recapContent,
              exercise: response.exercise,
              generatedAt: new Date().toISOString(),
              challengeScore,
              timesCompleted: 0,
              isRegenerating: false
            }

            set({ cache })
          }
        } catch (error) {
          console.error('Failed to generate recap:', error)
          // Silently fail - user will see standard home page
        }
      },

      /**
       * Called when user completes the recap exercise.
       * Awards XP and triggers regeneration for the same concept.
       */
      completeRecap: async () => {
        const { cache } = get()
        if (!cache) return

        // Award bonus XP (5-10 XP)
        const xpReward = 7
        useStore.getState().addXP(xpReward)

        // Increment completion counter
        const updatedCache: RecapCache = {
          ...cache,
          timesCompleted: cache.timesCompleted + 1,
          isRegenerating: true
        }
        set({ cache: updatedCache })

        // Regenerate exercise for the same concept in background
        try {
          // Find the lesson object
          const { lessons } = await import('@/content/curriculum')
          const lessonObj = lessons.find(l => l.id === cache.lessonId)
          if (!lessonObj) return

          const request: GenerateRecapRequest = {
            lessonId: lessonObj.id,
            lessonTitle: lessonObj.title,
            lessonDescription: lessonObj.description,
            lessonTags: lessonObj.tags,
            difficulty: lessonObj.difficulty,
            language: lessonObj.language || 'typescript',
            timesCompleted: updatedCache.timesCompleted
          }

          const response = await generateRecap(request)

          if (response.success && response.exercise) {
            const newCache: RecapCache = {
              ...updatedCache,
              exercise: response.exercise,
              generatedAt: new Date().toISOString(),
              isRegenerating: false
            }
            set({ cache: newCache })
          } else {
            // If regeneration fails, clear the regenerating flag
            set({ cache: { ...updatedCache, isRegenerating: false } })
          }
        } catch (error) {
          console.error('Failed to regenerate recap:', error)
          set({ cache: { ...updatedCache, isRegenerating: false } })
        }
      },

      /**
       * Get valid cache if it exists and hasn't expired.
       */
      getValidCache: () => {
        const { cache } = get()
        if (!cache) return null

        // Check TTL
        const generatedAt = new Date(cache.generatedAt)
        const daysSinceGeneration = Math.floor(
          (Date.now() - generatedAt.getTime()) / (1000 * 60 * 60 * 24)
        )

        if (daysSinceGeneration > CACHE_TTL_DAYS) {
          set({ cache: null })
          return null
        }

        return cache
      },

      clearCache: () => set({ cache: null })
    }),
    {
      name: 'typescript-champ-recap',
      partialize: (state) => ({
        cache: state.cache
      })
    }
  )
)

/**
 * Build static recap content from lesson data.
 * No LLM needed - just format key concepts and description.
 */
function buildRecapContent(lesson: Lesson): string {
  const parts: string[] = []

  // Add description
  if (lesson.description) {
    parts.push(lesson.description)
  }

  // Add first 2-3 key concepts
  if (lesson.keyConcepts && lesson.keyConcepts.length > 0) {
    const concepts = lesson.keyConcepts.slice(0, 2)
    const conceptTexts = concepts.map(kc => {
      let text = `**${kc.term}**: ${kc.definition}`
      if (kc.syntax) {
        text += ` Syntax: \`${kc.syntax}\``
      }
      return text
    })
    parts.push(conceptTexts.join(' '))
  }

  return parts.join('\n\n')
}


