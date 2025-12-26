import type { Module, Lesson } from '@/types'
import { lesson as lesson34 } from './py-34-imports'
import { lesson as lesson35 } from './py-35-packages'
import { lesson as lesson36 } from './py-36-virtual-envs'

export const module: Module = {
  id: 'python-10-modules',
  title: 'Modules & Packages',
  description: 'Organize code with imports, packages, and virtual environments.',
  lessons: ['py-34-imports', 'py-35-packages', 'py-36-virtual-envs'],
}

export const lessons: Record<string, Lesson> = {
  'py-34-imports': lesson34,
  'py-35-packages': lesson35,
  'py-36-virtual-envs': lesson36,
}
