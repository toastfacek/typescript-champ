import type {
  PracticeTopic,
  PracticeDifficulty,
  TopicInfo,
  GenerateExerciseResponse,
  ThemeContext
} from '@/types/practice'
import type { GoalAnalysisResponse, GoalExample } from '@/types/learning-path'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchJson<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new ApiError(
      data.error || 'Request failed',
      response.status,
      data.details
    )
  }

  return data as T
}

// Exercise API

export async function getTopics(): Promise<TopicInfo[]> {
  const response = await fetchJson<{ topics: TopicInfo[] }>('/api/exercise/topics')
  return response.topics
}

export async function generateExercise(params: {
  topic: PracticeTopic
  difficulty: PracticeDifficulty
  exerciseType: 'code-exercise' | 'fill-in-blank' | 'quiz'
  themeContext?: ThemeContext
}): Promise<GenerateExerciseResponse> {
  return fetchJson<GenerateExerciseResponse>('/api/exercise/generate', {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export interface BatchGenerateResponse {
  success: boolean
  exercises: GenerateExerciseResponse['exercise'][]
  metadata: {
    requested: number
    generated: number
    failed: number
    totalTimeMs: number
    errors?: string[]
  }
}

export async function generateExerciseBatch(params: {
  topic: PracticeTopic
  difficulty: PracticeDifficulty
  count?: number
  exerciseTypes?: ('code-exercise' | 'fill-in-blank' | 'quiz')[]
  themeContext?: ThemeContext
}): Promise<BatchGenerateResponse> {
  return fetchJson<BatchGenerateResponse>('/api/exercise/generate-batch', {
    method: 'POST',
    body: JSON.stringify({ count: 5, ...params })
  })
}

// Goal API

export async function analyzeGoal(goalDescription: string): Promise<GoalAnalysisResponse> {
  return fetchJson<GoalAnalysisResponse>('/api/goal/analyze', {
    method: 'POST',
    body: JSON.stringify({ goalDescription })
  })
}

export async function getGoalExamples(): Promise<GoalExample[]> {
  const response = await fetchJson<{ examples: GoalExample[] }>('/api/goal/examples')
  return response.examples
}

// Health check

export async function checkHealth(): Promise<boolean> {
  try {
    await fetchJson<{ status: string }>('/health')
    return true
  } catch {
    return false
  }
}

export { ApiError }
