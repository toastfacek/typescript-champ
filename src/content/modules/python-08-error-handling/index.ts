import type { Module, Lesson } from '@/types'
import { lesson as lesson27 } from './py-27-try-except'
import { lesson as lesson28 } from './py-28-raising-errors'
import { lesson as lesson29 } from './py-29-debugging'

export const module: Module = {
  id: 'python-08-error-handling',
  title: 'Error Handling',
  description: 'Handle errors gracefully with try/except, custom exceptions, and debugging.',
  lessons: ['py-27-try-except', 'py-28-raising-errors', 'py-29-debugging'],
}

export const lessons: Record<string, Lesson> = {
  'py-27-try-except': lesson27,
  'py-28-raising-errors': lesson28,
  'py-29-debugging': lesson29,
}
