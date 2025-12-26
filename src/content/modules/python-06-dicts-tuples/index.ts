import type { Module, Lesson } from '@/types'
import { lesson as lesson20 } from './py-20-tuples'
import { lesson as lesson21 } from './py-21-dict-basics'
import { lesson as lesson22 } from './py-22-dict-methods'
import { lesson as lesson23 } from './py-23-sets'

export const module: Module = {
  id: 'python-06-dicts-tuples',
  title: 'Dictionaries, Tuples & Sets',
  description: 'Master Python data structures: tuples, dictionaries, and sets.',
  lessons: ['py-20-tuples', 'py-21-dict-basics', 'py-22-dict-methods', 'py-23-sets'],
}

export const lessons: Record<string, Lesson> = {
  'py-20-tuples': lesson20,
  'py-21-dict-basics': lesson21,
  'py-22-dict-methods': lesson22,
  'py-23-sets': lesson23,
}
