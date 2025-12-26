import type { Module, Lesson } from '@/types'
import { lesson as lesson01 } from './01-try-catch'

import { lesson as lesson02 } from './02-throwing-errors'
import { lesson as lesson03 } from './03-custom-error-classes'
import { lesson as lesson04 } from './04-optional-catch'

export const module: Module = {
  id: 'error-handling',
  title: 'Error Handling',
  description: 'Learn how to handle errors, throw custom exceptions, and build robust TypeScript applications.',
  lessons: ['01-try-catch', '02-throwing-errors', '03-custom-error-classes', '04-optional-catch'],
}

export const lessons: Record<string, Lesson> = {
  '01-try-catch': lesson01,
  '02-throwing-errors': lesson02,
  '03-custom-error-classes': lesson03,
  '04-optional-catch': lesson04,
}
