import type { Module, Lesson } from '@/types'
import { lesson as lesson13 } from './py-13-string-methods'
import { lesson as lesson14 } from './py-14-string-slicing'
import { lesson as lesson15 } from './py-15-string-formatting'

export const module: Module = {
  id: 'python-04-strings',
  title: 'Strings',
  description: 'Master string manipulation: methods, slicing, and advanced formatting.',
  lessons: ['py-13-string-methods', 'py-14-string-slicing', 'py-15-string-formatting'],
}

export const lessons: Record<string, Lesson> = {
  'py-13-string-methods': lesson13,
  'py-14-string-slicing': lesson14,
  'py-15-string-formatting': lesson15,
}
