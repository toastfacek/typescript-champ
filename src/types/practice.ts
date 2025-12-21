import type { CodeExerciseStep, FillInBlankStep, QuizStep } from './lesson'

export type PracticeDifficulty = 'easy' | 'medium' | 'hard'

export type PracticeTopic =
  | 'basics'
  | 'types'
  | 'functions'
  | 'objects'
  | 'arrays'
  | 'generics'
  | 'advanced-types'
  | 'async'
  | 'classes'

export interface TopicInfo {
  id: PracticeTopic
  name: string
  description: string
}

export interface PracticeExercise {
  id: string
  type: 'code-exercise' | 'fill-in-blank' | 'quiz'
  topic: PracticeTopic
  difficulty: PracticeDifficulty
  step: CodeExerciseStep | FillInBlankStep | QuizStep
  generatedAt: string
  aiMetadata: {
    generationTimeMs: number
    modelUsed: string
  }
}

export interface PracticeSession {
  id: string
  topic: PracticeTopic
  difficulty: PracticeDifficulty
  exerciseType: 'code-exercise' | 'fill-in-blank' | 'quiz' | 'mixed'
  startedAt: Date
  endedAt?: Date
  exercisesAttempted: number
  exercisesCompleted: number
}

export type MasteryLevel = 'learning' | 'practicing' | 'confident' | 'mastered'

export interface DifficultyStats {
  attempts: number
  completed: number
}

export interface PracticeStats {
  topic: PracticeTopic
  totalAttempts: number
  totalCompleted: number
  averageTimeSeconds: number
  lastPracticed: string | null
  masteryLevel: MasteryLevel
  byDifficulty: {
    easy: DifficultyStats
    medium: DifficultyStats
    hard: DifficultyStats
  }
}

export interface GenerateExerciseRequest {
  topic: PracticeTopic
  difficulty: PracticeDifficulty
  exerciseType: 'code-exercise' | 'fill-in-blank' | 'quiz'
  themeContext?: ThemeContext
}

export interface ThemeContext {
  projectType?: string
  domain?: string
  exampleEntities?: string[]
  techStack?: string[]
}

export interface GenerateExerciseResponse {
  success: boolean
  exercise?: PracticeExercise
  error?: string
  validation?: {
    valid: boolean
    warnings: string[]
  }
}
