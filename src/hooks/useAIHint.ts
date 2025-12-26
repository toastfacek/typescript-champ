import { useState, useCallback, useEffect, useRef } from 'react'
import { generateAIHint } from '@/services/api-client'
import type { TestCase } from '@/types/lesson'

interface UseAIHintParams {
  stepId: string
  instructions: string
  starterCode: string
  currentCode: string
  testCases: TestCase[]
  language: 'typescript' | 'python'
  concept?: { id: string; name: string; description: string }
}

export function useAIHint({
  stepId,
  instructions,
  starterCode,
  currentCode,
  testCases,
  language,
  concept
}: UseAIHintParams) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hint, setHint] = useState<string | null>(null)
  const [hasUsedHint, setHasUsedHint] = useState(false)
  
  // Track which step we've used hint for
  const usedHintForStepRef = useRef<string | null>(null)

  // Reset when step changes
  useEffect(() => {
    if (usedHintForStepRef.current !== stepId) {
      setHint(null)
      setError(null)
      setHasUsedHint(false)
      usedHintForStepRef.current = null
    }
  }, [stepId])

  const requestHint = useCallback(async () => {
    // Prevent multiple requests
    if (isLoading || hasUsedHint) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await generateAIHint({
        instructions,
        starterCode,
        currentCode,
        testCases,
        language,
        concept
      })

      if (result.success && result.hint) {
        setHint(result.hint)
        setHasUsedHint(true)
        usedHintForStepRef.current = stepId
      } else {
        setError(result.error || 'Failed to generate hint')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate hint')
    } finally {
      setIsLoading(false)
    }
  }, [instructions, starterCode, currentCode, testCases, language, concept, stepId, isLoading, hasUsedHint])

  const reset = useCallback(() => {
    setHint(null)
    setError(null)
    setHasUsedHint(false)
    usedHintForStepRef.current = null
  }, [])

  return {
    isLoading,
    error,
    hint,
    hasUsedHint,
    requestHint,
    reset
  }
}

