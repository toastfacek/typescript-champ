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
      <div className="flex items-center gap-2 mb-4 text-indigo-600">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm font-medium">Quiz</span>
        {isComplete && (
          <span className="ml-auto text-success-500 text-sm font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Completed
          </span>
        )}
      </div>

      {/* Question */}
      <h3 className="text-lg font-medium text-gray-900 mb-4">{step.question}</h3>

      {/* Code Context */}
      {step.codeContext && (
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <pre className="font-mono text-sm text-gray-100 whitespace-pre-wrap">
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

          let borderClass = 'border-gray-200 hover:border-gray-300'
          let bgClass = 'bg-white hover:bg-gray-50'

          if (isSelected && !showCorrectness) {
            borderClass = 'border-primary-500'
            bgClass = 'bg-primary-50'
          } else if (showCorrectness) {
            if (isThisCorrect) {
              borderClass = 'border-green-500'
              bgClass = 'bg-green-50'
            } else if (isSelected && !isThisCorrect) {
              borderClass = 'border-red-500'
              bgClass = 'bg-red-50'
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
                      ? 'border-primary-500'
                      : showCorrectness && isThisCorrect
                      ? 'border-green-500 bg-green-500'
                      : showCorrectness && isSelected && !isThisCorrect
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300'
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
                    <div className="w-2 h-2 rounded-full bg-primary-500" />
                  )}
                </div>

                {/* Option Text */}
                <span
                  className={`
                    ${showCorrectness && isThisCorrect ? 'text-green-700 font-medium' : ''}
                    ${showCorrectness && isSelected && !isThisCorrect ? 'text-red-700' : ''}
                    ${!showCorrectness ? 'text-gray-700' : ''}
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
        >
          Submit Answer
        </Button>
      ) : !isCorrect ? (
        <Button variant="secondary" onClick={handleTryAgain} className="w-full">
          Try Again
        </Button>
      ) : null}

      {/* Explanation */}
      {showResult && (
        <div
          className={`
            mt-6 p-4 rounded-lg animate-slide-up
            ${isCorrect
              ? 'bg-green-50 border border-green-200'
              : 'bg-orange-50 border border-orange-200'
            }
          `}
        >
          <div className="flex items-start gap-2">
            {isCorrect ? (
              <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <div>
              <h4 className={`font-medium mb-1 ${isCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </h4>
              <p className={`text-sm ${isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
                {step.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
