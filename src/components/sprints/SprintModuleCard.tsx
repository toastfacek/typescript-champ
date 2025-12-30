import { Button, Card, ProgressBar } from '@/components/ui'
import type { SprintModule, SprintProgress } from '@/types/sprints'

interface SprintModuleCardProps {
  module: SprintModule
  progress: SprintProgress
  isUnlocked: boolean
  currentTotalXP: number
  onStart: () => void
}

export function SprintModuleCard({
  module,
  progress,
  isUnlocked,
  currentTotalXP,
  onStart
}: SprintModuleCardProps) {
  const { status, xpEarned, exercisesCompleted } = progress
  const isLocked = !isUnlocked
  const isInProgress = status === 'in-progress'
  const isCompleted = status === 'completed'

  // Calculate progress percentage
  const progressPercent = module.targetExerciseCount > 0
    ? Math.min((exercisesCompleted / module.targetExerciseCount) * 100, 100)
    : 0

  // XP needed to unlock
  const xpNeeded = Math.max(0, module.unlockThresholdXP - currentTotalXP)

  return (
    <Card
      className={`relative overflow-hidden transition-all hover:shadow-lg ${
        isLocked ? 'opacity-60 grayscale' : ''
      }`}
      padding="lg"
    >
      {/* Module Icon & Title */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-2">
          <div className="text-4xl">{module.icon || '📚'}</div>
          {isCompleted && (
            <div className="flex items-center justify-center w-8 h-8 bg-success-500 rounded-full">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {isLocked && (
            <div className="flex items-center justify-center w-8 h-8 bg-surface-700 rounded-full">
              <svg className="w-5 h-5 text-surface-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          )}
        </div>

        <h3 className="text-lg font-heading font-bold text-surface-100 mb-1">
          {module.title}
        </h3>
        <p className="text-sm text-surface-400 mb-2">
          {module.description}
        </p>

        {/* Difficulty & Time */}
        <div className="flex items-center gap-3 text-xs text-surface-500">
          <span className="capitalize">{module.difficulty}</span>
          <span>•</span>
          <span>{module.estimatedMinutes} min</span>
          <span>•</span>
          <span>{module.targetExerciseCount} exercises</span>
        </div>
      </div>

      {/* Progress Bar (for in-progress modules) */}
      {isInProgress && !isCompleted && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-surface-400">Progress</span>
            <span className="text-accent-400 font-medium">
              {exercisesCompleted} / {module.targetExerciseCount}
            </span>
          </div>
          <ProgressBar progress={progressPercent / 100} size="sm" color="accent" />
        </div>
      )}

      {/* XP Earned (for in-progress/completed) */}
      {(isInProgress || isCompleted) && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <div>
            <div className="text-lg font-heading font-bold text-accent-400">
              {xpEarned} XP
            </div>
            <div className="text-xs text-surface-500">earned in this module</div>
          </div>
        </div>
      )}

      {/* Locked State: Show XP Requirement */}
      {isLocked && (
        <div className="mb-4 p-3 bg-surface-800/50 rounded-lg border border-surface-700">
          <div className="flex items-center gap-2 text-sm">
            <svg className="w-4 h-4 text-surface-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-surface-400">
              Unlock at <span className="font-bold text-surface-300">{module.unlockThresholdXP} XP</span>
            </span>
          </div>
          {xpNeeded > 0 && (
            <div className="mt-1 text-xs text-surface-500">
              ({xpNeeded} XP to go)
            </div>
          )}
        </div>
      )}

      {/* Action Button */}
      <Button
        onClick={onStart}
        disabled={isLocked}
        variant={isCompleted ? 'outline' : 'primary'}
        className="w-full"
      >
        {isLocked && 'Locked'}
        {!isLocked && !isInProgress && !isCompleted && 'Start Sprint'}
        {isInProgress && !isCompleted && 'Continue Sprint'}
        {isCompleted && 'Replay Sprint'}
      </Button>

      {/* Key Concepts Preview */}
      {!isLocked && module.concepts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-surface-700">
          <div className="text-xs text-surface-500 mb-2">You'll practice:</div>
          <div className="flex flex-wrap gap-1">
            {module.concepts.slice(0, 4).map((concept, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-surface-800/50 text-surface-400 text-[10px] rounded"
              >
                {concept}
              </span>
            ))}
            {module.concepts.length > 4 && (
              <span className="px-2 py-1 text-surface-500 text-[10px]">
                +{module.concepts.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}
