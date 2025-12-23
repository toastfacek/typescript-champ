import { SelectionGroup, SelectionItem, Badge } from '@/components/ui'
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

const MASTERY_VARIANTS: Record<MasteryLevel, 'default' | 'accent' | 'success' | 'gold'> = {
  learning: 'default',
  practicing: 'accent',
  confident: 'success',
  mastered: 'gold'
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
    <SelectionGroup
      value={selectedTopic || null}
      onChange={(value) => onSelectTopic(value as PracticeTopic)}
      layout="grid"
      columns={3}
      gap="md"
    >
      {TOPICS.map((topic) => {
        const stats = getStats(topic.id)

        return (
          <SelectionItem
            key={topic.id}
            value={topic.id}
            variant="accent"
            className="p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-heading font-semibold text-surface-100">{topic.name}</h3>
              {stats.totalAttempts > 0 && (
                <Badge variant={MASTERY_VARIANTS[stats.masteryLevel]} size="sm">
                  {MASTERY_LABELS[stats.masteryLevel]}
                </Badge>
              )}
            </div>
            <p className="text-sm text-surface-400 mb-3">{topic.description}</p>

            {stats.totalAttempts > 0 ? (
              <div className="text-xs text-surface-500 space-y-1">
                <div className="flex justify-between">
                  <span>Completed</span>
                  <span className="font-medium text-surface-300 font-mono">
                    {stats.totalCompleted} / {stats.totalAttempts}
                  </span>
                </div>
                {stats.lastPracticed && (
                  <div className="flex justify-between">
                    <span>Last practiced</span>
                    <span className="font-medium text-surface-300">
                      {new Date(stats.lastPracticed).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-surface-500 italic">
                Not practiced yet
              </div>
            )}
          </SelectionItem>
        )
      })}
    </SelectionGroup>
  )
}
