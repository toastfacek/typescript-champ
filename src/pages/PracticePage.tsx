import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Tabs } from '@/components/ui'
import { TopicSelector, DifficultyPicker, ExerciseTypeSelector } from '@/components/practice'
import { LessonPracticeSelector } from '@/components/practice/LessonPracticeSelector'
import { usePracticeStore } from '@/store/practice-store'
import { useSprintsStore } from '@/store/sprints-store'
import type { PracticeTopic, PracticeDifficulty } from '@/types/practice'
import { getTopics } from '@/constants/practice-topics'
import { getSprintModules } from '@/constants/sprint-modules'

export function PracticePage() {
  const navigate = useNavigate()
  const startSession = usePracticeStore((s) => s.startSession)
  const initializeModules = useSprintsStore((s) => s.initializeModules)
  const isModuleUnlocked = useSprintsStore((s) => s.isModuleUnlocked)
  const [activeTab, setActiveTab] = useState('topics')
  const [isPreGenerating, setIsPreGenerating] = useState(false)
  const [preGenModuleName, setPreGenModuleName] = useState('')

  const [selectedTopic, setSelectedTopic] = useState<PracticeTopic | null>(null)
  const [difficulty, setDifficulty] = useState<PracticeDifficulty>('medium')
  const [exerciseType, setExerciseType] = useState<'code-exercise' | 'fill-in-blank' | 'quiz' | 'mixed'>('mixed')
  const [language, setLanguage] = useState<'typescript' | 'python'>('typescript')

  // Clear selected topic when switching languages if it's not valid for the new language
  const handleLanguageChange = (newLanguage: 'typescript' | 'python') => {
    setLanguage(newLanguage)
    const topics = getTopics(newLanguage)
    const topicIds = topics.map(t => t.id)
    if (selectedTopic && !topicIds.includes(selectedTopic)) {
      setSelectedTopic(null)
    }
  }

  useEffect(() => {
    initializeModules(language)
  }, [initializeModules, language])

  const handleStartPractice = () => {
    if (!selectedTopic) return

    startSession(selectedTopic, difficulty, exerciseType, language)
    navigate('/practice/session')
  }

  const handleStartSprint = async (moduleId: string) => {
    try {
      console.log('Starting sprint for module:', moduleId)
      const modules = getSprintModules(language)
      const module = modules.find((mod) => mod.id === moduleId)

      if (!module) {
        console.error('Module not found:', moduleId)
        return
      }

      const unlocked = isModuleUnlocked(moduleId)
      console.log('Module unlocked?', unlocked)

      if (!unlocked) {
        console.error('Module is locked:', moduleId)
        return
      }

      const moduleTopics = module.topics as PracticeTopic[]
      const defaultTopic = moduleTopics[0] || 'basics'

      console.log('Starting session with topic:', defaultTopic)

      // Show loading modal during pre-generation
      setIsPreGenerating(true)
      setPreGenModuleName(module.title)

      // Start session (will pre-generate all exercises if configured)
      await startSession(
        defaultTopic,
        'easy',
        'code-exercise',
        module.language,
        {
          mode: 'drill',
          moduleId: module.id,
          moduleTitle: module.title,
          topicPool: moduleTopics
        }
      )

      setIsPreGenerating(false)
      console.log('Session started, navigating...')
      navigate('/practice/session')
    } catch (error) {
      console.error('Error starting sprint:', error)
      setIsPreGenerating(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-surface-50 mb-2">Practice Mode</h1>
            <p className="text-surface-300">
              Sharpen your coding skills with AI-generated exercises.
            </p>
          </div>
          
          {/* Language Toggle */}
          <div className="flex items-center gap-2 bg-surface-800/50 rounded-xl p-1 border border-surface-700/50">
            <button
              onClick={() => handleLanguageChange('typescript')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${language === 'typescript'
                  ? 'bg-accent-500/20 text-accent-400'
                  : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50'
                }
              `}
            >
              TypeScript
            </button>
            <button
              onClick={() => handleLanguageChange('python')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${language === 'python'
                  ? 'bg-accent-500/20 text-accent-400'
                  : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50'
                }
              `}
            >
              Python
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onChange={setActiveTab} variant="underline" className="mb-6">
        <Tabs.List>
          <Tabs.Tab value="topics">Topics</Tabs.Tab>
          <Tabs.Tab value="lessons">Lessons</Tabs.Tab>
          <Tabs.Tab value="sprints">Sprints</Tabs.Tab>
        </Tabs.List>

        {/* Topics Tab */}
        <Tabs.Panel value="topics">

          {/* Topic Selection */}
          <Card className="mb-6" padding="lg">
            <h2 className="text-lg font-heading font-semibold text-surface-100 mb-4">
              1. Choose a Topic
            </h2>
            <TopicSelector
              selectedTopic={selectedTopic}
              onSelectTopic={setSelectedTopic}
              language={language}
            />
          </Card>

          {/* Difficulty Selection */}
          <Card className="mb-6" padding="lg">
            <h2 className="text-lg font-heading font-semibold text-surface-100 mb-4">
              2. Select Difficulty
            </h2>
            <DifficultyPicker selected={difficulty} onChange={setDifficulty} />
          </Card>

          {/* Exercise Type Selection */}
          <Card className="mb-6" padding="lg">
            <h2 className="text-lg font-heading font-semibold text-surface-100 mb-4">
              3. Exercise Type
            </h2>
            <ExerciseTypeSelector selected={exerciseType} onChange={setExerciseType} />
          </Card>

          {/* Start Button */}
          <div className="flex flex-col items-center gap-3">
            <Button
              size="lg"
              onClick={handleStartPractice}
              disabled={!selectedTopic}
              className="px-12"
              glow={!!selectedTopic}
            >
              Start Practice
            </Button>
            {!selectedTopic && (
              <p className="text-center text-sm text-surface-500">
                Select a topic to begin
              </p>
            )}
          </div>
        </Tabs.Panel>

        {/* Lessons Tab */}
        <Tabs.Panel value="lessons">
          <LessonPracticeSelector />
        </Tabs.Panel>

        {/* Sprints Tab */}
        <Tabs.Panel value="sprints">
          <Card className="mb-6" padding="lg">
            <h2 className="text-lg font-heading font-semibold text-surface-100 mb-2">
              Focused Concept Drills
            </h2>
            <p className="text-sm text-surface-400">
              Pick a sprint module to drill fundamentals with rapid-fire code exercises.
            </p>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {getSprintModules(language).map((module) => {
              const isUnlocked = isModuleUnlocked(module.id)
              console.log(`Module ${module.id} (order: ${module.order}):`, isUnlocked)

              return (
                <Card key={module.id} padding="lg" className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-heading font-semibold text-surface-100">
                      {module.title}
                    </h3>
                    <p className="text-sm text-surface-400 mt-1">
                      {module.description}
                    </p>
                  </div>
                  <div className="text-2xl">{module.icon || '⚡'}</div>
                </div>

                <div className="text-xs text-surface-500">
                  Topics: {module.topics.join(', ')}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs text-surface-500">
                    {module.targetExerciseCount} exercises • {module.estimatedMinutes} min
                  </div>
                  <Button
                    size="sm"
                    disabled={!isUnlocked}
                    onClick={() => handleStartSprint(module.id)}
                  >
                    {isUnlocked ? 'Start Drill' : 'Locked'}
                  </Button>
                </div>

                {!isUnlocked && (
                  <div className="text-xs text-surface-500">
                    Unlock at {module.unlockThresholdXP} XP
                  </div>
                )}
              </Card>
              )
            })}
          </div>
        </Tabs.Panel>
      </Tabs>

      {/* Pre-generation Loading Modal */}
      {isPreGenerating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4" padding="lg">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent-500 mb-6" />
              <h3 className="text-xl font-heading font-semibold text-surface-100 mb-2">
                Preparing {preGenModuleName}
              </h3>
              <p className="text-sm text-surface-400 text-center">
                Generating fundamental drilling exercises for rapid practice...
              </p>
              <p className="text-xs text-surface-500 mt-4">
                This will only take a moment
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
