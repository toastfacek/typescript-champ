import { useState, useCallback } from 'react'
import type { QuizStep as QuizStepType } from '@/types'
import { Button } from '@/components/ui'

interface QuizStepProps {
  step: QuizStepType
  isComplete: boolean
  onComplete: () => void
}

export function QuizStep({ step, isComplete, onComplete }: QuizStepProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const correctOption = step.options.find(o => o.isCorrect)
  const isCorrect = selectedOption === correctOption?.id

  const handleSelect = useCallback((optionId: string) => {
    if (!showResult) {
      setSelectedOption(optionId)
    }
  }, [showResult])

  const handleSubmit = useCallback(() => {
    if (selectedOption) {
      setShowResult(true)
      if (isCorrect && !isComplete) {
        onComplete()
      }
    }
  }, [selectedOption, isCorrect, isComplete, onComplete])

  const handleTryAgain = useCallback(() => {
    setSelectedOption(null)
    setShowResult(false)
  }, [])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-lg">
          <svg className="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm font-medium text-primary-400">Quiz</span>
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

      {/* Question */}
      <h3 className="text-xl font-heading font-semibold text-surface-50 mb-6">{step.question}</h3>

      {/* Code Context */}
      {step.codeContext && (
        <div className="bg-surface-900 rounded-lg p-4 mb-6 border border-surface-700/50">
          <pre className="font-mono text-sm text-surface-200 whitespace-pre-wrap">
            {step.codeContext}
          </pre>
        </div>
      )}

      {/* Options */}
      <div className="space-y-3 mb-6">
        {step.options.map((option) => {
          const isSelected = selectedOption === option.id
          const showCorrectness = showResult
          const isThisCorrect = option.isCorrect

          let borderClass = 'border-surface-700/50 hover:border-accent-500/50'
          let bgClass = 'bg-surface-800/30 hover:bg-surface-800/50'

          if (isSelected && !showCorrectness) {
            borderClass = 'border-accent-500'
            bgClass = 'bg-accent-500/10'
          } else if (showCorrectness) {
            if (isThisCorrect) {
              borderClass = 'border-success-500'
              bgClass = 'bg-success-500/10'
            } else if (isSelected && !isThisCorrect) {
              borderClass = 'border-danger-500'
              bgClass = 'bg-danger-500/10'
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={showResult}
              className={`
                w-full p-4 rounded-lg border-2 text-left transition-all
                ${borderClass} ${bgClass}
                ${showResult ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <div className="flex items-center gap-3">
                {/* Radio Circle */}
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                    ${isSelected && !showCorrectness
                      ? 'border-accent-500'
                      : showCorrectness && isThisCorrect
                      ? 'border-success-500 bg-success-500'
                      : showCorrectness && isSelected && !isThisCorrect
                      ? 'border-danger-500 bg-danger-500'
                      : 'border-surface-600'
                    }
                  `}
                >
                  {showCorrectness && isThisCorrect && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {showCorrectness && isSelected && !isThisCorrect && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {isSelected && !showCorrectness && (
                    <div className="w-2 h-2 rounded-full bg-accent-500" />
                  )}
                </div>

                {/* Option Text */}
                <span
                  className={`
                    ${showCorrectness && isThisCorrect ? 'text-success-300 font-medium' : ''}
                    ${showCorrectness && isSelected && !isThisCorrect ? 'text-danger-300' : ''}
                    ${!showCorrectness ? 'text-surface-200' : ''}
                  `}
                >
                  {option.text}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Action Button */}
      {!showResult ? (
        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full"
          glow
        >
          Submit Answer
        </Button>
      ) : !isCorrect ? (
        <Button variant="outline" onClick={handleTryAgain} className="w-full">
          Try Again
        </Button>
      ) : null}

      {/* Explanation */}
      {showResult && (
        <div
          className={`
            mt-6 p-4 rounded-lg animate-slide-up border
            ${isCorrect
              ? 'bg-success-500/10 border-success-500/30'
              : 'bg-gold-500/10 border-gold-500/30'
            }
          `}
        >
          <div className="flex items-start gap-3">
            {isCorrect ? (
              <svg className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <div>
              <h4 className={`font-heading font-semibold mb-2 ${isCorrect ? 'text-success-300' : 'text-gold-300'}`}>
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </h4>
              <p className={`text-sm leading-relaxed ${isCorrect ? 'text-success-300/80' : 'text-gold-300/80'}`}>
                {step.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
