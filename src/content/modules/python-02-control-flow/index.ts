import type { Module, Lesson } from '@/types'
import { lesson as lesson05 } from './py-05-conditionals'
import { lesson as lesson06 } from './py-06-while-loops'
import { lesson as lesson07 } from './py-07-for-loops'
import { lesson as lesson08 } from './py-08-comprehensions'

export const module: Module = {
  id: 'python-02-control-flow',
  title: 'Control Flow',
  description: 'Master conditionals and loops: if/elif/else, while loops, for loops, and list comprehensions.',
  lessons: ['py-05-conditionals', 'py-06-while-loops', 'py-07-for-loops', 'py-08-comprehensions'],
}

export const lessons: Record<string, Lesson> = {
  'py-05-conditionals': lesson05,
  'py-06-while-loops': lesson06,
  'py-07-for-loops': lesson07,
  'py-08-comprehensions': lesson08,
}
