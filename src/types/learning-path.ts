import type { LessonStep } from './lesson'
import type { ThemeContext } from './practice'

export type GoalStatus = 'active' | 'paused' | 'completed' | 'abandoned'

export interface LearningGoal {
  id: string
  userId: string
  title: string
  description: string
  createdAt: string
  status: GoalStatus
}

export interface LearningPath {
  id: string
  goalId: string
  userId: string
  title: string
  description: string
  createdAt: string
  updatedAt: string
  modules: LearningPathModule[]
  progress: number // 0-1
  themeContext: ThemeContext
  estimatedHours: number
}

export type ModuleStatus = 'locked' | 'available' | 'in-progress' | 'completed' | 'skipped'
export type ModuleRelevance = 'essential' | 'recommended' | 'optional'

export interface LearningPathModule {
  id: string
  baseLessonId: string | null
  title: string
  description: string
  order: number
  skipped: boolean
  status: ModuleStatus
  relevance: ModuleRelevance
  customizationNotes: string
  estimatedMinutes: number
  xpReward: number
}

export interface LearningPathStep {
  id: string
  order: number
  source:
    | { type: 'lesson'; lessonId: string; stepId: string }
    | { type: 'generated'; generatedAt: string }
  step: LessonStep
  themeApplied: boolean
  completed: boolean
}

export interface LearningPathProgress {
  pathId: string
  userId: string
  currentModuleIndex: number
  currentStepIndex: number
  modulesCompleted: string[]
  stepsCompleted: string[]
  xpEarned: number
  startedAt: string
  lastActivityAt: string
}

export interface GoalAnalysisResponse {
  success: boolean
  analysis?: {
    analysis: {
      projectType: string
      domain: string
      keyTechnologies: string[]
      conceptsNeeded: string[]
    }
    themeContext: ThemeContext
    suggestedPath: {
      title: string
      description: string
      modules: Array<{
        baseLessonId: string | null
        title: string
        relevance: ModuleRelevance
        order: number
        customizationNotes: string
      }>
      estimatedHours: number
    }
  }
  error?: string
  metadata?: {
    analysisTimeMs: number
    lessonsAnalyzed: number
  }
}

export interface GoalExample {
  title: string
  description: string
}
