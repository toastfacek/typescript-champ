import type { Module, Lesson } from '@/types'
import { lesson as lesson37 } from './py-37-requests'
import { lesson as lesson38 } from './py-38-pydantic'
import { lesson as lesson39 } from './py-39-asyncio'
import { lesson as lesson40 } from './py-40-dotenv'

export const module: Module = {
  id: 'python-11-http-apis',
  title: 'HTTP & APIs',
  description: 'Learn to communicate with servers, validate data, and manage secrets.',
  lessons: ['py-37-requests', 'py-38-pydantic', 'py-39-asyncio', 'py-40-dotenv'],
}

export const lessons: Record<string, Lesson> = {
  'py-37-requests': lesson37,
  'py-38-pydantic': lesson38,
  'py-39-asyncio': lesson39,
  'py-40-dotenv': lesson40,
}
