import type { Module, Lesson } from '@/types'
import { lesson as lesson01 } from './01-export-import'

import { lesson as lesson02 } from './02-default-exports'
import { lesson as lesson03 } from './03-re-exports'
import { lesson as lesson04 } from './04-type-only-imports'

export const module: Module = {
  id: 'modules-imports',
  title: 'Modules & Imports',
  description: 'Learn how to organize your code into modules and share code between files.',
  lessons: ['01-export-import', '02-default-exports', '03-re-exports', '04-type-only-imports'],
}

export const lessons: Record<string, Lesson> = {
  '01-export-import': lesson01,
  '02-default-exports': lesson02,
  '03-re-exports': lesson03,
  '04-type-only-imports': lesson04,
}
