import { useState, useCallback } from 'react'
import type { FillInBlankStep as FillInBlankStepType } from '@/types'
import { Button } from '@/components/ui'

interface FillInBlankStepProps {
  step: FillInBlankStepType
  isComplete: boolean
  onComplete: () => void
  onHintUsed: () => void
}

export function FillInBlankStep({
  step,
  isComplete,
  onComplete,
  onHintUsed,
}: FillInBlankStepProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [results, setResults] = useState<Record<string, boolean>>({})
  const [showResults, setShowResults] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(-1)

  const handleInputChange = useCallback((blankId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [blankId]: value }))
    setShowResults(false)
  }, [])

  const checkAnswers = useCallback(() => {
    const newResults: Record<string, boolean> = {}
    let allCorrect = true

    for (const blank of step.blanks) {
      const userAnswer = answers[blank.id]?.trim() || ''
      const isCorrect = blank.correctAnswers.some(correct =>
        blank.caseSensitive
          ? userAnswer === correct
          : userAnswer.toLowerCase() === correct.toLowerCase()
      )
      newResults[blank.id] = isCorrect
      if (!isCorrect) allCorrect = false
    }

    setResults(newResults)
    setShowResults(true)

    if (allCorrect && !isComplete) {
      onComplete()
    }
  }, [answers, step.blanks, isComplete, onComplete])

  const showHint = useCallback(() => {
    if (currentHintIndex < step.hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1)
      onHintUsed()
    }
  }, [currentHintIndex, step.hints.length, onHintUsed])

  const resetAnswers = useCallback(() => {
    setAnswers({})
    setResults({})
    setShowResults(false)
    setCurrentHintIndex(-1)
  }, [])

  // Render the code template with input fields
  const renderTemplate = () => {
    let template = step.codeTemplate
    const parts: React.ReactNode[] = []
    let lastIndex = 0
    let keyIndex = 0

    // Find all {{BLANK_X}} placeholders
    const regex = /\{\{(\w+)\}\}/g
    let match

    while ((match = regex.exec(template)) !== null) {
      // Add text before the placeholder
      if (match.index > lastIndex) {
        parts.push(
          <span key={keyIndex++}>
            {template.slice(lastIndex, match.index)}
          </span>
        )
      }

      // Find the blank definition
      const blankId = match[1]
      const blank = step.blanks.find(b => b.id === blankId)

      if (blank) {
        const value = answers[blankId] || ''
        const isChecked = showResults
        const isCorrect = results[blankId]

        parts.push(
          <span key={keyIndex++} className="inline-block relative">
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(blankId, e.target.value)}
              placeholder={blank.placeholder}
              className={`
                w-24 px-2 py-1 mx-1 text-center font-mono text-sm rounded-md border-2
                focus:outline-none focus:ring-2 focus:ring-accent-500/50
                placeholder:text-surface-500
                ${isChecked
                  ? isCorrect
                    ? 'border-success-500 bg-success-500/10 text-success-300'
                    : 'border-danger-500 bg-danger-500/10 text-danger-300 animate-shake'
                  : 'border-surface-600 bg-surface-800/50 text-surface-200'
                }
              `}
              disabled={isComplete}
            />
            {isChecked && !isCorrect && blank.hint && (
              <span className="absolute left-0 top-full mt-1 text-xs text-danger-400 whitespace-nowrap">
                {blank.hint}
              </span>
            )}
          </span>
        )
      }

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < template.length) {
      parts.push(
        <span key={keyIndex++}>
          {template.slice(lastIndex)}
        </span>
      )
    }

    return parts
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-lg">
          <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="text-sm font-medium text-primary-400">Fill in the Blanks</span>
        </div>
        {isComplete && (
          <span className="ml-auto text-success-400 text-sm font-medium flex items-center gap-1.5 px-3 py-1 bg-success-500/10 border border-success-500/20 rounded-lg">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Completed
          </span>
        )}
      </div>

      {/* Instructions */}
      <div className="mb-6 p-4 bg-primary-500/10 rounded-lg border border-primary-500/20">
        <p className="text-surface-200">{step.instructions}</p>
      </div>

      {/* Code Template */}
      <div className="bg-surface-900 rounded-lg p-4 mb-6 border border-surface-700/50">
        <pre className="font-mono text-sm text-surface-200 whitespace-pre-wrap">
          {renderTemplate()}
        </pre>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="success" onClick={checkAnswers} disabled={isComplete}>
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Check Answers
        </Button>

        <Button variant="outline" onClick={resetAnswers} disabled={isComplete}>
          Reset
        </Button>

        {step.hints.length > 0 && currentHintIndex < step.hints.length - 1 && (
          <Button variant="ghost" onClick={showHint}>
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Hint
          </Button>
        )}
      </div>

      {/* Hints */}
      {currentHintIndex >= 0 && (
        <div className="space-y-2">
          {step.hints.slice(0, currentHintIndex + 1).map((hint, i) => (
            <div
              key={i}
              className="p-3 bg-gold-500/10 border border-gold-500/30 rounded-lg text-sm text-gold-300 animate-slide-up"
            >
              <span className="font-medium">Hint {i + 1}:</span> {hint}
            </div>
          ))}
        </div>
      )}

      {/* Success Message */}
      {isComplete && (
        <div className="p-4 bg-success-500/10 border border-success-500/30 rounded-lg animate-pop">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-success-300">All blanks filled correctly!</span>
          </div>
        </div>
      )}
    </div>
  )
}
