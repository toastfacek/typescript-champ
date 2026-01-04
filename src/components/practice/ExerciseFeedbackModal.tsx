import { Modal, Button } from '@/components/ui'

export interface TestResult {
  id: string
  description: string
  passed: boolean
  error?: string
}

interface ExerciseFeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  testResults: TestResult[]
  mode: 'practice' | 'drill'
  xpEarned?: number
  onNextExercise: () => void | Promise<void>
  onRetry: () => void
  isLoadingNext?: boolean
}

export function ExerciseFeedbackModal({
  isOpen,
  onClose,
  testResults,
  mode,
  xpEarned,
  onNextExercise,
  onRetry,
  isLoadingNext = false,
}: ExerciseFeedbackModalProps) {
  const allPassed = testResults.every((r) => r.passed)
  const isDrill = mode === 'drill'

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Body>
        {allPassed ? (
          // Success Feedback
          <div className="text-center py-4">
            {/* Checkmark Animation */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-success-500/20 border-2 border-success-500 flex items-center justify-center animate-pop">
                <svg
                  className="w-12 h-12 text-success-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-heading font-bold text-success-300 mb-2">
              Correct!
            </h3>

            {/* XP Display */}
            {xpEarned && (
              <div className="mb-4">
                <span className="text-accent-400 text-lg font-semibold">
                  +{xpEarned} XP
                </span>
              </div>
            )}

            {/* Test Results (for practice mode) */}
            {!isDrill && testResults.length > 0 && (
              <div className="mt-6 space-y-2 text-left">
                <p className="text-sm text-surface-400 mb-3">All tests passed:</p>
                {testResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-2 p-2 bg-success-500/10 border border-success-500/20 rounded-lg"
                  >
                    <svg
                      className="w-4 h-4 text-success-400 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-success-300">
                      {result.description}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Failure Feedback
          <div className="py-4">
            {/* Error Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-danger-500/20 border-2 border-danger-500 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-danger-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-heading font-bold text-danger-300 mb-4 text-center">
              Not quite right
            </h3>

            {/* Failed Tests */}
            <div className="space-y-3">
              {testResults.map((result) => (
                <div
                  key={result.id}
                  className={`p-3 rounded-lg border ${
                    result.passed
                      ? 'bg-success-500/10 border-success-500/20'
                      : 'bg-danger-500/10 border-danger-500/20'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {result.passed ? (
                      <svg
                        className="w-5 h-5 text-success-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-danger-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          result.passed ? 'text-success-300' : 'text-danger-300'
                        }`}
                      >
                        {result.description}
                      </p>
                      {result.error && !result.passed && (
                        <p className="text-xs text-danger-400/80 mt-1 font-mono">
                          {result.error}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        {allPassed ? (
          <Button
            size="lg"
            onClick={onNextExercise}
            className="w-full"
            glow
            isLoading={isLoadingNext}
            disabled={isLoadingNext}
          >
            {isLoadingNext ? 'Loading...' : 'Next Exercise'}
          </Button>
        ) : (
          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              onClick={onRetry}
              className="flex-1"
            >
              Try Again
            </Button>
            <Button
              variant="primary"
              onClick={onClose}
              className="flex-1"
            >
              Keep Editing
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  )
}
