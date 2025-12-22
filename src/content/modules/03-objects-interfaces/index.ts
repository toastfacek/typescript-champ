import type { Module, Lesson } from '@/types'
import { lesson as lesson08 } from './08-object-types'
import { lesson as lesson09 } from './09-interfaces'
import { lesson as lesson10 } from './10-optional-readonly'
import { lesson as lesson11 } from './11-type-vs-interface'

export const module: Module = {
  id: 'objects-interfaces',
  title: 'Objects & Interfaces',
  description: 'Define complex object types and reusable interfaces.',
  lessons: ['08-object-types', '09-interfaces', '10-optional-readonly', '11-type-vs-interface'],
}

export const lessons: Record<string, Lesson> = {
  '08-object-types': lesson08,
  '09-interfaces': lesson09,
  '10-optional-readonly': lesson10,
  '11-type-vs-interface': lesson11,
}
