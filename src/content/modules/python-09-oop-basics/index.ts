import type { Module, Lesson } from '@/types'
import { lesson as lesson30 } from './py-30-classes'
import { lesson as lesson31 } from './py-31-methods'
import { lesson as lesson32 } from './py-32-inheritance'
import { lesson as lesson33 } from './py-33-special-methods'

export const module: Module = {
  id: 'python-09-oop-basics',
  title: 'Object-Oriented Programming',
  description: 'Master OOP: classes, methods, inheritance, and special methods.',
  lessons: ['py-30-classes', 'py-31-methods', 'py-32-inheritance', 'py-33-special-methods'],
}

export const lessons: Record<string, Lesson> = {
  'py-30-classes': lesson30,
  'py-31-methods': lesson31,
  'py-32-inheritance': lesson32,
  'py-33-special-methods': lesson33,
}
