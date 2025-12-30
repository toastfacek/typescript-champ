import { useState, useCallback, useEffect } from 'react'
import { Card, Button } from '@/components/ui'
import { CodeExerciseStep } from '@/components/lesson/CodeExerciseStep'
import type { SprintExercise } from '@/types/sprints'
import { SPRINT_CONFIG } from '@/constants/sprint-config'

interface SprintExerciseAreaProps {
  exercise: SprintExercise
  moduleTitle: string
  exerciseNumber: number
  totalExercises: number
  onComplete: (success: boolean, timeSeconds: number) => void
  onNext: () => void
  onEnd: () => void
}

export function SprintExerciseArea({
  exercise,
  moduleTitle,
  exerciseNumber,
  totalExercises,
  onComplete,
  onNext,
  onEnd
}: SprintExerciseAreaProps) {
  const [isComplete, setIsComplete] = useState(false)
  const [showXPAnimation, setShowXPAnimation] = useState(false)
  const [exerciseStartTime] = useState(Date.now())

  const handleComplete = useCallback(() => {
    const timeSeconds = Math.round((Date.now() - exerciseStartTime) / 1000)
    setIsComplete(true)
    setShowXPAnimation(true)
    onComplete(true, timeSeconds)

    // Hide XP animation after 2 seconds
    setTimeout(() => setShowXPAnimation(false), 2000)
  }, [exerciseStartTime, onComplete])

  const handleNext = useCallback(() => {
    setIsComplete(false)
    setShowXPAnimation(false)
    onNext()
  }, [onNext])

  // Reset complete state when exercise changes
  useEffect(() => {
    setIsComplete(false)
    setShowXPAnimation(false)
  }, [exercise.id])

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Exercise Header */}
      <div className="flex-shrink-0 p-6 border-b border-surface-200 dark:border-surface-700 bg-surface-100/50 dark:bg-surface-900/50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="text-2xl">⚡</div>
            <div>
              <h2 className="text-xl font-heading font-bold text-surface-900 dark:text-surface-100">
                {moduleTitle}
              </h2>
              <div className="flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400 mt-1">
                <span className="capitalize">{exercise.difficulty}</span>
                <span>•</span>
                <span className="capitalize">{exercise.topic}</span>
                <span>•</span>
                <span>+{SPRINT_CONFIG.XP_PER_EXERCISE} XP</span>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="text-right">
            <div className="text-2xl font-heading font-bold text-accent-500 dark:text-accent-400">
              {exerciseNumber}
              <span className="text-surface-400 dark:text-surface-600">/{totalExercises}</span>
            </div>
            <div className="text-xs text-surface-500 dark:text-surface-500">exercises</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="w-full h-1.5 bg-surface-200 dark:bg-surface-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-500 to-accent-400 transition-all duration-500"
              style={{ width: `${(exerciseNumber / totalExercises) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Exercise Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Card padding="lg" className="max-w-4xl mx-auto">
          <CodeExerciseStep
            step={exercise.step}
            lesson={{
              id: `sprint-${exercise.moduleId}`,
              slug: 'sprint',
              title: moduleTitle,
              description: '',
              order: 0,
              estimatedMinutes: 0,
              difficulty: 'beginner',
              xpReward: SPRINT_CONFIG.XP_PER_EXERCISE,
              prerequisites: [],
              tags: [],
              steps: [],
              language: 'typescript'
            }}
            isComplete={isComplete}
            onComplete={handleComplete}
            onHintUsed={() => {}}
          />
        </Card>
      </div>

      {/* Action Buttons */}
      {isComplete && (
        <div className="flex-shrink-0 p-6 border-t border-surface-700 bg-surface-900/50">
          <div className="flex justify-center gap-4 max-w-4xl mx-auto">
            <Button size="lg" onClick={handleNext} className="min-w-[200px]">
              <span className="mr-2">Next Exercise</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Button>
            <Button size="lg" variant="outline" onClick={onEnd}>
              End Sprint
            </Button>
          </div>
        </div>
      )}

      {/* XP Gain Animation */}
      {showXPAnimation && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="animate-bounce-slow">
            <div className="px-8 py-4 bg-accent-500 rounded-2xl shadow-2xl shadow-accent-500/50 transform scale-110">
              <div className="flex items-center gap-3">
                <span className="text-4xl">⭐</span>
                <div>
                  <div className="text-3xl font-heading font-bold text-white">
                    +{SPRINT_CONFIG.XP_PER_EXERCISE} XP
                  </div>
                  <div className="text-sm text-white/80">Great work!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
