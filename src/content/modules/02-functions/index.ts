import type { Module, Lesson } from '@/types'
import { lesson as lesson04 } from './04-function-basics'
import { lesson as lesson05 } from './05-parameters-defaults'
import { lesson as lesson06 } from './06-arrow-functions'
import { lesson as lesson07 } from './07-function-types'

export const module: Module = {
  id: 'functions',
  title: 'Functions',
  description: 'Master function types, parameters, and arrow functions.',
  lessons: ['04-function-basics', '05-parameters-defaults', '06-arrow-functions', '07-function-types'],
}

export const lessons: Record<string, Lesson> = {
  '04-function-basics': lesson04,
  '05-parameters-defaults': lesson05,
  '06-arrow-functions': lesson06,
  '07-function-types': lesson07,
}
