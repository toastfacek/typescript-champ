import type { PracticeExercise } from './practice'

/**
 * Cached recap data for the welcome card on the home page.
 * Pre-generated during lesson completion for zero LLM calls on landing.
 */
export interface RecapCache {
  lessonId: string
  lessonTitle: string
  lessonLanguage: 'typescript' | 'python'
  recapContent: string        // Static - pulled from lesson keyConcepts/description
  exercise: PracticeExercise  // Pre-generated exercise
  generatedAt: string         // ISO date
  challengeScore: number      // Score used to determine if this should replace existing cache
  timesCompleted: number      // Track how many recaps done for this concept
  isRegenerating: boolean     // True while fetching next exercise
}

/**
 * Input for generating a recap exercise
 */
export interface GenerateRecapRequest {
  lessonId: string
  lessonTitle: string
  lessonDescription: string
  lessonTags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  language: 'typescript' | 'python'
  timesCompleted?: number     // Used to vary exercises for repeat visitors
}

/**
 * Response from the recap generation endpoint
 */
export interface GenerateRecapResponse {
  success: boolean
  exercise?: PracticeExercise
  error?: string
}

/**
 * Challenge score calculation result
 */
export interface ChallengeScore {
  lessonId: string
  score: number
  factors: {
    recency: number       // 1 / daysSinceCompletion
    attempts: number      // 1 + (attempts - 1) * 0.3
    difficulty: number    // beginner=1.0, intermediate=1.2, advanced=1.5
    masteryBoost: number  // 1.3 if mastery is 'learning' or 'practicing'
  }
}

