export interface StudioStep {
  title: string
  description: string
  fileStructure: string[]
  starterCode?: string
  guidance: string
}

export interface StudioProject {
  title: string
  description: string
  language: 'typescript' | 'python'
  steps: StudioStep[]
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export type ReviewStatus = 'pass' | 'requests_changes' | 'pending' | 'idle'
