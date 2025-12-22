import type { Module, Lesson } from '@/types'
import { lesson as lesson01 } from './01-hello-typescript'
import { lesson as lesson02 } from './02-basic-types'
import { lesson as lesson03 } from './03-type-inference'

export const module: Module = {
  id: 'getting-started',
  title: 'Getting Started',
  description: 'Learn the fundamentals of TypeScript: types, variables, and type inference.',
  lessons: ['01-hello-typescript', '02-basic-types', '03-type-inference'],
}

export const lessons: Record<string, Lesson> = {
  '01-hello-typescript': lesson01,
  '02-basic-types': lesson02,
  '03-type-inference': lesson03,
}
