import type { Module, Lesson } from '@/types'
import { lesson as lesson01 } from './01-sdk-setup'
import { lesson as lesson02 } from './02-claude-call'

import { lesson as lesson03 } from './03-streaming-claude'
import { lesson as lesson04 } from './04-openai-call'

export const module: Module = {
  id: 'first-ai-call',
  title: 'Your First AI Call',
  description: 'Connect to professional LLMs like Claude and GPT and start building AI-powered features.',
  lessons: ['01-sdk-setup', '02-claude-call', '03-streaming-claude', '04-openai-call'],
}

export const lessons: Record<string, Lesson> = {
  '01-sdk-setup': lesson01,
  '02-claude-call': lesson02,
  '03-streaming-claude': lesson03,
  '04-openai-call': lesson04,
}
