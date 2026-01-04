import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, ProgressBar } from '@/components/ui'
import { CodeExerciseStep } from '@/components/lesson/CodeExerciseStep'
import { FillInBlankStep } from '@/components/lesson/FillInBlankStep'
import { QuizStep } from '@/components/lesson/QuizStep'
import { ExerciseFeedbackModal, type TestResult } from '@/components/practice/ExerciseFeedbackModal'
import { usePracticeStore } from '@/store/practice-store'
import type { CodeExerciseStep as CodeExerciseStepType, FillInBlankStep as FillInBlankStepType, QuizStep as QuizStepType } from '@/types'

export function PracticeSessionPage() {
  const navigate = useNavigate()

  const currentSession = usePracticeStore((s) => s.currentSession)
  const currentExercise = usePracticeStore((s) => s.currentExercise)
  const isGenerating = usePracticeStore((s) => s.isGenerating)
  const generationError = usePracticeStore((s) => s.generationError)
  const generateNextExercise = usePracticeStore((s) => s.generateNextExercise)
  const completeExercise = usePracticeStore((s) => s.completeExercise)
  const endSession = usePracticeStore((s) => s.endSession)

  const [exerciseComplete, setExerciseComplete] = useState(false)
  const [exerciseStartTime, setExerciseStartTime] = useState<number>(0)
  const [hasGeneratedFirst, setHasGeneratedFirst] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [lastTestResults, setLastTestResults] = useState<TestResult[]>([])

  // Redirect if no session
  useEffect(() => {
    if (!currentSession) {
      navigate('/practice')
    }
  }, [currentSession, navigate])

  // Reset first-generation flag when session changes
  useEffect(() => {
    if (currentSession?.id) {
      setHasGeneratedFirst(false)
    }
  }, [currentSession?.id])

  // Generate first exercise only (not on every completion)
  useEffect(() => {
    if (currentSession && !currentExercise && !isGenerating && !generationError && !hasGeneratedFirst) {
      generateNextExercise()
      setExerciseStartTime(Date.now())
      setHasGeneratedFirst(true)
    }
  }, [currentSession, currentExercise, isGenerating, generationError, generateNextExercise, hasGeneratedFirst])

  const handleExerciseComplete = useCallback(() => {
    setExerciseComplete(true)
    const timeSeconds = Math.round((Date.now() - exerciseStartTime) / 1000)
    completeExercise(true, timeSeconds)
  }, [exerciseStartTime, completeExercise])

  const handleNextExercise = useCallback(() => {
    setExerciseComplete(false)
    generateNextExercise()
    setExerciseStartTime(Date.now())
  }, [generateNextExercise])

  const handleTestComplete = useCallback((results: TestResult[]) => {
    setLastTestResults(results)
    setShowFeedbackModal(true)
  }, [])

  const calculateXP = useCallback(() => {
    if (!currentSession) return 0
    const allPassed = lastTestResults.every((r) => r.passed)
    if (!allPassed) return 0

    if (currentSession.mode === 'drill') {
      return 15 // DRILL_XP_PER_EXERCISE
    }

    const difficulty = currentSession.difficulty
    return difficulty === 'easy' ? 15 : difficulty === 'medium' ? 30 : 50
  }, [currentSession, lastTestResults])

  const handleEndSession = useCallback(() => {
    endSession()
    navigate('/practice')
  }, [endSession, navigate])

  if (!currentSession) {
    return null
  }

  // Render loading state
  if (isGenerating) {
    const isDrillMode = currentSession.mode === 'drill'
    const loadingMessage = isDrillMode && currentSession.moduleTitle
      ? `Preparing ${currentSession.moduleTitle} exercises...`
      : 'Generating exercise...'
    const loadingDetail = isDrillMode
      ? 'Generating fundamental drilling exercises for rapid practice'
      : `Our AI is creating a unique ${currentSession.difficulty} exercise about ${currentSession.topic}`

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SessionHeader session={currentSession} onEnd={handleEndSession} />
        <Card className="mt-6" padding="lg">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mb-4" />
            <p className="text-lg font-medium text-surface-200">{loadingMessage}</p>
            <p className="text-sm text-surface-400 mt-2">
              {loadingDetail}
            </p>
          </div>
        </Card>
      </div>
    )
  }

  // Render error state
  if (generationError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SessionHeader session={currentSession} onEnd={handleEndSession} />
        <Card className="mt-6" padding="lg">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-4xl mb-4">😕</div>
            <p className="text-lg font-medium text-surface-200 mb-2">Failed to generate exercise</p>
            <p className="text-sm text-danger-400 mb-4">{generationError}</p>
            <div className="flex gap-3">
              <Button onClick={handleNextExercise}>Try Again</Button>
              <Button variant="outline" onClick={handleEndSession}>End Session</Button>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Render exercise
  if (!currentExercise) {
    return null
  }

  const step = currentExercise.step

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SessionHeader session={currentSession} onEnd={handleEndSession} />

      {/* Exercise Title */}
      <div className="mt-6 mb-4">
        <div className="flex items-center gap-2 text-sm text-surface-400 mb-1">
          <span className="capitalize">{currentSession.topic}</span>
          <span>•</span>
          <span className="capitalize">{currentSession.difficulty}</span>
          <span>•</span>
          <span className="capitalize">{currentExercise.type.replace('-', ' ')}</span>
        </div>
        <h2 className="text-xl font-heading font-semibold text-surface-100">
          {'title' in step && step.title ? step.title : 'Exercise'}
        </h2>
      </div>

      {/* Exercise Content */}
      <Card padding="lg">
        {step.type === 'code-exercise' && (
          <CodeExerciseStep
            step={step as CodeExerciseStepType}
            lesson={currentSession ? {
              id: 'practice-exercise',
              slug: 'practice',
              title: 'Practice Exercise',
              description: '',
              order: 0,
              estimatedMinutes: 0,
              difficulty: 'beginner',
              xpReward: 0,
              prerequisites: [],
              tags: [],
              steps: [],
              language: currentSession.language
            } : undefined}
            isComplete={exerciseComplete}
            onComplete={handleExerciseComplete}
            onHintUsed={() => {}}
            onTestComplete={handleTestComplete}
          />
        )}

        {step.type === 'fill-in-blank' && (
          <FillInBlankStep
            step={step as FillInBlankStepType}
            isComplete={exerciseComplete}
            onComplete={handleExerciseComplete}
            onHintUsed={() => {}}
          />
        )}

        {step.type === 'quiz' && (
          <QuizStep
            step={step as QuizStepType}
            isComplete={exerciseComplete}
            onComplete={handleExerciseComplete}
          />
        )}
      </Card>

      {/* Next/End Buttons */}
      {exerciseComplete && (
        <div className="mt-6 flex justify-center gap-4">
          <Button size="lg" onClick={handleNextExercise}>
            Next Exercise
          </Button>
          <Button size="lg" variant="outline" onClick={handleEndSession}>
            End Session
          </Button>
        </div>
      )}

      {/* Exercise Feedback Modal */}
      <ExerciseFeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        testResults={lastTestResults}
        mode={currentSession?.mode || 'practice'}
        xpEarned={calculateXP()}
        onNextExercise={() => {
          setShowFeedbackModal(false)
          handleNextExercise()
        }}
        onRetry={() => setShowFeedbackModal(false)}
      />
    </div>
  )
}

