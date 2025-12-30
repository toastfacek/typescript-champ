import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSprintsStore } from '@/store/sprints-store'
import { SprintModuleNav } from '@/components/sprints/SprintModuleNav'
import { SprintExerciseArea } from '@/components/sprints/SprintExerciseArea'
import { Button, Card } from '@/components/ui'

export function SprintModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const modules = useSprintsStore((s) => s.modules)
  const moduleProgress = useSprintsStore((s) => s.moduleProgress)
  const language = useSprintsStore((s) => s.language)
  const currentModuleId = useSprintsStore((s) => s.currentModuleId)
  const currentExercise = useSprintsStore((s) => s.currentExercise)
  const isGenerating = useSprintsStore((s) => s.isGenerating)
  const generationError = useSprintsStore((s) => s.generationError)
  const getTotalSprintXP = useSprintsStore((s) => s.getTotalSprintXP)
  const startModule = useSprintsStore((s) => s.startModule)
  const endSession = useSprintsStore((s) => s.endSession)
  const generateNextExercise = useSprintsStore((s) => s.generateNextExercise)
  const completeExercise = useSprintsStore((s) => s.completeExercise)

  const currentModule = modules.find(m => m.id === moduleId)
  const progress = moduleId ? moduleProgress[moduleId] : null

  // Initialize module session
  useEffect(() => {
    if (moduleId && moduleId !== currentModuleId) {
      startModule(moduleId)
    }
  }, [moduleId, currentModuleId])

  // Generate first exercise if needed
  useEffect(() => {
    if (currentModuleId && !currentExercise && !isGenerating && !generationError) {
      generateNextExercise()
    }
  }, [currentModuleId, currentExercise, isGenerating, generationError])

  const handleEndSession = () => {
    endSession()
    navigate('/sprints')
  }

  const handleCompleteExercise = (success: boolean, timeSeconds: number) => {
    completeExercise(success, timeSeconds)
  }

  const handleNextExercise = () => {
    generateNextExercise()
  }

  // Redirect if module not found
  useEffect(() => {
    if (!moduleId || !currentModule) {
      navigate('/sprints')
    }
  }, [moduleId, currentModule, navigate])

  if (!currentModule) {
    return null
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex overflow-hidden bg-white dark:bg-surface-950">
      {/* Left Rail: Module Navigation */}
      <SprintModuleNav
        modules={modules}
        moduleProgress={moduleProgress}
        currentModuleId={currentModuleId || ''}
        language={language}
        totalXP={getTotalSprintXP()}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(false)}
      />

      {/* Main Content: Exercise Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Loading State */}
        {isGenerating && (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mb-4" />
            <p className="text-lg font-medium text-surface-800 dark:text-surface-200">Generating exercise...</p>
            <p className="text-sm text-surface-600 dark:text-surface-400 mt-2">
              Creating a {progress?.exercisesCompleted ? 'new' : 'custom'} challenge for you
            </p>
          </div>
        )}

        {/* Error State */}
        {generationError && (
          <div className="flex-1 flex items-center justify-center p-8">
            <Card padding="lg" className="max-w-md">
              <div className="text-center">
                <div className="text-4xl mb-4">😕</div>
                <p className="text-lg font-medium text-surface-800 dark:text-surface-200 mb-2">
                  Failed to generate exercise
                </p>
                <p className="text-sm text-danger-500 dark:text-danger-400 mb-4">{generationError}</p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleNextExercise}>Try Again</Button>
                  <Button variant="outline" onClick={handleEndSession}>
                    End Sprint
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Exercise Display */}
        {!isGenerating && !generationError && currentExercise && (
          <SprintExerciseArea
            exercise={currentExercise}
            moduleTitle={currentModule.title}
            moduleLanguage={currentModule.language}
            exerciseNumber={progress?.exercisesCompleted || 0 + 1}
            totalExercises={currentModule.targetExerciseCount}
            onComplete={handleCompleteExercise}
            onNext={handleNextExercise}
            onEnd={handleEndSession}
          />
        )}
      </main>

      {/* Floating Action Button (when sidebar closed) */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed left-6 bottom-6 z-50 p-4 rounded-full bg-accent-500 text-white dark:text-surface-900 shadow-2xl shadow-accent-500/40 hover:scale-110 active:scale-95 transition-all"
          aria-label="Open module navigation"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </div>
  )
}
