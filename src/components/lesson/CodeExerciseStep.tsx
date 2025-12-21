import { useState, useCallback } from 'react'
import type { CodeExerciseStep as CodeExerciseStepType } from '@/types'
import { Button } from '@/components/ui'
import { CodeEditor, OutputPanel } from '@/components/editor'
import { runTypeScriptCode, runWithTests } from '@/lib/typescript-runner'

interface CodeExerciseStepProps {
  step: CodeExerciseStepType
  isComplete: boolean
  onComplete: () => void
  onHintUsed: () => void
}

interface TestResult {
  id: string
  description: string
  passed: boolean
  error?: string
}

interface OutputLine {
  type: 'log' | 'error' | 'info' | 'success'
  content: string
}

export function CodeExerciseStep({
  step,
  isComplete,
  onComplete,
  onHintUsed,
}: CodeExerciseStepProps) {
  const [code, setCode] = useState(step.starterCode)
  const [output, setOutput] = useState<OutputLine[]>([])
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(-1)
  const [showSolution, setShowSolution] = useState(false)

  const runCode = useCallback(async () => {
    setIsRunning(true)
    setOutput([])
    setTestResults([])

    try {
      // First, run the user's code to capture console output
      const result = await runTypeScriptCode(code)

      const outputLogs: OutputLine[] = (result.logs || []).map((log) => ({
        type: 'log' as const,
        content: log,
      }))

      // Check for type errors first
      if (result.typeErrors) {
        outputLogs.push({
          type: 'error',
          content: result.typeErrors,
        })
        outputLogs.push({
          type: 'info',
          content: 'Fix type errors before running tests.',
        })
        setOutput(outputLogs)
        setIsRunning(false)
        return
      }

      if (!result.success) {
        outputLogs.push({
          type: 'error',
          content: result.error || 'Unknown error',
        })
        setOutput(outputLogs)
        setIsRunning(false)
        return
      }

      // Run tests
      const results: TestResult[] = []
      for (const test of step.testCases) {
        const testResult = await runWithTests(code, test.testCode)
        
        // Check for type errors in test
        if (testResult.typeErrors) {
          results.push({
            id: test.id,
            description: test.description,
            passed: false,
            error: testResult.typeErrors,
          })
          continue
        }
        
        results.push({
          id: test.id,
          description: test.description,
          passed: testResult.passed,
          error: testResult.error || undefined,
        })
      }

      setOutput(outputLogs)
      setTestResults(results)

      // Check if all tests passed
      const allPassed = results.every((r) => r.passed)
      if (allPassed) {
        setOutput((prev) => [...prev, { type: 'success', content: 'All tests passed! ✓' }])
        if (!isComplete) {
          onComplete()
        }
      }
    } catch (err) {
      setOutput([{
        type: 'error',
        content: `Execution error: ${err instanceof Error ? err.message : String(err)}`
      }])
    }

    setIsRunning(false)
  }, [code, step.testCases, isComplete, onComplete])

  const showHint = useCallback(() => {
    if (currentHintIndex < step.hints.length - 1) {
      setCurrentHintIndex(prev => prev + 1)
      onHintUsed()
    }
  }, [currentHintIndex, step.hints.length, onHintUsed])

  const resetCode = useCallback(() => {
    setCode(step.starterCode)
    setOutput([])
    setTestResults([])
    setCurrentHintIndex(-1)
    setShowSolution(false)
  }, [step.starterCode])

  const revealSolution = useCallback(() => {
    setCode(step.solutionCode)
    setShowSolution(true)
    onHintUsed()
  }, [step.solutionCode, onHintUsed])

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-secondary-600">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
        <span className="text-sm font-medium">Code Exercise</span>
        {isComplete && (
          <span className="ml-auto text-success-500 text-sm font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Completed
          </span>
        )}
      </div>

      {/* Instructions */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-gray-700">{step.instructions}</p>
      </div>

      {/* Code Editor */}
      <CodeEditor
        code={code}
        onChange={setCode}
        height="200px"
        className="mb-4"
      />

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="success"
          onClick={runCode}
          isLoading={isRunning}
          disabled={isRunning}
        >
          <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Run Code
        </Button>

        <Button variant="outline" onClick={resetCode}>
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

        {!showSolution && !isComplete && (
          <Button variant="ghost" onClick={revealSolution} className="ml-auto text-gray-400">
            Show Solution
          </Button>
        )}
      </div>

      {/* Hints */}
      {currentHintIndex >= 0 && (
        <div className="mb-4 space-y-2">
          {step.hints.slice(0, currentHintIndex + 1).map((hint, i) => (
            <div
              key={i}
              className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800 animate-slide-up"
            >
              <span className="font-medium">Hint {i + 1}:</span> {hint}
            </div>
          ))}
        </div>
      )}

      {/* Output Panel */}
      <OutputPanel output={output} isRunning={isRunning} className="mb-4" />

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Test Results</h4>
          {testResults.map((result) => (
            <div
              key={result.id}
              className={`p-3 rounded-lg flex items-start gap-2 ${
                result.passed
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              {result.passed ? (
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <div>
                <span className={`text-sm ${result.passed ? 'text-green-700' : 'text-red-700'}`}>
                  {result.description}
                </span>
                {result.error && (
                  <p className="text-xs text-red-600 mt-1">{result.error}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
