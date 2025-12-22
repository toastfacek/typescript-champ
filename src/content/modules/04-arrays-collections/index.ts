import type { Module, Lesson } from '@/types'
import { lesson as lesson12 } from './12-typed-arrays'
import { lesson as lesson13 } from './13-array-methods'
import { lesson as lesson14 } from './14-tuples'
import { lesson as lesson15 } from './15-records-maps'

export const module: Module = {
  id: 'arrays-collections',
  title: 'Arrays & Collections',
  description: 'Work with typed arrays, tuples, and key-value collections.',
  lessons: ['12-typed-arrays', '13-array-methods', '14-tuples', '15-records-maps'],
}

export const lessons: Record<string, Lesson> = {
  '12-typed-arrays': lesson12,
  '13-array-methods': lesson13,
  '14-tuples': lesson14,
  '15-records-maps': lesson15,
}
