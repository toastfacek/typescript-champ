import type { Module, Lesson } from '@/types'
import { lesson as lesson57 } from './py-57-research-agent'
import { lesson as lesson58 } from './py-58-code-agent'
import { lesson as lesson59 } from './py-59-cli-agent'
import { lesson as lesson60 } from './py-60-final-project'

export const module: Module = {
  id: 'python-16-capstone',
  title: 'Capstone Projects',
  description: 'Synthesize your skills by building specialized agents for research, coding, and more.',
  lessons: ['py-57-research-agent', 'py-58-code-agent', 'py-59-cli-agent', 'py-60-final-project'],
}

export const lessons: Record<string, Lesson> = {
  'py-57-research-agent': lesson57,
  'py-58-code-agent': lesson58,
  'py-59-cli-agent': lesson59,
  'py-60-final-project': lesson60,
}
