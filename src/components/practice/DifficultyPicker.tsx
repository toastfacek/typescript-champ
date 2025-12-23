import { SelectionGroup, SelectionItem } from '@/components/ui'
import type { PracticeDifficulty } from '@/types/practice'

interface DifficultyPickerProps {
  selected: PracticeDifficulty
  onChange: (difficulty: PracticeDifficulty) => void
}

const DIFFICULTIES: Array<{
  id: PracticeDifficulty
  name: string
  description: string
  variant: 'success' | 'warning' | 'danger'
}> = [
  {
    id: 'easy',
    name: 'Easy',
    description: 'Single concepts, clear steps',
    variant: 'success',
  },
  {
    id: 'medium',
    name: 'Medium',
    description: 'Combine 2-3 concepts',
    variant: 'warning',
  },
  {
    id: 'hard',
    name: 'Hard',
    description: 'Complex scenarios, edge cases',
    variant: 'danger',
  },
]

export function DifficultyPicker({ selected, onChange }: DifficultyPickerProps) {
  return (
    <SelectionGroup
      value={selected}
      onChange={(value) => onChange(value as PracticeDifficulty)}
      layout="flex"
      gap="md"
    >
      {DIFFICULTIES.map((diff) => (
        <SelectionItem
          key={diff.id}
          value={diff.id}
          variant={diff.variant}
          className="flex-1"
        >
          <div className="font-heading font-semibold text-lg">{diff.name}</div>
          <div className="text-sm opacity-75 mt-1">{diff.description}</div>
        </SelectionItem>
      ))}
    </SelectionGroup>
  )
}
