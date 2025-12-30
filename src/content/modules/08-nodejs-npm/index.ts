import type { Module, Lesson } from '@/types'
import { lesson as lesson28 } from './28-nodejs-basics'
import { lesson as lesson29 } from './29-npm-packages'
import { lesson as lesson30 } from './30-es-modules'
import { lesson as lesson31 } from './31-environment-variables'

export const module: Module = {
  id: 'nodejs-npm',
  title: 'Node.js & npm',
  description: 'Learn Node.js basics, npm packages, and ES modules.',
  lessons: ['28-nodejs-basics', '29-npm-packages', '30-es-modules', '31-environment-variables'],
}

export const lessons: Record<string, Lesson> = {
  '28-nodejs-basics': lesson28,
  '29-npm-packages': lesson29,
  '30-es-modules': lesson30,
  '31-environment-variables': lesson31,
}





