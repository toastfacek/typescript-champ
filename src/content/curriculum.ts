import type { Curriculum } from '@/types'
import { lessons as allLessons, modules } from './modules'

// Re-export lessons from modular structure
export const lessons = allLessons

// Export curriculum structure
export const curriculum: Curriculum = {
  title: 'TypeScript Fundamentals',
  description: 'Master TypeScript from the ground up',
  modules,
}
