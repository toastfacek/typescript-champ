import type { Module, Lesson } from '@/types'
import { lesson as lesson41 } from './py-41-how-llms-work'
import { lesson as lesson42 } from './py-42-roles-messages'
import { lesson as lesson43 } from './py-43-prompting'
import { lesson as lesson44 } from './py-44-params'

export const module: Module = {
  id: 'python-12-llm-concepts',
  title: 'LLM Concepts',
  description: 'Understand the core mechanics, roles, and prompting strategies for Large Language Models.',
  lessons: ['py-41-how-llms-work', 'py-42-roles-messages', 'py-43-prompting', 'py-44-params'],
}

export const lessons: Record<string, Lesson> = {
  'py-41-how-llms-work': lesson41,
  'py-42-roles-messages': lesson42,
  'py-43-prompting': lesson43,
  'py-44-params': lesson44,
}
