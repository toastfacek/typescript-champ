import { useState, Suspense, lazy } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import type { RecapCache } from '@/types/recap'
import { useRecapStore } from '@/store/recap-store'
import { curriculum } from '@/content/curriculum'
import { lessons } from '@/content/curriculum'

// Lazy load step components to avoid bundling CodeMirror on homepage
const CodeExerciseStep = lazy(() => import('@/components/lesson/CodeExerciseStep').then(m => ({ default: m.CodeExerciseStep })))
const FillInBlankStep = lazy(() => import('@/components/lesson/FillInBlankStep').then(m => ({ default: m.FillInBlankStep })))
const QuizStep = lazy(() => import('@/components/lesson/QuizStep').then(m => ({ default: m.QuizStep })))

interface WelcomeRecapCardProps {
  cache: RecapCache
}

export function WelcomeRecapCard({ cache }: WelcomeRecapCardProps) {
  const [isCompleted, setIsCompleted] = useState(false)
  const [showNextLesson, setShowNextLesson] = useState(false)
  const completeRecap = useRecapStore((state) => state.completeRecap)

  const exercise = cache.exercise
  const step = exercise.step

  const handleComplete = async () => {
    setIsCompleted(true)
    await completeRecap()
    // Find next lesson
    const nextLessonId = findNextLesson(cache.lessonId)
    if (nextLessonId) {
      setShowNextLesson(true)
    }
  }

  const handleHintUsed = () => {
    // Track hint usage if needed
  }

  // Find next lesson in curriculum
  function findNextLesson(currentLessonId: string): string | null {
    for (const module of curriculum.modules) {
      const index = module.lessons.indexOf(currentLessonId)
      if (index >= 0 && index < module.lessons.length - 1) {
        return module.lessons[index + 1]
      }
      // Check next module
      const moduleIndex = curriculum.modules.indexOf(module)
      if (moduleIndex < curriculum.modules.length - 1) {
        const nextModule = curriculum.modules[moduleIndex + 1]
        if (nextModule.lessons.length > 0) {
          return nextModule.lessons[0]
        }
      }
    }
    return null
  }

  const nextLessonId = findNextLesson(cache.lessonId)
  const nextLesson = nextLessonId ? lessons[nextLessonId] : null
  const lesson = lessons[cache.lessonId]

  return (
    <Card padding="lg" className="mb-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-500/10 border border-accent-500/20 rounded-lg">
              <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-accent-400">Quick Recap</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-surface-100 mb-2">
            Review: {cache.lessonTitle}
          </h2>
          <div className="prose prose-sm max-w-none text-surface-400">
            <p className="whitespace-pre-wrap">{cache.recapContent}</p>
          </div>
        </div>

        {/* Exercise */}
        {!isCompleted ? (
          <div className="border-t border-surface-700 pt-6">
            <ErrorBoundary>
              <Suspense fallback={
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-8 h-8 border-4 border-surface-700 rounded-full" />
                      <div className="absolute top-0 left-0 w-8 h-8 border-4 border-accent-500 rounded-full border-t-transparent animate-spin" />
                    </div>
                    <p className="mt-2 text-sm text-surface-500">Loading exercise...</p>
                  </div>
                </div>
              }>
                {step.type === 'code-exercise' && (
                  <CodeExerciseStep
                    step={step}
                    lesson={lesson}
                    isComplete={false}
                    onComplete={handleComplete}
                    onHintUsed={handleHintUsed}
                  />
                )}
                {step.type === 'fill-in-blank' && (
                  <FillInBlankStep
                    step={step}
                    isComplete={false}
                    onComplete={handleComplete}
                    onHintUsed={handleHintUsed}
                  />
                )}
                {step.type === 'quiz' && (
                  <QuizStep
                    step={step}
                    isComplete={false}
                    onComplete={handleComplete}
                  />
                )}
              </Suspense>
            </ErrorBoundary>
          </div>
        ) : (
          <div className="border-t border-surface-700 pt-6">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-500/20 border border-success-500/30 mb-4">
                <svg className="w-8 h-8 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-surface-100 mb-2">Great job!</h3>
              <p className="text-surface-400 mb-6">
                You've earned 7 XP for completing this recap.
              </p>
              {showNextLesson && nextLesson && (
                <Link to={`/lesson/${nextLessonId}`}>
                  <Button size="lg" glow>
                    Continue to Next Lesson: {nextLesson.title}
                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

