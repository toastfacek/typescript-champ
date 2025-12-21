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
    description: 'All types randomly'
  },
  {
    id: 'code-exercise',
    name: 'Code',
    icon: '💻',
    description: 'Write complete code'
  },
  {
    id: 'fill-in-blank',
    name: 'Fill Blanks',
    icon: '📝',
    description: 'Complete the code'
  },
  {
    id: 'quiz',
    name: 'Quiz',
    icon: '❓',
    description: 'Multiple choice'
  }
]

export function ExerciseTypeSelector({ selected, onChange }: ExerciseTypeSelectorProps) {
  return (
    <div className="flex gap-2">
      {EXERCISE_TYPES.map((type) => {
        const isSelected = selected === type.id
        return (
          <button
            key={type.id}
            onClick={() => onChange(type.id)}
            className={`flex-1 p-3 rounded-lg border-2 transition-all text-center ${
              isSelected
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            <div className="text-2xl mb-1">{type.icon}</div>
            <div className="font-medium text-sm">{type.name}</div>
            <div className="text-xs opacity-75">{type.description}</div>
          </button>
        )
      })}
    </div>
  )
}
