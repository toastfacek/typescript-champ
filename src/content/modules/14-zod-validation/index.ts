import type { Module, Lesson } from '@/types'
import { lesson as lesson01 } from './01-zod-basics'

import { lesson as lesson02 } from './02-object-schemas'
import { lesson as lesson03 } from './03-refining-schemas'
import { lesson as lesson04 } from './04-typescript-integration'

export const module: Module = {
  id: 'zod-validation',
  title: 'Data Validation with Zod',
  description: 'Learn how to validate runtime data and keep your TypeScript types in sync with your schemas.',
  lessons: ['01-zod-basics', '02-object-schemas', '03-refining-schemas', '04-typescript-integration'],
}

export const lessons: Record<string, Lesson> = {
  '01-zod-basics': lesson01,
  '02-object-schemas': lesson02,
  '03-refining-schemas': lesson03,
  '04-typescript-integration': lesson04,
}
