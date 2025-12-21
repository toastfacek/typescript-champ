// User profile
export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
  createdAt: Date
}

export interface UserSettings {
  soundEnabled: boolean
  theme: 'light' | 'dark' | 'system'
  dailyGoalXP: number
  emailNotifications: boolean
}

// Overall user progress
export interface UserProgress {
  userId: string
  totalXP: number
  level: number
  currentStreak: number
  longestStreak: number
  lastActivityDate: string
  lessonsCompleted: string[]
}

// Progress on individual lesson
export interface LessonProgress {
  lessonId: string
  userId: string
  status: 'not-started' | 'in-progress' | 'completed'
  currentStepIndex: number
  stepsCompleted: string[]
  startedAt?: Date
  completedAt?: Date
  xpEarned: number
  attempts: number
}

// Step-level attempt
export interface StepAttempt {
  stepId: string
  lessonId: string
  userId: string
  attemptNumber: number
  userCode?: string
  userAnswers?: Record<string, string>
  passed: boolean
  timestamp: Date
  hintsUsed: number
  aiHintsUsed: number
}
