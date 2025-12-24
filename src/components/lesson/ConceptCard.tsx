import { useNavigate } from 'react-router-dom'
import { Button, Card } from '@/components/ui'
import type { Concept } from '@/types/focused-practice'
import { usePracticeStore } from '@/store/practice-store'

interface ConceptCardProps {
  concept: Concept
  lessonId: string
}

export function ConceptCard({ concept, lessonId }: ConceptCardProps) {
  const navigate = useNavigate()
  const getConceptProgress = usePracticeStore((s) => s.getConceptProgress)
  const progress = getConceptProgress(concept.id)

  const handlePractice = () => {
    // Pass concept data via state for better UX
    navigate(`/practice/focused/${concept.id}?lessonId=${lessonId}`, {
      state: { concept }
    })
  }

  return (
    <Card className="p-4 border border-surface-700/50 hover:border-accent-500/50 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-surface-100 mb-1">
            {concept.name}
          </h3>
          <p className="text-sm text-surface-400">
            {concept.description}
          </p>
        </div>
      </div>

      {progress && (
        <div className="text-xs text-surface-500 mb-3">
          <div className="flex justify-between">
            <span>Sessions completed</span>
            <span className="font-medium text-surface-300">{progress.sessionsCompleted}</span>
          </div>
        </div>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={handlePractice}
        className="w-full"
      >
        Practice This Concept
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </Button>
    </Card>
  )
}

