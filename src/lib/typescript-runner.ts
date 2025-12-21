/**
 * TypeScript code execution using the TypeScript compiler in a Web Worker.
 * Provides real type checking and better error messages.
 */

import { compileTypeScript } from './typescript-worker-singleton'
import * as ts from 'typescript'

/**
 * Format TypeScript diagnostic message
 */
function formatDiagnostic(diagnostic: ts.Diagnostic): string {
  let messageText = ''
  if (typeof diagnostic.messageText === 'string') {
    messageText = diagnostic.messageText
  } else {
    messageText = diagnostic.messageText.messageText
  }
  return messageText
}

/**
 * Format TypeScript errors for display
 */
function formatTypeScriptErrors(diagnostics: ts.Diagnostic[]): string {
  const errors = diagnostics
    .filter(d => d.category === ts.DiagnosticCategory.Error)
    .map(formatDiagnostic)
  
  if (errors.length === 0) {
    return ''
  }
  
  if (errors.length === 1) {
    return `TypeScript error: ${errors[0]}`
  }
  
  return `TypeScript errors:\n${errors.map((e, i) => `${i + 1}. ${e}`).join('\n')}`
}

/**
 * Run TypeScript code and return the result
 */
export async function runTypeScriptCode(code: string): Promise<{
  success: boolean
  logs: string[]
  error: string | null
  typeErrors: string | null
}> {
  const logs: string[] = []
  const originalLog = console.log
  const originalError = console.error

  // Capture console.log
  console.log = (...args) => {
    logs.push(
      args
        .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
        .join(' ')
    )
  }

  console.error = (...args) => {
    logs.push(
      args
        .map((a) => (typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)))
        .join(' ')
    )
  }

  try {
    // Compile TypeScript to JavaScript using the worker
    const compileResult = await compileTypeScript(code)
    
    // Check for type errors
    if (!compileResult.success || !compileResult.outputCode) {
      const typeErrors = formatTypeScriptErrors(compileResult.diagnostics)
      console.log = originalLog
      console.error = originalError
      return {
        success: false,
        logs,
        error: null,
        typeErrors,
      }
    }

    // Execute the transpiled JavaScript
    const fn = new Function(compileResult.outputCode)
    fn()

    console.log = originalLog
    console.error = originalError
    return {
      success: true,
      logs,
      error: null,
      typeErrors: null,
    }
  } catch (error) {
    console.log = originalLog
    console.error = originalError
    
    // Check if this was a type error that wasn't caught
    try {
      const compileResult = await compileTypeScript(code)
      const typeErrors = formatTypeScriptErrors(compileResult.diagnostics)
      if (typeErrors) {
        return {
          success: false,
          logs,
          error: null,
          typeErrors,
        }
      }
    } catch {
      // Ignore compilation errors, use runtime error instead
    }
    
    return {
      success: false,
      logs,
      error: error instanceof Error ? error.message : String(error),
      typeErrors: null,
    }
  }
}

/**
 * Run TypeScript code with test validation
 */
export async function runWithTests(
  userCode: string,
  testCode: string
): Promise<{
  passed: boolean
  error: string | null
  typeErrors: string | null
}> {
  try {
    // Combine user code and test code
    const combinedCode = userCode + '\n' + testCode
    
    // Compile the combined code
    const compileResult = await compileTypeScript(combinedCode)
    
    // Check for type errors
    if (!compileResult.success || !compileResult.outputCode) {
      const typeErrors = formatTypeScriptErrors(compileResult.diagnostics)
      return {
        passed: false,
        error: null,
        typeErrors,
      }
    }

    // Execute the test
    const fn = new Function(compileResult.outputCode)
    fn()

    return {
      passed: true,
      error: null,
      typeErrors: null,
    }
  } catch (error) {
    // Try to get type errors if available
    try {
      const combinedCode = userCode + '\n' + testCode
      const compileResult = await compileTypeScript(combinedCode)
      const typeErrors = formatTypeScriptErrors(compileResult.diagnostics)
      if (typeErrors) {
        return {
          passed: false,
          error: null,
          typeErrors,
        }
      }
    } catch {
      // Ignore compilation errors, use runtime error instead
    }
    
    return {
      passed: false,
      error: error instanceof Error ? error.message : String(error),
      typeErrors: null,
    }
  }
}
