import type { Module, Lesson } from '@/types'
import * as module01 from './01-getting-started'
import * as module02 from './02-functions'
import * as module03 from './03-objects-interfaces'
import * as module04 from './04-arrays-collections'
import * as module05 from './05-advanced-types'
import * as module06 from './06-generics'
import * as module07 from './07-async-typescript'
import * as module08 from './08-nodejs-npm'
import * as pythonModule01 from './python-01-basics'
import * as pythonModule02 from './python-02-control-flow'
import * as pythonModule03 from './python-03-functions'
import * as pythonModule04 from './python-04-strings'
import * as pythonModule05 from './python-05-lists'

// Aggregate all modules
export const modules: Module[] = [
  module01.module,
  module02.module,
  module03.module,
  module04.module,
  module05.module,
  module06.module,
  module07.module,
  module08.module,
  pythonModule01.module,
  pythonModule02.module,
  pythonModule03.module,
  pythonModule04.module,
  pythonModule05.module,
]

// Aggregate all lessons into a single Record
export const lessons: Record<string, Lesson> = {
  ...module01.lessons,
  ...module02.lessons,
  ...module03.lessons,
  ...module04.lessons,
  ...module05.lessons,
  ...module06.lessons,
  ...module07.lessons,
  ...module08.lessons,
  ...pythonModule01.lessons,
  ...pythonModule02.lessons,
  ...pythonModule03.lessons,
  ...pythonModule04.lessons,
  ...pythonModule05.lessons,
}



