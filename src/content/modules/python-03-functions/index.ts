import type { Module, Lesson } from '@/types'
import { lesson as lesson09 } from './py-09-function-basics'
import { lesson as lesson10 } from './py-10-function-args'
import { lesson as lesson11 } from './py-11-scope'
import { lesson as lesson12 } from './py-12-lambda'

export const module: Module = {
  id: 'python-03-functions',
  title: 'Functions',
  description: 'Create reusable code with functions, parameters, return values, and lambda expressions.',
  lessons: ['py-09-function-basics', 'py-10-function-args', 'py-11-scope', 'py-12-lambda'],
}

export const lessons: Record<string, Lesson> = {
  'py-09-function-basics': lesson09,
  'py-10-function-args': lesson10,
  'py-11-scope': lesson11,
  'py-12-lambda': lesson12,
}
