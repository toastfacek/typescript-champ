export interface VibeTutorStep {
  id: string
  title: string
  content: string // Markdown instruction content
  files?: Record<string, string> // Initial/Expected files for this step
  starterCode?: string // Legacy/Quick snippet
  relatedConcepts: string[] // e.g. "Interfaces", "Async/Await"
}

export interface VibeTutorModule {
  id: string
  title: string
  steps: VibeTutorStep[]
}

export interface VibeTutorProject {
  id: string
  user_id?: string
  title: string
  description: string
  language: 'typescript' | 'python'
  modules: VibeTutorModule[]
  currentModuleId: string
  currentStepId: string
  files: Record<string, string> // Current file state
  createdAt: number
  updatedAt: number
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export type ReviewStatus = 'pass' | 'requests_changes' | 'pending' | 'idle'
