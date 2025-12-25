import type { Module, Lesson } from '@/types'
import { lesson as lesson01 } from './py-01-hello-python'
import { lesson as lesson02 } from './py-02-variables-types'
import { lesson as lesson03 } from './py-03-input-output'
import { lesson as lesson04 } from './py-04-operators'

export const module: Module = {
  id: 'python-01-basics',
  title: 'Python Basics',
  description: 'Learn the fundamentals of Python: variables, types, input/output, and operators.',
  lessons: ['py-01-hello-python', 'py-02-variables-types', 'py-03-input-output', 'py-04-operators'],
}

export const lessons: Record<string, Lesson> = {
  'py-01-hello-python': lesson01,
  'py-02-variables-types': lesson02,
  'py-03-input-output': lesson03,
  'py-04-operators': lesson04,
}

