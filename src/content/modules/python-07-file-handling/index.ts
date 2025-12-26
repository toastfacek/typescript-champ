import type { Module, Lesson } from '@/types'
import { lesson as lesson24 } from './py-24-reading-files'
import { lesson as lesson25 } from './py-25-writing-files'
import { lesson as lesson26 } from './py-26-file-paths'

export const module: Module = {
  id: 'python-07-file-handling',
  title: 'File Handling',
  description: 'Read, write, and manage files and paths in Python.',
  lessons: ['py-24-reading-files', 'py-25-writing-files', 'py-26-file-paths'],
}

export const lessons: Record<string, Lesson> = {
  'py-24-reading-files': lesson24,
  'py-25-writing-files': lesson25,
  'py-26-file-paths': lesson26,
}
