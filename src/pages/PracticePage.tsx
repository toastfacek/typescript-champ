import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button } from '@/components/ui'
import { TopicSelector, DifficultyPicker, ExerciseTypeSelector } from '@/components/practice'
import { usePracticeStore } from '@/store/practice-store'
import type { PracticeTopic, PracticeDifficulty } from '@/types/practice'

export function PracticePage() {
  const navigate = useNavigate()
  const startSession = usePracticeStore((s) => s.startSession)

  const [selectedTopic, setSelectedTopic] = useState<PracticeTopic | null>(null)
  const [difficulty, setDifficulty] = useState<PracticeDifficulty>('medium')
  const [exerciseType, setExerciseType] = useState<'code-exercise' | 'fill-in-blank' | 'quiz' | 'mixed'>('mixed')

  const handleStartPractice = () => {
    if (!selectedTopic) return

    startSession(selectedTopic, difficulty, exerciseType)
    navigate('/practice/session')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Practice Mode</h1>
        <p className="text-gray-600">
          Sharpen your TypeScript skills with AI-generated exercises.
          Choose a topic, difficulty, and start practicing!
        </p>
      </div>

      {/* Topic Selection */}
      <Card className="mb-6" padding="lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          1. Choose a Topic
        </h2>
        <TopicSelector
          selectedTopic={selectedTopic}
          onSelectTopic={setSelectedTopic}
        />
      </Card>

      {/* Difficulty Selection */}
      <Card className="mb-6" padding="lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          2. Select Difficulty
        </h2>
        <DifficultyPicker selected={difficulty} onChange={setDifficulty} />
      </Card>

      {/* Exercise Type Selection */}
      <Card className="mb-6" padding="lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          3. Exercise Type
        </h2>
        <ExerciseTypeSelector selected={exerciseType} onChange={setExerciseType} />
      </Card>

      {/* Start Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleStartPractice}
          disabled={!selectedTopic}
          className="px-12"
        >
          Start Practice
        </Button>
      </div>

      {!selectedTopic && (
        <p className="text-center text-sm text-gray-500 mt-3">
          Select a topic to begin
        </p>
      )}
    </div>
  )
}
