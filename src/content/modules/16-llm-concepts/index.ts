import type { Module, Lesson } from '@/types'
import { lesson as lesson01 } from './01-what-are-llms'

import { lesson as lesson02 } from './02-messages-roles'
import { lesson as lesson03 } from './03-prompt-engineering'
import { lesson as lesson04 } from './04-streaming-intro'

export const module: Module = {
  id: 'llm-concepts',
  title: 'LLM Concepts',
  description: 'Understand the core concepts needed to build effective AI-powered applications.',
  lessons: ['01-what-are-llms', '02-messages-roles', '03-prompt-engineering', '04-streaming-intro'],
}

export const lessons: Record<string, Lesson> = {
  '01-what-are-llms': lesson01,
  '02-messages-roles': lesson02,
  '03-prompt-engineering': lesson03,
  '04-streaming-intro': lesson04,
}
