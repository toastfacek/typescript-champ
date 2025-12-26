import type { Module, Lesson } from '@/types'
import { lesson as lesson01 } from './01-fetch-basics'

import { lesson as lesson02 } from './02-handling-responses'
import { lesson as lesson03 } from './03-api-errors'
import { lesson as lesson04 } from './04-api-clients'

export const module: Module = {
  id: 'http-apis',
  title: 'HTTP & APIs',
  description: 'Master the art of communicating with external services and building typed API clients.',
  lessons: ['01-fetch-basics', '02-handling-responses', '03-api-errors', '04-api-clients'],
}

export const lessons: Record<string, Lesson> = {
  '01-fetch-basics': lesson01,
  '02-handling-responses': lesson02,
  '03-api-errors': lesson03,
  '04-api-clients': lesson04,
}
