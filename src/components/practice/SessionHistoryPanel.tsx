import { useCallback } from 'react'
import { Button, Card, Badge } from '@/components/ui'
import { usePracticeStore } from '@/store/practice-store'
import type { StoredFocusedSession } from '@/types/focused-practice'

interface SessionHistoryPanelProps {
  lessonId: string
  onResume: (sessionId: string) => void
  onClose: () => void
}

export function SessionHistoryPanel({ lessonId, onResume, onClose }: SessionHistoryPanelProps) {
  const sessionHistory = usePracticeStore((s) => s.sessionHistory[lessonId] || [])
  const currentFocusedSession = usePracticeStore((s) => s.currentFocusedSession)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return 'Today'
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined })
    }
  }

  const getProgress = (session: StoredFocusedSession) => {
    const total = session.miniLesson.steps.length
    const completed = session.completedSteps.length
    return Math.round((completed / total) * 100)
  }

  if (sessionHistory.length === 0) {
    return (
      <Card variant="glass" padding="lg" className="max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-surface-100">Session History</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <p className="text-sm text-surface-400">No previous sessions found.</p>
      </Card>
    )
  }

  return (
    <Card variant="glass" padding="lg" className="max-w-md max-h-[600px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-100">Session History</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Button>
      </div>

      <div className="space-y-3">
        {sessionHistory.map((session) => {
          const isActive = currentFocusedSession?.id === session.id
          const progress = getProgress(session)

          return (
            <Card
              key={session.id}
              variant="default"
              padding="md"
              className={`cursor-pointer transition-all ${
                isActive ? 'border-accent-500 bg-accent-500/10' : 'hover:border-surface-600'
              }`}
              onClick={() => !isActive && onResume(session.id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={session.status === 'completed' ? 'success' : 'default'} size="sm">
                      {session.status === 'completed' ? 'Completed' : 'In Progress'}
                    </Badge>
                    {isActive && (
                      <Badge variant="default" size="sm">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-surface-300 mb-1">{formatDate(session.startedAt)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-2 bg-surface-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          session.status === 'completed' ? 'bg-success-500' : 'bg-accent-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-surface-400 whitespace-nowrap">
                      {session.completedSteps.length}/{session.miniLesson.steps.length}
                    </span>
                  </div>
                </div>
                {!isActive && (
                  <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onResume(session.id) }}>
                    Resume
                  </Button>
                )}
              </div>
            </Card>
          )
        })}
      </div>
    </Card>
  )
}

