import type { Module, Lesson } from '@/types'
import * as module01 from './01-getting-started'
import * as module02 from './02-functions'
import * as module03 from './03-objects-interfaces'
import * as module04 from './04-arrays-collections'

// Aggregate all modules
export const modules: Module[] = [
  module01.module,
  module02.module,
  module03.module,
  module04.module,
]

// Aggregate all lessons into a single Record
export const lessons: Record<string, Lesson> = {
  ...module01.lessons,
  ...module02.lessons,
  ...module03.lessons,
  ...module04.lessons,
}
