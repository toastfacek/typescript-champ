import { useState, useCallback, useEffect } from 'react'
import type { CodeExerciseStep as CodeExerciseStepType, Lesson } from '@/types'
import { Button } from '@/components/ui'
import { LazyCodeEditor, OutputPanel } from '@/components/editor'
import { runTypeScriptCode, runWithTests } from '@/lib/typescript-runner'
import { runPythonCode, runWithTests as runPythonWithTests } from '@/lib/python-runner'

interface CodeExerciseStepProps {
  step: CodeExerciseStepType
  lesson?: Lesson
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
  lesson,
  isComplete,
  onComplete,
  onHintUsed,
}: CodeExerciseStepProps) {
  const [code, setCode] = useState(step.starterCode)
  const [output, setOutput] = useState<OutputLine[]>([])
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [currentHintIndex, setCurrentHintIndex] = useState(-1)
  const [showSolution, setShowSolution] = useState(false)

  const language = lesson?.language || 'typescript'
  const isPython = language === 'python'

  // Reset code when step changes (e.g., new exercise in practice mode)
  useEffect(() => {
    setCode(step.starterCode)
    setOutput([])
    setTestResults([])
    setCurrentHintIndex(-1)
    setShowSolution(false)
  }, [step.id, step.starterCode])

  // Execute code and show console output (no tests)
  const executeCode = useCallback(async () => {
    setIsRunning(true)
    setOutput([])
    setTestResults([]) // Clear test results when just running code

    try {
      const result = isPython ? await runPythonCode(code) : await runTypeScriptCode(code)

      const outputLogs: OutputLine[] = (result.logs || []).map((log) => ({
        type: 'log' as const,
        content: log,
      }))

      // Check for type errors (TypeScript only)
      if (!isPython && 'typeErrors' in result && (result as { typeErrors?: string }).typeErrors) {
        outputLogs.push({
          type: 'error',
          content: (result as { typeErrors: string }).typeErrors,
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

      // If code ran successfully but has no output, show a success message
      if (outputLogs.length === 0) {
        outputLogs.push({
          type: 'success',
          content: 'Code executed successfully! (No output to display)',
        })
      }

      setOutput(outputLogs)
    } catch (err) {
      setOutput([{
        type: 'error',
        content: `Execution error: ${err instanceof Error ? err.message : String(err)}`
      }])
    }

    setIsRunning(false)
  }, [code, isPython])

  // Run test assertions
  const runTests = useCallback(async () => {
    setIsRunningTests(true)
    // Keep output visible, but clear test results
    setTestResults([])

    try {
      // First check if code compiles/runs (TypeScript only)
      if (!isPython) {
        const compileCheck = await runTypeScriptCode(code)
        
        if (compileCheck.typeErrors) {
          setTestResults([{
            id: 'compile-error',
            description: 'Code has type errors',
            passed: false,
            error: compileCheck.typeErrors,
          }])
          setIsRunningTests(false)
          return
        }

        if (!compileCheck.success) {
          setTestResults([{
            id: 'runtime-error',
            description: 'Code has runtime errors',
            passed: false,
            error: compileCheck.error || 'Unknown error',
          }])
          setIsRunningTests(false)
          return
        }
      }

      // Run tests
      const results: TestResult[] = []
      for (const test of step.testCases) {
        const testResult = isPython 
          ? await runPythonWithTests(code, test.testCode)
          : await runWithTests(code, test.testCode)
        
        // Check for type errors in test (TypeScript only)
        if (!isPython && 'typeErrors' in testResult && (testResult as { typeErrors?: string }).typeErrors) {
          results.push({
            id: test.id,
            description: test.description,
            passed: false,
            error: (testResult as { typeErrors: string }).typeErrors,
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

      setTestResults(results)

      // Check if all tests passed - only complete on test success
      const allPassed = results.every((r) => r.passed)
      if (allPassed) {
        setOutput((prev) => [...prev, { type: 'success', content: 'All tests passed! ✓' }])
        if (!isComplete) {
          onComplete()
        }
      }
    } catch (err) {
      setTestResults([{
        id: 'test-error',
        description: 'Test execution failed',
        passed: false,
        error: `Execution error: ${err instanceof Error ? err.message : String(err)}`
      }])
    }

    setIsRunningTests(false)
  }, [code, step.testCases, isComplete, onComplete, isPython])

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
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-accent-500/10 border border-accent-500/20 rounded-lg">
          <svg className="w-4 h-4 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span className="text-sm font-medium text-accent-400">Code Exercise</span>
        </div>
        {isComplete && (
          <span className="ml-auto text-success-400 text-sm font-medium flex items-center gap-1 px-3 py-1.5 bg-success-500/10 border border-success-500/20 rounded-lg">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Completed
          </span>
        )}
      </div>

      {/* Instructions */}
      <div className="mb-4 p-4 bg-surface-800/50 rounded-xl border border-surface-700/50">
        <p className="text-surface-300 leading-relaxed">{step.instructions}</p>
      </div>

      {/* Code Editor */}
      <div className="mb-4 rounded-xl overflow-hidden border border-surface-700/50">
        <LazyCodeEditor
          code={code}
          onChange={setCode}
          height="200px"
          language={language}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mb-4">
        <Button
          variant="primary"
          onClick={executeCode}
          isLoading={isRunning}
          disabled={isRunning || isRunningTests}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Run
        </Button>

        <Button
          variant="success"
          onClick={runTests}
          isLoading={isRunningTests}
          disabled={isRunning || isRunningTests}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Check Solution
        </Button>

        <Button variant="outline" onClick={resetCode} disabled={isRunning || isRunningTests}>
          Reset
        </Button>

        {step.hints.length > 0 && currentHintIndex < step.hints.length - 1 && (
          <Button 
            variant="ghost" 
            onClick={showHint}
            disabled={isRunning || isRunningTests}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Hint
          </Button>
        )}

        {!showSolution && !isComplete && (
          <Button 
            variant="ghost" 
            onClick={revealSolution} 
            className="ml-auto"
            disabled={isRunning || isRunningTests}
          >
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
              className="p-4 bg-gold-500/10 border border-gold-500/20 rounded-xl text-sm text-gold-300 animate-slide-up"
            >
              <span className="font-semibold text-gold-400">Hint {i + 1}:</span> {hint}
            </div>
          ))}
        </div>
      )}

      {/* Output Panel */}
      <OutputPanel output={output} isRunning={isRunning || isRunningTests} className="mb-4" />

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-surface-400">Test Results</h4>
          {testResults.map((result) => (
            <div
              key={result.id}
              className={`p-4 rounded-xl flex items-start gap-3 ${
                result.passed
                  ? 'bg-success-500/10 border border-success-500/20'
                  : 'bg-danger-500/10 border border-danger-500/20'
              }`}
            >
              {result.passed ? (
                <div className="w-6 h-6 rounded-full bg-success-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-success-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-danger-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-danger-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium ${result.passed ? 'text-success-400' : 'text-danger-400'}`}>
                  {result.description}
                </span>
                {result.error && (
                  <p className="text-xs text-danger-400/80 mt-1 font-mono">{result.error}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
