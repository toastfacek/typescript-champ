import type { Module, Lesson } from '@/types'
import { lesson as lesson01 } from './01-class-basics'

import { lesson as lesson02 } from './02-inheritance'
import { lesson as lesson03 } from './03-access-modifiers'
import { lesson as lesson04 } from './04-abstract-classes'
import { lesson as lesson05 } from './05-interfaces-classes'

export const module: Module = {
  id: 'classes',
  title: 'Classes & OOP',
  description: 'Learn Object-Oriented Programming in TypeScript, from basics to advanced patterns.',
  lessons: ['01-class-basics', '02-inheritance', '03-access-modifiers', '04-abstract-classes', '05-interfaces-classes'],
}

export const lessons: Record<string, Lesson> = {
  '01-class-basics': lesson01,
  '02-inheritance': lesson02,
  '03-access-modifiers': lesson03,
  '04-abstract-classes': lesson04,
  '05-interfaces-classes': lesson05,
}
