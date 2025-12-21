import type { PracticeDifficulty } from '@/types/practice'

interface DifficultyPickerProps {
  selected: PracticeDifficulty
  onChange: (difficulty: PracticeDifficulty) => void
}

const DIFFICULTIES: Array<{
  id: PracticeDifficulty
  name: string
  description: string
  color: string
  selectedColor: string
}> = [
  {
    id: 'easy',
    name: 'Easy',
    description: 'Single concepts, clear steps',
    color: 'border-green-200 bg-green-50 text-green-700',
    selectedColor: 'border-green-500 bg-green-100 ring-2 ring-green-500'
  },
  {
    id: 'medium',
    name: 'Medium',
    description: 'Combine 2-3 concepts',
    color: 'border-yellow-200 bg-yellow-50 text-yellow-700',
    selectedColor: 'border-yellow-500 bg-yellow-100 ring-2 ring-yellow-500'
  },
  {
    id: 'hard',
    name: 'Hard',
    description: 'Complex scenarios, edge cases',
    color: 'border-red-200 bg-red-50 text-red-700',
    selectedColor: 'border-red-500 bg-red-100 ring-2 ring-red-500'
  }
]

export function DifficultyPicker({ selected, onChange }: DifficultyPickerProps) {
  return (
    <div className="flex gap-3">
      {DIFFICULTIES.map((diff) => {
        const isSelected = selected === diff.id
        return (
          <button
            key={diff.id}
            onClick={() => onChange(diff.id)}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              isSelected ? diff.selectedColor : diff.color
            } hover:scale-[1.02]`}
          >
            <div className="font-semibold text-lg">{diff.name}</div>
            <div className="text-sm opacity-75">{diff.description}</div>
          </button>
        )
      })}
    </div>
  )
}
