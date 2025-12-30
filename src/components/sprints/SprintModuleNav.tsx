import { useEffect, useRef } from 'react'
import type { SprintModule, SprintProgress } from '@/types/sprints'
import { Button } from '@/components/ui'

interface SprintModuleNavProps {
  modules: SprintModule[]
  moduleProgress: Record<string, SprintProgress>
  currentModuleId: string
  language: 'typescript' | 'python'
  totalXP: number
  isOpen: boolean
  onToggle: () => void
  onModuleClick?: (moduleId: string) => void
}

export function SprintModuleNav({
  modules,
  moduleProgress,
  currentModuleId,
  language,
  totalXP,
  isOpen,
  onToggle,
  onModuleClick
}: SprintModuleNavProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const currentModuleRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to current module on mount
  useEffect(() => {
    if (currentModuleRef.current && navRef.current) {
      currentModuleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [currentModuleId])

  const getModuleStatus = (module: SprintModule) => {
    const progress = moduleProgress[module.id]
    if (!progress) return 'locked'

    // Check if unlocked
    const isUnlocked = module.order === 1 || totalXP >= module.unlockThresholdXP
    if (!isUnlocked) return 'locked'

    return progress.status
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-4 h-4 text-success-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'in-progress':
        return (
          <div className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
        )
      case 'unlocked':
        return (
          <div className="w-2 h-2 bg-surface-500 rounded-full" />
        )
      case 'locked':
        return (
          <svg className="w-4 h-4 text-surface-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        )
    }
  }

  if (!isOpen) {
    return null
  }

  return (
    <aside className="bg-surface-50 dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 w-80 flex flex-col shadow-2xl">
      {/* Header */}
      <div className="p-6 border-b border-surface-200 dark:border-surface-800 flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-surface-500 dark:text-surface-400 uppercase tracking-widest text-[10px] mb-1">
            Sprint Modules
          </h2>
          <div className="text-xs text-surface-600 dark:text-surface-500 capitalize">
            {language}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="hover:bg-surface-200 dark:hover:bg-surface-800"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </Button>
      </div>

      {/* Module List */}
      <div ref={navRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {modules.map((module, idx) => {
          const progress = moduleProgress[module.id]
          const status = getModuleStatus(module)
          const isCurrent = module.id === currentModuleId
          const isLocked = status === 'locked'
          const isClickable = !isLocked && onModuleClick && !isCurrent

          // Calculate progress percentage for in-progress modules
          const progressPercent = progress && module.targetExerciseCount > 0
            ? Math.min((progress.exercisesCompleted / module.targetExerciseCount) * 100, 100)
            : 0

          return (
            <div
              key={module.id}
              ref={isCurrent ? currentModuleRef : null}
              className="relative"
            >
              {/* Connecting Line */}
              {idx < modules.length - 1 && (
                <div className="absolute left-5 top-10 w-0.5 h-8 bg-surface-300 dark:bg-surface-700" />
              )}

              {/* Module Card */}
              <button
                onClick={() => isClickable && onModuleClick(module.id)}
                disabled={isLocked || isCurrent}
                className={`
                  w-full text-left p-3 rounded-lg transition-all
                  ${isCurrent
                    ? 'bg-accent-500/10 border-2 border-accent-500/30 shadow-lg shadow-accent-500/10'
                    : isLocked
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-surface-200 dark:hover:bg-surface-800 border-2 border-transparent'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  {/* Status Icon */}
                  <div className="mt-1 flex-shrink-0">
                    {getStatusIcon(status)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className={`text-[11px] font-bold ${
                        isCurrent
                          ? 'text-accent-600 dark:text-accent-400'
                          : 'text-surface-700 dark:text-surface-300'
                      }`}>
                        {module.title}
                      </span>
                      <span className="text-lg flex-shrink-0">{module.icon}</span>
                    </div>

                    {/* XP Info */}
                    {progress && progress.xpEarned > 0 && (
                      <div className="text-[10px] text-accent-600 dark:text-accent-400 mb-1">
                        {progress.xpEarned} XP earned
                      </div>
                    )}

                    {/* Progress Bar */}
                    {status === 'in-progress' && progress && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-[9px] text-surface-500 mb-1">
                          <span>Progress</span>
                          <span>{progress.exercisesCompleted}/{module.targetExerciseCount}</span>
                        </div>
                        <div className="w-full h-1 bg-surface-300 dark:bg-surface-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent-500 transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Locked Indicator */}
                    {isLocked && (
                      <div className="text-[9px] text-surface-500 mt-1">
                        Unlock at {module.unlockThresholdXP} XP
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {/* Footer: Total XP */}
      <div className="p-4 border-t border-surface-200 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
        <div className="flex items-center justify-between">
          <div className="text-xs text-surface-600 dark:text-surface-400">Total Sprint XP</div>
          <div className="flex items-center gap-1">
            <span className="text-lg">⭐</span>
            <span className="text-lg font-heading font-bold text-accent-500">{totalXP}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
