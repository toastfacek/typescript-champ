import type { Module, Lesson } from '@/types'
import { lesson as lesson24 } from './24-callbacks-types'
import { lesson as lesson25 } from './25-promises'
import { lesson as lesson26 } from './26-async-await'
import { lesson as lesson27 } from './27-error-handling'

export const module: Module = {
  id: 'async-typescript',
  title: 'Async TypeScript',
  description: 'Handle asynchronous operations with Promises and async/await.',
  lessons: ['24-callbacks-types', '25-promises', '26-async-await', '27-error-handling'],
}

export const lessons: Record<string, Lesson> = {
  '24-callbacks-types': lesson24,
  '25-promises': lesson25,
  '26-async-await': lesson26,
  '27-error-handling': lesson27,
}



