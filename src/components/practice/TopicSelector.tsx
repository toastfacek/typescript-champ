import { Card } from '@/components/ui'
import type { PracticeTopic, TopicInfo, MasteryLevel } from '@/types/practice'
import { usePracticeStore } from '@/store/practice-store'

const TOPICS: TopicInfo[] = [
  { id: 'basics', name: 'TypeScript Basics', description: 'Variables, types, and fundamentals' },
  { id: 'types', name: 'Type System', description: 'Type annotations and inference' },
  { id: 'functions', name: 'Functions', description: 'Parameters, returns, and arrow functions' },
  { id: 'objects', name: 'Objects & Interfaces', description: 'Object types and interfaces' },
  { id: 'arrays', name: 'Arrays & Collections', description: 'Typed arrays and array methods' },
  { id: 'generics', name: 'Generics', description: 'Generic types and constraints' },
  { id: 'advanced-types', name: 'Advanced Types', description: 'Unions, intersections, and guards' },
  { id: 'async', name: 'Async TypeScript', description: 'Promises, async/await, error handling' },
  { id: 'classes', name: 'Classes', description: 'Classes, inheritance, and access modifiers' }
]

const MASTERY_COLORS: Record<MasteryLevel, string> = {
  learning: 'bg-gray-100 text-gray-600',
  practicing: 'bg-blue-100 text-blue-600',
  confident: 'bg-green-100 text-green-600',
  mastered: 'bg-yellow-100 text-yellow-700'
}

const MASTERY_LABELS: Record<MasteryLevel, string> = {
  learning: 'Learning',
  practicing: 'Practicing',
  confident: 'Confident',
  mastered: 'Mastered'
}

interface TopicSelectorProps {
  selectedTopic: PracticeTopic | null
  onSelectTopic: (topic: PracticeTopic) => void
}

export function TopicSelector({ selectedTopic, onSelectTopic }: TopicSelectorProps) {
  const getStats = usePracticeStore((s) => s.getStats)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {TOPICS.map((topic) => {
        const stats = getStats(topic.id)
        const isSelected = selectedTopic === topic.id

        return (
          <Card
            key={topic.id}
            hover
            className={`cursor-pointer transition-all ${
              isSelected
                ? 'ring-2 ring-primary-500 border-primary-500 bg-primary-50'
                : ''
            }`}
            padding="md"
            onClick={() => onSelectTopic(topic.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{topic.name}</h3>
              {stats.totalAttempts > 0 && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    MASTERY_COLORS[stats.masteryLevel]
                  }`}
                >
                  {MASTERY_LABELS[stats.masteryLevel]}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-3">{topic.description}</p>

            {stats.totalAttempts > 0 ? (
              <div className="text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span className="font-medium text-gray-600">
                    {stats.totalCompleted} / {stats.totalAttempts}
                  </span>
                </div>
                {stats.lastPracticed && (
                  <div className="flex justify-between">
                    <span>Last practiced</span>
                    <span className="font-medium text-gray-600">
                      {new Date(stats.lastPracticed).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-gray-400 italic">
                Not practiced yet
              </div>
            )}
          </Card>
        )
      })}
    </div>
  )
}
