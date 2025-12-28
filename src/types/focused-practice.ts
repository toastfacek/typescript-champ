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
  lessonId: string
  lessonTitle: string
  steps: LessonStep[]
  estimatedMinutes: number
  language?: 'typescript' | 'python'
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
  lessonContext: {
    lessonId: string
    lessonTitle: string
    lessonDescription: string
    lessonTags: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    language?: 'typescript' | 'python'
  }
  practiceDifficulty?: 'easy' | 'medium' | 'hard'
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

export interface StoredFocusedSession {
  id: string
  lessonId: string
  lessonTitle: string
  miniLesson: FocusedPracticeMiniLesson
  currentStepIndex: number
  completedSteps: string[]
  status: 'in_progress' | 'completed'
  startedAt: string  // ISO string
  completedAt?: string
  language?: 'typescript' | 'python'
}

