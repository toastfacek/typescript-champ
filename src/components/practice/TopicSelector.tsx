import { SelectionGroup, SelectionItem, Badge } from '@/components/ui'
import type { PracticeTopic, MasteryLevel } from '@/types/practice'
import { usePracticeStore } from '@/store/practice-store'
import { getTopics } from '@/constants/practice-topics'

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
  language?: 'typescript' | 'python'
}

export function TopicSelector({ selectedTopic, onSelectTopic, language = 'typescript' }: TopicSelectorProps) {
  const getStats = usePracticeStore((s) => s.getStats)
  const topics = getTopics(language)

  return (
    <SelectionGroup
      value={selectedTopic || null}
      onChange={(value) => onSelectTopic(value as PracticeTopic)}
      layout="grid"
      columns={3}
      gap="md"
    >
      {topics.map((topic) => {
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
