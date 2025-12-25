import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Tabs } from '@/components/ui'
import { TopicSelector, DifficultyPicker, ExerciseTypeSelector } from '@/components/practice'
import { LessonPracticeSelector } from '@/components/practice/LessonPracticeSelector'
import { usePracticeStore } from '@/store/practice-store'
import type { PracticeTopic, PracticeDifficulty } from '@/types/practice'
import { getTopics } from '@/constants/practice-topics'

export function PracticePage() {
  const navigate = useNavigate()
  const startSession = usePracticeStore((s) => s.startSession)
  const [activeTab, setActiveTab] = useState('topics')

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

  const handleStartPractice = () => {
    if (!selectedTopic) return

    startSession(selectedTopic, difficulty, exerciseType, language)
    navigate('/practice/session')
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
      </Tabs>
    </div>
  )
}
