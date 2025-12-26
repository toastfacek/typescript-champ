import type { Module, Lesson } from '@/types'
import { lesson as lesson16 } from './py-16-list-basics'
import { lesson as lesson17 } from './py-17-list-methods'
import { lesson as lesson18 } from './py-18-list-operations'
import { lesson as lesson19 } from './py-19-nested-lists'

export const module: Module = {
  id: 'python-05-lists',
  title: 'Lists',
  description: 'Master Python lists: creation, methods, operations, and nested structures.',
  lessons: ['py-16-list-basics', 'py-17-list-methods', 'py-18-list-operations', 'py-19-nested-lists'],
}

export const lessons: Record<string, Lesson> = {
  'py-16-list-basics': lesson16,
  'py-17-list-methods': lesson17,
  'py-18-list-operations': lesson18,
  'py-19-nested-lists': lesson19,
}
