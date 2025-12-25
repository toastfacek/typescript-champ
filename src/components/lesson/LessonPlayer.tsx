import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Lesson, LessonStep } from '@/types'
import { useStore } from '@/store'
import { Button, Card, ProgressBar } from '@/components/ui'
import { InstructionStep } from './InstructionStep'
import { CodeExerciseStep } from './CodeExerciseStep'
import { FillInBlankStep } from './FillInBlankStep'
import { QuizStep } from './QuizStep'
import { LessonComplete } from './LessonComplete'
import { KeyConceptsPanel } from './KeyConceptsPanel'

interface LessonPlayerProps {
  lesson: Lesson
}

export function LessonPlayer({ lesson }: LessonPlayerProps) {
  const navigate = useNavigate()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [isComplete, setIsComplete] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)

  const completeLesson = useStore((state) => state.completeLesson)
  const lessonProgress = useStore((state) => state.lessonProgress)
  const setLessonProgress = useStore((state) => state.setLessonProgress)

  const currentStep = lesson.steps[currentStepIndex]
  const totalSteps = lesson.steps.length
  const progress = completedSteps.size / totalSteps

  // Load saved progress - only on initial mount
  useEffect(() => {
    const saved = lessonProgress[lesson.id]
    if (saved && saved.status === 'in-progress') {
      setCurrentStepIndex(saved.currentStepIndex)
      setCompletedSteps(new Set(saved.stepsCompleted))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]) // Only run when lesson changes, not when lessonProgress updates

  // Save progress - debounced to avoid loops
  useEffect(() => {
    if (isComplete) return

    const timeoutId = setTimeout(() => {
      setLessonProgress(lesson.id, {
        lessonId: lesson.id,
        userId: 'demo-user',
        status: 'in-progress',
        currentStepIndex,
        stepsCompleted: Array.from(completedSteps),
        xpEarned: 0,
        attempts: 0,
      })
    }, 500) // Debounce saves

    return () => clearTimeout(timeoutId)
  }, [currentStepIndex, completedSteps, lesson.id, isComplete, setLessonProgress])

  const handleStepComplete = useCallback((stepId: string) => {
    setCompletedSteps((prev) => new Set([...prev, stepId]))
  }, [])

  const handleNext = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1)
    } else {
      // Lesson complete!
      setIsComplete(true)
      const bonusMultiplier = hintsUsed === 0 ? 1.5 : 1
      const xpEarned = Math.round(lesson.xpReward * bonusMultiplier)
      completeLesson(lesson.id, xpEarned)
    }
  }, [currentStepIndex, totalSteps, lesson.id, lesson.xpReward, hintsUsed, completeLesson])

  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }, [currentStepIndex])

  const handleHintUsed = useCallback(() => {
    setHintsUsed((prev) => prev + 1)
  }, [])

  const handleContinue = useCallback(() => {
    navigate('/curriculum')
  }, [navigate])

  if (isComplete) {
    return (
      <LessonComplete
        lesson={lesson}
        hintsUsed={hintsUsed}
        onContinue={handleContinue}
      />
    )
  }

  const renderStep = (step: LessonStep) => {
    const isStepComplete = completedSteps.has(step.id)

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
            step={step}
            lesson={lesson}
            isComplete={isStepComplete}
            onComplete={() => handleStepComplete(step.id)}
            onHintUsed={handleHintUsed}
          />
        )
      case 'fill-in-blank':
        return (
          <FillInBlankStep
            step={step}
            isComplete={isStepComplete}
            onComplete={() => handleStepComplete(step.id)}
            onHintUsed={handleHintUsed}
          />
        )
      case 'quiz':
        return (
          <QuizStep
            step={step}
            isComplete={isStepComplete}
            onComplete={() => handleStepComplete(step.id)}
          />
        )
      default:
        return null
    }
  }

  const canProceed =
    currentStep.type === 'instruction' || completedSteps.has(currentStep.id)

  return (
    <div className="min-h-screen">
      {/* Key Concepts Panel */}
      {lesson.keyConcepts && lesson.keyConcepts.length > 0 && (
        <KeyConceptsPanel concepts={lesson.keyConcepts} />
      )}

      {/* Header */}
      <div className="sticky top-0 z-40 glass-strong border-b border-surface-700/50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/curriculum')}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Exit
            </Button>
            <span className="text-sm font-medium text-surface-200">
              {lesson.title}
            </span>
            <span className="text-sm text-surface-500 font-mono">
              {currentStepIndex + 1} / {totalSteps}
            </span>
          </div>
          <ProgressBar progress={progress} size="sm" color="accent" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card variant="glass" className="mb-6">
          {renderStep(currentStep)}
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStepIndex === 0}
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
            {currentStepIndex === totalSteps - 1 ? 'Complete' : 'Next'}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  )
}
