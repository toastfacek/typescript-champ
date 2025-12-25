import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { useStore } from '@/store'
import type { AppState } from '@/store'
import type { Lesson } from '@/types'
import { lessons } from '@/content/curriculum'

function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  return `${Math.floor(diffDays / 365)} years ago`
}

export function LessonPracticeSelector() {
  const navigate = useNavigate()
  const progress = useStore((state: AppState) => state.progress)
  const lessonProgress = useStore((state: AppState) => state.lessonProgress)

  // Get all completed lessons - memoized to prevent infinite loops
  const completedLessons = useMemo(() => {
    if (!progress?.lessonsCompleted) return []
    
    return progress.lessonsCompleted
      .map((lessonId: string) => {
        const lesson = lessons[lessonId]
        const lp = lessonProgress[lessonId]
        if (!lesson || !lp || lp.status !== 'completed') return null

        return {
          lesson,
          completedAt: lp.completedAt ? new Date(lp.completedAt) : null,
        }
      })
      .filter((item: { lesson: Lesson; completedAt: Date | null } | null): item is { lesson: Lesson; completedAt: Date | null } => item !== null)
      .sort((a: { lesson: Lesson; completedAt: Date | null }, b: { lesson: Lesson; completedAt: Date | null }) => {
        // Sort by completion date, most recent first
        if (!a.completedAt || !b.completedAt) return 0
        return b.completedAt.getTime() - a.completedAt.getTime()
      })
  }, [progress?.lessonsCompleted, lessonProgress])

  const handlePractice = (lessonId: string) => {
    navigate(`/practice/focused/${lessonId}`)
  }

  if (!completedLessons || completedLessons.length === 0) {
    return (
      <Card padding="lg" className="text-center py-12">
        <div className="text-4xl mb-4">📚</div>
        <h3 className="text-lg font-heading font-semibold text-surface-100 mb-2">
          No completed lessons yet
        </h3>
        <p className="text-surface-400 mb-4">
          Complete some lessons to practice them here
        </p>
        <Button variant="outline" onClick={() => navigate('/curriculum')}>
          Go to Curriculum
        </Button>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      {completedLessons.map(({ lesson, completedAt }: { lesson: Lesson; completedAt: Date | null }) => (
        <Card
          key={lesson.id}
          className="p-4 border border-surface-700/50 hover:border-accent-500/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-surface-100 mb-1">
                {lesson.title}
              </h3>
              <p className="text-sm text-surface-400 mb-2">
                {lesson.description}
              </p>
              {completedAt && (
                <p className="text-xs text-surface-500">
                  Completed {formatTimeAgo(completedAt)}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => handlePractice(lesson.id)}
              className="ml-4"
            >
              Practice
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

