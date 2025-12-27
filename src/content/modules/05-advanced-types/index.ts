import type { Module, Lesson } from '@/types'
import { lesson as lesson16 } from './16-union-types'
import { lesson as lesson17 } from './17-literal-types'
import { lesson as lesson18 } from './18-type-guards'
import { lesson as lesson19 } from './19-discriminated-unions'

export const module: Module = {
  id: 'advanced-types',
  title: 'Advanced Types',
  description: 'Master union types, type guards, and discriminated unions.',
  lessons: ['16-union-types', '17-literal-types', '18-type-guards', '19-discriminated-unions'],
}

export const lessons: Record<string, Lesson> = {
  '16-union-types': lesson16,
  '17-literal-types': lesson17,
  '18-type-guards': lesson18,
  '19-discriminated-unions': lesson19,
}



