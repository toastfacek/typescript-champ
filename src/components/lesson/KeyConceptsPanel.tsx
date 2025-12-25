import { useState } from 'react'
import type { KeyConcept } from '@/types'
import { Card } from '@/components/ui'

interface KeyConceptsPanelProps {
  concepts: KeyConcept[]
}

export function KeyConceptsPanel({ concepts }: KeyConceptsPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedConcepts, setExpandedConcepts] = useState<Set<string>>(new Set())

  const toggleConcept = (conceptId: string) => {
    setExpandedConcepts((prev) => {
      const next = new Set(prev)
      if (next.has(conceptId)) {
        next.delete(conceptId)
      } else {
        next.add(conceptId)
      }
      return next
    })
  }

  if (concepts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-surface-900/90 backdrop-blur-xl border border-surface-600/50 rounded-xl text-surface-200 hover:border-accent-500/50 hover:bg-surface-800/90 transition-all duration-200 shadow-lg hover:shadow-glow-sm group"
        >
          <svg
            className="w-5 h-5 text-accent-400 group-hover:text-accent-300 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <span className="font-medium">Key Concepts</span>
          <span className="px-2 py-0.5 bg-accent-500/10 border border-accent-500/20 text-accent-400 rounded-lg text-xs font-semibold">
            {concepts.length}
          </span>
        </button>
      ) : (
        <Card variant="glass" padding="md" className="max-h-[80vh] overflow-hidden flex flex-col shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="font-semibold text-surface-100">Key Concepts</h3>
              <span className="px-2 py-0.5 bg-accent-500/10 border border-accent-500/20 text-accent-400 rounded-lg text-xs font-semibold">
                {concepts.length}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-surface-400 hover:text-surface-200 transition-colors p-1 hover:bg-surface-800 rounded"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto space-y-2 pr-2 -mr-2">
            {concepts.map((concept) => {
              const isExpanded = expandedConcepts.has(concept.id)
              return (
                <div
                  key={concept.id}
                  className="border border-surface-700/50 rounded-lg overflow-hidden bg-surface-900/30"
                >
                  <button
                    onClick={() => toggleConcept(concept.id)}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-surface-800/50 transition-colors"
                  >
                    <span className="font-medium text-surface-200">{concept.term}</span>
                    <svg
                      className={`w-4 h-4 text-surface-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <div className="px-3 pb-3 space-y-3 border-t border-surface-700/50 pt-3">
                      <p className="text-sm text-surface-300 leading-relaxed">{concept.definition}</p>

                      {concept.syntax && (
                        <div className="bg-surface-900/80 rounded-lg p-3 border border-surface-700/50">
                          <div className="text-xs text-surface-500 mb-1 font-medium">Syntax</div>
                          <code className="text-sm text-accent-300 font-mono">{concept.syntax}</code>
                        </div>
                      )}

                      {concept.example && (
                        <div className="space-y-2">
                          <div className="text-xs text-surface-500 font-medium">Example</div>
                          <div className="bg-surface-900 rounded-lg overflow-hidden border border-surface-700/50">
                            <div className="px-3 py-2 bg-surface-800/80 border-b border-surface-700/50">
                              <span className="text-xs text-surface-500 font-mono">TypeScript</span>
                            </div>
                            <pre className="p-3 overflow-x-auto">
                              <code className="text-sm font-mono text-surface-200">{concept.example.code}</code>
                            </pre>
                          </div>
                          <p className="text-xs text-surface-400 italic">{concept.example.explanation}</p>
                        </div>
                      )}

                      {concept.whyItMatters && (
                        <div className="bg-accent-500/10 border border-accent-500/20 rounded-lg p-3">
                          <div className="text-xs text-accent-400 font-semibold mb-1 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            Why it matters
                          </div>
                          <p className="text-xs text-surface-300 leading-relaxed">{concept.whyItMatters}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </Card>
      )}
    </div>
  )
}
