import type { Module, Lesson } from '@/types'
import { lesson as lesson53 } from './py-53-react-loop'
import { lesson as lesson54 } from './py-54-memory-management'
import { lesson as lesson55 } from './py-55-agent-prompts'
import { lesson as lesson56 } from './py-56-debugging-agents'

export const module: Module = {
  id: 'python-15-agent-loops',
  title: 'Agent Loops',
  description: 'Build autonomous systems that can reason, act, and remember context over multiple turns.',
  lessons: ['py-53-react-loop', 'py-54-memory-management', 'py-55-agent-prompts', 'py-56-debugging-agents'],
}

export const lessons: Record<string, Lesson> = {
  'py-53-react-loop': lesson53,
  'py-54-memory-management': lesson54,
  'py-55-agent-prompts': lesson55,
  'py-56-debugging-agents': lesson56,
}
