import { useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { LessonStep } from '@/types'
import { usePracticeStore } from '@/store/practice-store'
import { Button, Card, ProgressBar } from '@/components/ui'
import { InstructionStep } from '@/components/lesson/InstructionStep'
import { CodeExerciseStep } from '@/components/lesson/CodeExerciseStep'
import { FillInBlankStep } from '@/components/lesson/FillInBlankStep'
import { QuizStep } from '@/components/lesson/QuizStep'
import { lessons } from '@/content/curriculum'
import type { CodeExerciseStep as CodeExerciseStepType, FillInBlankStep as FillInBlankStepType, QuizStep as QuizStepType } from '@/types'

export function FocusedPracticePage() {
  const navigate = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()

  const currentFocusedSession = usePracticeStore((s) => s.currentFocusedSession)
  const focusedMiniLesson = usePracticeStore((s) => s.focusedMiniLesson)
  const focusedCurrentStepIndex = usePracticeStore((s) => s.focusedCurrentStepIndex)
  const focusedCompletedSteps = usePracticeStore((s) => s.focusedCompletedSteps)
  const isGeneratingFocused = usePracticeStore((s) => s.isGeneratingFocused)
  const focusedGenerationError = usePracticeStore((s) => s.focusedGenerationError)
  const startFocusedSession = usePracticeStore((s) => s.startFocusedSession)
  const endFocusedSession = usePracticeStore((s) => s.endFocusedSession)
  const completeFocusedStep = usePracticeStore((s) => s.completeFocusedStep)

  // Start session if lessonId is provided and no session exists
  useEffect(() => {
    if (lessonId && !currentFocusedSession && !focusedMiniLesson && !isGeneratingFocused) {
      const lesson = lessons[lessonId]
      if (!lesson) {
        navigate('/practice')
        return
      }
      startFocusedSession(lesson)
    }
  }, [lessonId, currentFocusedSession, focusedMiniLesson, isGeneratingFocused, startFocusedSession, navigate])

  // Redirect if no lessonId
  useEffect(() => {
    if (!lessonId) {
      navigate('/practice')
    }
  }, [lessonId, navigate])

  const handleStepComplete = useCallback((stepId: string) => {
    completeFocusedStep(stepId)
  }, [completeFocusedStep])

  const setFocusedCurrentStepIndex = usePracticeStore((s) => s.setFocusedCurrentStepIndex)

  const handleNext = useCallback(() => {
    if (!focusedMiniLesson) return

    const totalSteps = focusedMiniLesson.steps.length
    if (focusedCurrentStepIndex < totalSteps - 1) {
      setFocusedCurrentStepIndex(focusedCurrentStepIndex + 1)
    } else {
      // All steps complete
      endFocusedSession()
      navigate('/curriculum')
    }
  }, [focusedMiniLesson, focusedCurrentStepIndex, setFocusedCurrentStepIndex, endFocusedSession, navigate])

  const handlePrevious = useCallback(() => {
    if (focusedCurrentStepIndex > 0) {
      setFocusedCurrentStepIndex(focusedCurrentStepIndex - 1)
    }
  }, [focusedCurrentStepIndex, setFocusedCurrentStepIndex])

  const handleHintUsed = useCallback(() => {
    // Track hints if needed in the future
  }, [])

  const handleExit = useCallback(() => {
    endFocusedSession()
    navigate('/curriculum')
  }, [endFocusedSession, navigate])

  // Loading state
  if (isGeneratingFocused) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="mt-6" padding="lg">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mb-4" />
              <p className="text-lg font-medium text-surface-200">Generating focused practice...</p>
              <p className="text-sm text-surface-400 mt-2">
                Creating a personalized mini-lesson for you
              </p>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // Error state
  if (focusedGenerationError) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="mt-6" padding="lg">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-4xl mb-4">😕</div>
              <p className="text-lg font-medium text-surface-200 mb-2">Failed to generate practice</p>
              <p className="text-sm text-danger-400 mb-4">{focusedGenerationError}</p>
              <div className="flex gap-3">
                <Button onClick={() => {
                  if (lessonId) {
                    const lesson = lessons[lessonId]
                    if (lesson) {
                      startFocusedSession(lesson)
                    }
                  }
                }}>Try Again</Button>
                <Button variant="outline" onClick={handleExit}>Exit</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  // No session or lesson
  if (!currentFocusedSession || !focusedMiniLesson) {
    return null
  }

  const currentStep = focusedMiniLesson.steps[focusedCurrentStepIndex]
  const totalSteps = focusedMiniLesson.steps.length
  const progress = focusedCompletedSteps.length / totalSteps
  const isStepComplete = currentStep ? focusedCompletedSteps.includes(currentStep.id) : false
  const canProceed = currentStep?.type === 'instruction' || isStepComplete

  const renderStep = (step: LessonStep) => {
    const stepIsComplete = focusedCompletedSteps.includes(step.id)

    switch (step.type) {
      case 'instruction':
        return (
          <InstructionStep
            step={step}
            onComplete={() => handleStepComplete(step.id)}
          />
        )
      case 'code-exercise':
        return (
          <CodeExerciseStep
            step={step as CodeExerciseStepType}
            isComplete={stepIsComplete}
            onComplete={() => handleStepComplete(step.id)}
            onHintUsed={handleHintUsed}
          />
        )
      case 'fill-in-blank':
        return (
          <FillInBlankStep
            step={step as FillInBlankStepType}
            isComplete={stepIsComplete}
            onComplete={() => handleStepComplete(step.id)}
            onHintUsed={handleHintUsed}
          />
        )
      case 'quiz':
        return (
          <QuizStep
            step={step as QuizStepType}
            isComplete={stepIsComplete}
            onComplete={() => handleStepComplete(step.id)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-700/50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="sm" onClick={handleExit}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Exit
            </Button>
            <span className="text-sm font-medium text-surface-200">
              Focused Practice: {focusedMiniLesson?.lessonTitle || currentFocusedSession?.conceptName || 'Loading...'}
            </span>
            <span className="text-sm text-surface-500 font-mono">
              {focusedCurrentStepIndex + 1} / {totalSteps}
            </span>
          </div>
          <ProgressBar progress={progress} size="sm" color="accent" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card variant="glass" className="mb-6">
          {currentStep && renderStep(currentStep)}
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={focusedCurrentStepIndex === 0}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>

          <Button
            variant={canProceed ? 'primary' : 'outline'}
            onClick={handleNext}
            disabled={!canProceed}
            glow={canProceed}
          >
            {focusedCurrentStepIndex === totalSteps - 1 ? 'Complete' : 'Next'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}

