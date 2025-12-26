import type { Module, Lesson } from '@/types'
import { lesson as lesson45 } from './py-45-sdk-setup'
import { lesson as lesson46 } from './py-46-chat-completions'
import { lesson as lesson47 } from './py-47-streaming'
import { lesson as lesson48 } from './py-48-switching-models'

export const module: Module = {
  id: 'python-13-ai-calls',
  title: 'Your First AI Call',
  description: 'Connect to models like GPT-4 and Claude 3.5 using official Python SDKs.',
  lessons: ['py-45-sdk-setup', 'py-46-chat-completions', 'py-47-streaming', 'py-48-switching-models'],
}

export const lessons: Record<string, Lesson> = {
  'py-45-sdk-setup': lesson45,
  'py-46-chat-completions': lesson46,
  'py-47-streaming': lesson47,
  'py-48-switching-models': lesson48,
}