// Session header component
interface SessionHeaderProps {
  session: {
    topic: string
    difficulty: string
    exercisesAttempted: number
    exercisesCompleted: number
  }
  onEnd: () => void
}

function SessionHeader({ session, onEnd }: SessionHeaderProps) {
  const completionRate = session.exercisesAttempted > 0
    ? Math.round((session.exercisesCompleted / session.exercisesAttempted) * 100)
    : 0

  return (
    <div className="flex items-center justify-between bg-surface-800/50 rounded-xl border border-surface-700/50 p-4">
      <div>
        <h1 className="text-lg font-heading font-semibold text-surface-100">Practice Session</h1>
        <p className="text-sm text-surface-400">
          {session.topic} • {session.difficulty}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-success-400">
            {session.exercisesCompleted}
          </div>
          <div className="text-xs text-surface-500">Completed</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-heading font-bold text-surface-300">
            {session.exercisesAttempted}
          </div>
          <div className="text-xs text-surface-500">Attempted</div>
        </div>

        {session.exercisesAttempted > 0 && (
          <div className="w-24">
            <ProgressBar
              progress={completionRate / 100}
              size="sm"
              color={completionRate >= 80 ? 'success' : 'accent'}
            />
            <div className="text-xs text-surface-500 text-center mt-1">
              {completionRate}% success
            </div>
          </div>
        )}

        <Button variant="outline" size="sm" onClick={onEnd}>
          End Session
        </Button>
      </div>
    </div>
  )
}
