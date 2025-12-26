import type { Module, Lesson } from '@/types'
import { lesson as lesson01 } from './01-testing-concepts'

import { lesson as lesson02 } from './02-jest-vitest-intro'
import { lesson as lesson03 } from './03-mocking-basics'

export const module: Module = {
  id: 'testing-basics',
  title: 'Testing Basics',
  description: 'Learn the fundamentals of testing TypeScript applications using modern tools.',
  lessons: ['01-testing-concepts', '02-jest-vitest-intro', '03-mocking-basics'],
}

export const lessons: Record<string, Lesson> = {
  '01-testing-concepts': lesson01,
  '02-jest-vitest-intro': lesson02,
  '03-mocking-basics': lesson03,
}
