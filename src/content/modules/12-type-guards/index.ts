import type { Module, Lesson } from '@/types'
import { lesson as lesson01 } from './01-typeof-instanceof'

import { lesson as lesson02 } from './02-equality-narrowing'
import { lesson as lesson03 } from './03-in-operator'
import { lesson as lesson04 } from './04-user-defined-guards'
import { lesson as lesson05 } from './05-assertion-functions'

export const module: Module = {
  id: 'type-guards',
  title: 'Type Guards & Narrowing',
  description: 'Learn how to safely work with union types and narrow them down using various techniques.',
  lessons: ['01-typeof-instanceof', '02-equality-narrowing', '03-in-operator', '04-user-defined-guards', '05-assertion-functions'],
}

export const lessons: Record<string, Lesson> = {
  '01-typeof-instanceof': lesson01,
  '02-equality-narrowing': lesson02,
  '03-in-operator': lesson03,
  '04-user-defined-guards': lesson04,
  '05-assertion-functions': lesson05,
}
