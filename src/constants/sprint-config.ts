/**
 * Sprint Mode Configuration
 *
 * Centralized config for Sprints mode XP, generation, and UI settings
 */

export const SPRINT_CONFIG = {
  /**
   * XP awarded per successfully completed exercise
   * Fixed amount for predictable progression
   */
  XP_PER_EXERCISE: 15,

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
   * Allowed difficulty levels for Sprint exercises
   * Only easy and medium - no hard exercises in Sprints
   */
  ALLOWED_DIFFICULTIES: ['easy', 'medium'] as const,

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
export type SprintDifficulty = typeof SPRINT_CONFIG.ALLOWED_DIFFICULTIES[number]
