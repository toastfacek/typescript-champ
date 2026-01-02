/**
 * Sprint Mode Configuration
 *
 * Sprints are designed for fundamental drilling - think "Kumon for coding"
 * Exercises are 2-4 lines, single concept, 30-60 seconds each
 * Focus on building confidence through repetitive practice of basics
 */

export const SPRINT_CONFIG = {
  /**
   * XP awarded per successfully completed exercise
   * Fixed amount for predictable progression
   */
  XP_PER_EXERCISE: 15,

  /**
   * Pre-generate all exercises before starting sprint
   * Better UX: one loading screen, then instant exercises
   */
  PRE_GENERATE_ALL: true,

  /**
   * Number of exercises to generate in a batch
   * Allows for smooth UX without generation delays
   */
  BATCH_SIZE: 5,

  /**
   * Minimum exercises in queue before triggering background generation
   * Ensures user never waits for next exercise
   */
  MIN_QUEUE_SIZE: 2,

  /**
   * Maximum concurrent API requests for batch generation
   * Prevents rate limiting while maintaining speed
   */
  MAX_CONCURRENT_GENERATIONS: 3,

  /**
   * Difficulty level for Sprint exercises
   * Always uses 'easy' which maps to 'fundamental' drilling on backend
   * (2-4 lines, single concept, 30-60 seconds)
   */
  DIFFICULTY: 'easy' as const,

  /**
   * Exercise type for Sprints
   * Code exercises only - no fill-blank or quiz
   */
  EXERCISE_TYPE: 'code-exercise' as const,

  /**
   * Generation timeout in milliseconds
   */
  GENERATION_TIMEOUT_MS: 10000,

  /**
   * UI: Modules per row on different screen sizes
   */
  MODULES_PER_ROW: {
    desktop: 3,
    tablet: 2,
    mobile: 1
  },

  /**
   * Bonus XP awarded for completing a module (all target exercises)
   */
  MODULE_COMPLETION_BONUS: 50,

  /**
   * Local storage key for Sprints state
   */
  STORAGE_KEY: 'typescript-champ-sprints',

  /**
   * Supabase table name for cloud sync
   */
  SUPABASE_TABLE: 'sprint_module_progress'
} as const

/**
 * Type-safe difficulty type for Sprints
 */
export type SprintDifficulty = typeof SPRINT_CONFIG.DIFFICULTY
