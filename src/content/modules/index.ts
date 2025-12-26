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
import * as pythonModule06 from './python-06-dicts-tuples'
import * as pythonModule07 from './python-07-file-handling'
import * as pythonModule08 from './python-08-error-handling'
import * as pythonModule09 from './python-09-oop-basics'
import * as pythonModule10 from './python-10-modules'
import * as module09 from './09-classes'
import * as module10 from './10-modules-imports'
import * as module11 from './11-error-handling'
import * as module12 from './12-type-guards'
import * as module13 from './13-testing-basics'
import * as module14 from './14-zod-validation'
import * as module15 from './15-http-apis'
import * as module16 from './16-llm-concepts'
import * as module17 from './17-first-ai-call'

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
  pythonModule06.module,
  pythonModule07.module,
  pythonModule08.module,
  pythonModule09.module,
  pythonModule10.module,
  module09.module,
  module10.module,
  module11.module,
  module12.module,
  module13.module,
  module14.module,
  module15.module,
  module16.module,
  module17.module,
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
  ...pythonModule06.lessons,
  ...pythonModule07.lessons,
  ...pythonModule08.lessons,
  ...pythonModule09.lessons,
  ...pythonModule10.lessons,
  ...module09.lessons,
  ...module10.lessons,
  ...module11.lessons,
  ...module12.lessons,
  ...module13.lessons,
  ...module14.lessons,
  ...module15.lessons,
  ...module16.lessons,
  ...module17.lessons,
}






