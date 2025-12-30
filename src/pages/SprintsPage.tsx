import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSprintsStore } from '@/store/sprints-store'
import { SprintModuleCard } from '@/components/sprints/SprintModuleCard'
import { SprintStatsPanel } from '@/components/sprints/SprintStatsPanel'
import { Button } from '@/components/ui'

export function SprintsPage() {
  const navigate = useNavigate()

  const modules = useSprintsStore((s) => s.modules)
  const moduleProgress = useSprintsStore((s) => s.moduleProgress)
  const language = useSprintsStore((s) => s.language)
  const currentModuleId = useSprintsStore((s) => s.currentModuleId)
  const initializeModules = useSprintsStore((s) => s.initializeModules)
  const setLanguage = useSprintsStore((s) => s.setLanguage)
  const startModule = useSprintsStore((s) => s.startModule)
  const getTotalSprintXP = useSprintsStore((s) => s.getTotalSprintXP)
  const isModuleUnlocked = useSprintsStore((s) => s.isModuleUnlocked)

  // Initialize modules on mount
  useEffect(() => {
    initializeModules(language)
  }, [])

  const totalXP = getTotalSprintXP()
  const modulesCompleted = Object.values(moduleProgress).filter(p => p.status === 'completed').length

  const handleLanguageToggle = () => {
    const newLang = language === 'typescript' ? 'python' : 'typescript'
    setLanguage(newLang)
  }

  const handleStartModule = (moduleId: string) => {
    startModule(moduleId)
    navigate(`/sprints/${moduleId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 to-surface-100 dark:from-surface-950 dark:to-surface-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-surface-900 dark:text-surface-100 mb-2">
                ⚡ Sprints
              </h1>
              <p className="text-surface-600 dark:text-surface-400">
                Master coding through focused, XP-driven practice sessions
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleLanguageToggle}
              className="capitalize"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Switch to {language === 'typescript' ? 'Python' : 'TypeScript'}
            </Button>
          </div>

          {/* Hero Banner */}
          <div className="p-6 bg-gradient-to-r from-accent-500/10 to-accent-600/5 rounded-xl border border-accent-500/20">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎯</div>
              <div className="flex-1">
                <h2 className="text-lg font-heading font-bold text-surface-900 dark:text-surface-100 mb-2">
                  How Sprints Work
                </h2>
                <ul className="space-y-1 text-sm text-surface-700 dark:text-surface-300">
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500 dark:text-accent-400 mt-0.5">•</span>
                    <span>Complete mini code exercises to earn <strong>15 XP</strong> each</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500 dark:text-accent-400 mt-0.5">•</span>
                    <span>Earn enough XP to <strong>unlock the next module</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent-500 dark:text-accent-400 mt-0.5">•</span>
                    <span>Build fluency through <strong>rapid-fire practice</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8">
          {/* Module Grid */}
          <div>
            <h2 className="text-xl font-heading font-bold text-surface-800 dark:text-surface-200 mb-4 capitalize">
              {language} Sprints
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {modules.map((module) => {
                const progress = moduleProgress[module.id] || {
                  moduleId: module.id,
                  xpEarned: 0,
                  exercisesAttempted: 0,
                  exercisesCompleted: 0,
                  startedAt: null,
                  completedAt: null,
                  lastPracticed: null,
                  status: 'locked' as const
                }

                return (
                  <SprintModuleCard
                    key={module.id}
                    module={module}
                    progress={progress}
                    isUnlocked={isModuleUnlocked(module.id)}
                    currentTotalXP={totalXP}
                    onStart={() => handleStartModule(module.id)}
                  />
                )
              })}
            </div>

            {/* Empty State */}
            {modules.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📚</div>
                <p className="text-surface-600 dark:text-surface-400">No sprint modules available</p>
              </div>
            )}
          </div>

          {/* Stats Sidebar */}
          <aside className="hidden lg:block">
            <SprintStatsPanel
              totalXP={totalXP}
              modulesCompleted={modulesCompleted}
              modulesTotal={modules.length}
              currentModuleId={currentModuleId}
              modules={modules}
              language={language}
            />
          </aside>
        </div>

        {/* Mobile Stats (below grid on mobile) */}
        <div className="lg:hidden mt-8">
          <SprintStatsPanel
            totalXP={totalXP}
            modulesCompleted={modulesCompleted}
            modulesTotal={modules.length}
            currentModuleId={currentModuleId}
            modules={modules}
            language={language}
          />
        </div>
      </div>
    </div>
  )
}
