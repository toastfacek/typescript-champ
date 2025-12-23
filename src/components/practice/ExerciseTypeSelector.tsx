import { SelectionGroup, SelectionItem } from '@/components/ui'

interface ExerciseTypeSelectorProps {
  selected: 'code-exercise' | 'fill-in-blank' | 'quiz' | 'mixed'
  onChange: (type: 'code-exercise' | 'fill-in-blank' | 'quiz' | 'mixed') => void
}

const EXERCISE_TYPES: Array<{
  id: 'code-exercise' | 'fill-in-blank' | 'quiz' | 'mixed'
  name: string
  icon: string
  description: string
}> = [
  {
    id: 'mixed',
    name: 'Mixed',
    icon: '🎲',
    description: 'All types randomly',
  },
  {
    id: 'code-exercise',
    name: 'Code',
    icon: '💻',
    description: 'Write complete code',
  },
  {
    id: 'fill-in-blank',
    name: 'Fill Blanks',
    icon: '📝',
    description: 'Complete the code',
  },
  {
    id: 'quiz',
    name: 'Quiz',
    icon: '❓',
    description: 'Multiple choice',
  },
]

export function ExerciseTypeSelector({ selected, onChange }: ExerciseTypeSelectorProps) {
  return (
    <SelectionGroup
      value={selected}
      onChange={(value) => onChange(value as typeof selected)}
      layout="flex"
      gap="md"
    >
      {EXERCISE_TYPES.map((type) => (
        <SelectionItem
          key={type.id}
          value={type.id}
          variant="accent"
          icon={<div className="text-2xl">{type.icon}</div>}
          className="text-center"
        >
          <div className="font-medium text-sm">{type.name}</div>
          <div className="text-xs opacity-75 mt-1">{type.description}</div>
        </SelectionItem>
      ))}
    </SelectionGroup>
  )
}
