import type { LessonStep } from './lesson'

export interface Concept {
  id: string
  name: string
  description: string
}

export interface FocusedPracticeSession {
  id: string
  conceptId: string
  conceptName: string
  lessonId: string | null
  startedAt: Date
  endedAt?: Date
  stepsCompleted: number
  totalSteps: number
}

export interface FocusedPracticeMiniLesson {
  concept: Concept
  steps: LessonStep[]
  estimatedMinutes: number
}

export interface ConceptProgress {
  conceptId: string
  conceptName: string
  sessionsCompleted: number
  totalExercisesCompleted: number
  lastPracticed: string | null
  masteryLevel: 'learning' | 'practicing' | 'confident' | 'mastered'
}

export interface GenerateFocusedPracticeRequest {
  concept: Concept
  difficulty: 'easy' | 'medium' | 'hard'
  lessonContext?: {
    lessonId: string
    lessonTitle: string
    relatedConcepts?: string[]
  }
}

export interface GenerateFocusedPracticeResponse {
  success: boolean
  miniLesson?: FocusedPracticeMiniLesson
  error?: string
  validation?: {
    valid: boolean
    warnings: string[]
  }
}

