import { Card } from '@/components/ui'
import type { SprintModule } from '@/types/sprints'

interface SprintStatsPanelProps {
  totalXP: number
  modulesCompleted: number
  modulesTotal: number
  currentModuleId: string | null
  modules: SprintModule[]
  language: 'typescript' | 'python'
}

export function SprintStatsPanel({
  totalXP,
  modulesCompleted,
  modulesTotal,
  currentModuleId,
  modules,
  language
}: SprintStatsPanelProps) {
  const currentModule = currentModuleId
    ? modules.find(m => m.id === currentModuleId)
    : null

  const completionPercent = modulesTotal > 0
    ? Math.round((modulesCompleted / modulesTotal) * 100)
    : 0

  return (
    <Card className="sticky top-4" padding="lg">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-sm font-heading font-bold text-surface-600 dark:text-surface-400 uppercase tracking-wide mb-1">
          Sprints Progress
        </h3>
        <div className="text-xs text-surface-500 dark:text-surface-500 capitalize">{language}</div>
      </div>

      {/* Total XP */}
      <div className="mb-6 p-4 bg-gradient-to-br from-accent-500/10 to-accent-600/5 rounded-lg border border-accent-500/20">
        <div className="flex items-center gap-3">
          <div className="text-3xl">⭐</div>
          <div>
            <div className="text-2xl font-heading font-bold text-accent-500 dark:text-accent-400">
              {totalXP}
            </div>
            <div className="text-xs text-surface-600 dark:text-surface-400">Total Sprint XP</div>
          </div>
        </div>
      </div>

      {/* Modules Completed */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-surface-600 dark:text-surface-400">Modules Completed</span>
          <span className="text-sm font-bold text-surface-800 dark:text-surface-200">
            {modulesCompleted} / {modulesTotal}
          </span>
        </div>
        <div className="relative w-full h-2 bg-surface-200 dark:bg-surface-800 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-success-500 to-success-400 transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-surface-500 dark:text-surface-500 text-right">
          {completionPercent}% complete
        </div>
      </div>

      {/* Current Module */}
      {currentModule && (
        <div className="mb-6 p-3 bg-surface-100 dark:bg-surface-800/50 rounded-lg border border-surface-200 dark:border-surface-700">
          <div className="text-xs text-surface-500 dark:text-surface-500 mb-1">Current Sprint</div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{currentModule.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-surface-800 dark:text-surface-200 truncate">
                {currentModule.title}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-surface-100 dark:bg-surface-800/30 rounded-lg">
          <div className="text-xs text-surface-500 dark:text-surface-500 mb-1">Unlocked</div>
          <div className="text-xl font-heading font-bold text-surface-800 dark:text-surface-200">
            {modules.filter(m => m.order === 1 || totalXP >= m.unlockThresholdXP).length}
          </div>
        </div>
        <div className="p-3 bg-surface-100 dark:bg-surface-800/30 rounded-lg">
          <div className="text-xs text-surface-500 dark:text-surface-500 mb-1">Remaining</div>
          <div className="text-xl font-heading font-bold text-surface-800 dark:text-surface-200">
            {modulesTotal - modulesCompleted}
          </div>
        </div>
      </div>

      {/* Motivation Message */}
      <div className="mt-6 pt-6 border-t border-surface-200 dark:border-surface-700">
        <div className="text-sm text-surface-600 dark:text-surface-400 italic text-center">
          {modulesCompleted === 0 && "Start your first sprint to build momentum!"}
          {modulesCompleted > 0 && modulesCompleted < modulesTotal && "Keep going! You're making great progress."}
          {modulesCompleted === modulesTotal && "🎉 All sprints completed! Amazing work!"}
        </div>
      </div>
    </Card>
  )
}
