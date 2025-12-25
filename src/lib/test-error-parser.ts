/**
 * Test error parsing utilities
 * Extracts expected and actual values from test errors and test code
 */

export interface ParsedTestError {
  expected?: string
  actual?: string
  message: string
}

/**
 * Parse TypeScript test error to extract expected/actual values
 * Handles patterns like: if (greet("World") !== "Hello, World!") throw new Error('...')
 */
export function parseTypeScriptTestError(
  error: string,
  testCode: string
): ParsedTestError {
  // Try to extract expected value from test code pattern: if (actual !== expected) throw new Error('...')
  // Pattern: if (greet("World") !== "Hello, World!") throw new Error('...')
  const comparisonMatch = testCode.match(
    /if\s*\(\s*[^!]+?\s*[!=]==\s*(["'][^"']+["']|[\d.]+|true|false|null|undefined)\s*\)\s*throw\s+new\s+Error\(['"]([^'"]+)['"]\)/
  )
  
  let expectedValue: string | undefined = undefined
  let errorMsg: string | undefined = undefined
  
  if (comparisonMatch) {
    const [, expectedExpr, msg] = comparisonMatch
    errorMsg = msg
    
    // Extract expected value, removing quotes if it's a string
    if (expectedExpr.startsWith('"') || expectedExpr.startsWith("'")) {
      expectedValue = expectedExpr.slice(1, -1)
    } else {
      expectedValue = expectedExpr.trim()
    }
  }
  
  // Try to extract from error message pattern: "greet("World") should return "Hello, World!""
  const functionCallMatch = error.match(/(\w+)\([^)]+\)\s+(?:should\s+)?(?:return|be)\s+["']([^"']+)["']/)
  if (functionCallMatch) {
    const expectedFromError = functionCallMatch[2]
    if (!expectedValue) {
      expectedValue = expectedFromError
    }
  }
  
  // Try to find actual value in error message
  // Pattern: "returned "Hello, World"" or "is "Hello, World""
  const actualMatch = error.match(/(?:returned|is)\s+["']([^"']+)["']/)
  const actualValue = actualMatch ? actualMatch[1] : undefined
  
  if (expectedValue || actualValue) {
    return {
      expected: expectedValue,
      actual: actualValue,
      message: errorMsg || error,
    }
  }
  
  // Try to parse error message patterns
  // Pattern: "greet("World") should return "Hello, World!""
  const shouldReturnMatch = error.match(/(\w+)\([^)]+\)\s+should\s+return\s+["']([^"']+)["']/)
  if (shouldReturnMatch) {
    return {
      expected: shouldReturnMatch[2],
      message: error,
    }
  }
  
  // Pattern: "should be "value""
  const shouldBeMatch = error.match(/should\s+be\s+["']([^"']+)["']/)
  if (shouldBeMatch) {
    return {
      expected: shouldBeMatch[1],
      message: error,
    }
  }
  
  // Pattern: "Expected: X, Actual: Y"
  const expectedActualMatch = error.match(/Expected:\s*["']?([^"',]+)["']?\s*,\s*Actual:\s*["']?([^"',]+)["']?/i)
  if (expectedActualMatch) {
    return {
      expected: expectedActualMatch[1].trim(),
      actual: expectedActualMatch[2].trim(),
      message: error,
    }
  }
  
  return {
    message: error,
  }
}

/**
 * Parse Python test error to extract expected/actual values
 * Handles patterns like: assert greeting == "Welcome to Python!"
 */
export function parsePythonTestError(
  error: string,
  testCode: string
): ParsedTestError {
  // Try to extract from assert statement: assert actual == expected, 'message'
  const assertMatch = testCode.match(/assert\s+([^=!<>]+)\s*([!=<>]+)\s*([^,]+)(?:,\s*['"]([^'"]+)['"])?/)
  
  if (assertMatch) {
    const [, leftExpr, , rightExpr, customMsg] = assertMatch
    
    // Try to extract from AssertionError message
    const assertionErrorMatch = error.match(/AssertionError:\s*(.+)/)
    if (assertionErrorMatch) {
      const msg = assertionErrorMatch[1].trim()
      
      // Try to extract expected/actual from message
      const expectedMatch = msg.match(/expected\s+["']([^"']+)["']/i)
      const actualMatch = msg.match(/got\s+["']([^"']+)["']/i) || msg.match(/actual\s+["']([^"']+)["']/i)
      
      return {
        expected: expectedMatch ? expectedMatch[1] : rightExpr.trim().replace(/['"]/g, ''),
        actual: actualMatch ? actualMatch[1] : undefined,
        message: customMsg || msg || error,
      }
    }
    
    return {
      expected: rightExpr.trim().replace(/['"]/g, ''),
      actual: leftExpr.trim(),
      message: customMsg || error,
    }
  }
  
  // Try to parse AssertionError message directly
  if (error.includes('AssertionError')) {
    const assertionErrorMatch = error.match(/AssertionError:\s*(.+)/)
    if (assertionErrorMatch) {
      const msg = assertionErrorMatch[1].trim()
      
      // Pattern: "greeting should be "Welcome to Python!""
      const shouldBeMatch = msg.match(/should\s+be\s+["']([^"']+)["']/)
      if (shouldBeMatch) {
        return {
          expected: shouldBeMatch[1],
          message: msg,
        }
      }
      
      return {
        message: msg,
      }
    }
  }
  
  return {
    message: error,
  }
}

/**
 * Generic test error parser that tries both TypeScript and Python patterns
 */
export function parseTestError(
  error: string,
  testCode: string,
  language: 'typescript' | 'python' = 'typescript'
): ParsedTestError {
  if (language === 'python') {
    return parsePythonTestError(error, testCode)
  }
  return parseTypeScriptTestError(error, testCode)
}

/**
 * Enhanced error parser that also tries to extract values from runtime execution
 * This is called after test execution fails to capture actual values
 */
export function enhanceErrorWithRuntimeInfo(
  parsedError: ParsedTestError,
  testCode: string,
  language: 'typescript' | 'python' = 'typescript'
): ParsedTestError {
  // Try to extract function call and expected value from test code
  // Pattern: if (greet("World") !== "Hello, World!") throw new Error('...')
  if (language === 'typescript') {
    const functionCallMatch = testCode.match(/(\w+)\([^)]+\)/)
    if (functionCallMatch && !parsedError.actual) {
      // We can't get the actual value here, but we can note what function was called
      // The actual value should be captured during test execution
      return parsedError
    }
  }
  
  return parsedError
}

