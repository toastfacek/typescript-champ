import type { CodeExerciseStep } from './lesson'

/**
 * Sprint Module - A structured learning path with XP-gated progression
 */
export interface SprintModule {
  id: string
  slug: string
  title: string
  description: string
  language: 'typescript' | 'python'
  order: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'

  // Progression
  unlockThresholdXP: number      // Total XP from all previous modules required
  targetExerciseCount: number    // Recommended exercises to complete (8-15)

  // Content
  topics: string[]               // Practice topics this module covers
  concepts: string[]             // Key concepts covered

  // Metadata
  estimatedMinutes: number
  icon?: string
}

/**
 * Progress for a single Sprint Module
 */
export interface SprintProgress {
  moduleId: string
  xpEarned: number
  exercisesAttempted: number
  exercisesCompleted: number
  startedAt: string | null
  completedAt: string | null
  lastPracticed: string | null
  status: 'locked' | 'unlocked' | 'in-progress' | 'completed'
}

/**
 * Sprint Exercise - Code exercise only (no fill-blank or quiz)
 * Sprints use fundamental difficulty (2-4 lines, 30-60 seconds)
 */
export interface SprintExercise {
  id: string
  moduleId: string
  type: 'code-exercise'          // Sprints only use code exercises
  difficulty: 'easy'              // Maps to 'fundamental' on backend (Kumon-style drilling)
  topic: string
  step: CodeExerciseStep
  generatedAt: string
  aiMetadata: {
    generationTimeMs: number
    modelUsed: string
  }
}

/**
 * Active Sprint Session
 */
export interface SprintSession {
  moduleId: string
  startedAt: Date
  exercisesAttempted: number
  exercisesCompleted: number
  xpEarned: number
}

/**
 * Status of Sprint module unlock
 */
export type SprintModuleStatus = 'locked' | 'unlocked' | 'in-progress' | 'completed'
