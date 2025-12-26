import type { Module, Lesson } from '@/types'
import { lesson as lesson49 } from './py-49-structured-outputs'
import { lesson as lesson50 } from './py-50-defining-tools'
import { lesson as lesson51 } from './py-51-tool-calling'
import { lesson as lesson52 } from './py-52-executing-tools'

export const module: Module = {
  id: 'python-14-structured-tools',
  title: 'Structured Outputs & Tools',
  description: 'Master Pydantic schemas and give your AI the ability to call Python functions.',
  lessons: ['py-49-structured-outputs', 'py-50-defining-tools', 'py-51-tool-calling', 'py-52-executing-tools'],
}

export const lessons: Record<string, Lesson> = {
  'py-49-structured-outputs': lesson49,
  'py-50-defining-tools': lesson50,
  'py-51-tool-calling': lesson51,
  'py-52-executing-tools': lesson52,
}
