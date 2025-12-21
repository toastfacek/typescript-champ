import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, ProgressBar } from '@/components/ui'
import { CodeExerciseStep } from '@/components/lesson/CodeExerciseStep'
import { FillInBlankStep } from '@/components/lesson/FillInBlankStep'
import { QuizStep } from '@/components/lesson/QuizStep'
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

  // Redirect if no session
  useEffect(() => {
    if (!currentSession) {
      navigate('/practice')
    }
  }, [currentSession, navigate])

  // Generate first exercise
  useEffect(() => {
    if (currentSession && !currentExercise && !isGenerating && !generationError) {
      generateNextExercise()
      setExerciseStartTime(Date.now())
    }
  }, [currentSession, currentExercise, isGenerating, generationError, generateNextExercise])

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

  const handleEndSession = useCallback(() => {
    endSession()
    navigate('/practice')
  }, [endSession, navigate])

  if (!currentSession) {
    return null
  }

  // Render loading state
  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <SessionHeader session={currentSession} onEnd={handleEndSession} />
        <Card className="mt-6" padding="lg">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mb-4" />
            <p className="text-lg font-medium text-gray-700">Generating exercise...</p>
            <p className="text-sm text-gray-500 mt-2">
              Our AI is creating a unique {currentSession.difficulty} exercise about {currentSession.topic}
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
            <p className="text-lg font-medium text-gray-700 mb-2">Failed to generate exercise</p>
            <p className="text-sm text-red-600 mb-4">{generationError}</p>
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
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
          <span className="capitalize">{currentSession.topic}</span>
          <span>•</span>
          <span className="capitalize">{currentSession.difficulty}</span>
          <span>•</span>
          <span className="capitalize">{currentExercise.type.replace('-', ' ')}</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900">
          {'title' in step && step.title ? step.title : 'Exercise'}
        </h2>
      </div>

      {/* Exercise Content */}
      <Card padding="lg">
        {step.type === 'code-exercise' && (
          <CodeExerciseStep
            step={step as CodeExerciseStepType}
            isComplete={exerciseComplete}
            onComplete={handleExerciseComplete}
            onHintUsed={() => {}}
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
    <div className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-900">Practice Session</h1>
        <p className="text-sm text-gray-500">
          {session.topic} • {session.difficulty}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">
            {session.exercisesCompleted}
          </div>
          <div className="text-xs text-gray-500">Completed</div>
        </div>

        <div className="text-center">
          <div className="text-2xl font-bold text-gray-600">
            {session.exercisesAttempted}
          </div>
          <div className="text-xs text-gray-500">Attempted</div>
        </div>

        {session.exercisesAttempted > 0 && (
          <div className="w-24">
            <ProgressBar
              progress={completionRate / 100}
              size="sm"
              color={completionRate >= 80 ? 'success' : 'primary'}
            />
            <div className="text-xs text-gray-500 text-center mt-1">
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
