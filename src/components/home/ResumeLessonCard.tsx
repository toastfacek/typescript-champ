import { Link } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import type { LessonProgress } from '@/types'
import { curriculum } from '@/content/curriculum'
import { lessons } from '@/content/curriculum'

interface ResumeLessonCardProps {
  lessonId: string
  progress: LessonProgress
}

export function ResumeLessonCard({ lessonId, progress }: ResumeLessonCardProps) {
  const lesson = lessons.find(l => l.id === lessonId)
  if (!lesson) return null

  // Find which module this lesson belongs to
  const module = curriculum.modules.find(m => m.lessons.includes(lessonId))
  
  // Calculate progress
  const totalSteps = lesson.steps.length
  const currentStepIndex = progress.currentStepIndex || 0
  const progressPercent = totalSteps > 0 ? (currentStepIndex / totalSteps) * 100 : 0

  return (
    <Card padding="lg" className="mb-8 border-accent-500/30 bg-accent-500/5">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-xl bg-accent-500/20 border border-accent-500/30 flex items-center justify-center">
            <svg className="w-6 h-6 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-accent-400 uppercase tracking-wide">
              {module?.title || 'Lesson'}
            </span>
          </div>
          <h3 className="text-xl font-bold text-surface-100 mb-2">
            {lesson.title}
          </h3>
          <p className="text-sm text-surface-400 mb-4">
            Pick up where you left off
          </p>
          
          {/* Progress indicator */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-surface-500 mb-1">
              <span>Step {currentStepIndex + 1} of {totalSteps}</span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-2 bg-surface-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent-500 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <Link to={`/lesson/${lessonId}`}>
            <Button size="lg" glow className="w-full sm:w-auto">
              Continue Lesson
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}

