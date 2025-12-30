import type { Module, Lesson } from '@/types'
import { lesson as lesson20 } from './20-generic-functions'
import { lesson as lesson21 } from './21-generic-interfaces'
import { lesson as lesson22 } from './22-constraints'
import { lesson as lesson23 } from './23-utility-types'

export const module: Module = {
  id: 'generics',
  title: 'Generics',
  description: 'Write flexible, reusable code with type parameters.',
  lessons: ['20-generic-functions', '21-generic-interfaces', '22-constraints', '23-utility-types'],
}

export const lessons: Record<string, Lesson> = {
  '20-generic-functions': lesson20,
  '21-generic-interfaces': lesson21,
  '22-constraints': lesson22,
  '23-utility-types': lesson23,
}





