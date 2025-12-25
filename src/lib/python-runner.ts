/**
 * Python code execution using Pyodide.
 * Provides Python execution similar to TypeScript runner.
 */

import { initializePyodide, getPyodide, isPyodideReady } from './pyodide-loader'

/**
 * Run Python code and return the result
 */
export async function runPythonCode(code: string): Promise<{
  success: boolean
  logs: string[]
  error: string | null
}> {
  // Ensure Pyodide is initialized
  if (!isPyodideReady()) {
    await initializePyodide()
  }

  const pyodide = getPyodide()
  const logs: string[] = []

  try {
    // Clear previous output
    pyodide.runPython(`
capturing_stdout.clear()
capturing_stderr.clear()
sys.stdout = capturing_stdout
sys.stderr = capturing_stderr
    `)

    // Execute the user code
    pyodide.runPython(code)

    // Capture stdout
    const stdout = pyodide.runPython('capturing_stdout.getvalue()') as string
    if (stdout) {
      logs.push(stdout.trim())
    }

    // Capture stderr
    const stderr = pyodide.runPython('capturing_stderr.getvalue()') as string
    if (stderr) {
      logs.push(stderr.trim())
    }

    return {
      success: true,
      logs,
      error: null,
    }
  } catch (error) {
    // Python exceptions are caught here
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    // Try to get stderr if available
    try {
      const stderr = pyodide.runPython('capturing_stderr.getvalue()') as string
      if (stderr) {
        logs.push(stderr.trim())
      }
    } catch {
      // Ignore errors getting stderr
    }

    // Format Python traceback nicely
    const formattedError = formatPythonError(errorMessage)

    return {
      success: false,
      logs,
      error: formattedError,
    }
  }
}

/**
 * Run Python code with test validation
 * Test code should use Python assert statements
 */
export async function runWithTests(
  userCode: string,
  testCode: string
): Promise<{
  passed: boolean
  error: string | null
}> {
  // Ensure Pyodide is initialized
  if (!isPyodideReady()) {
    await initializePyodide()
  }

  const pyodide = getPyodide()

  try {
    // Clear previous output
    pyodide.runPython(`
capturing_stdout.clear()
capturing_stderr.clear()
sys.stdout = capturing_stdout
sys.stderr = capturing_stderr
    `)

    // First run user code
    pyodide.runPython(userCode)

    // Then run test code (which may use variables from user code)
    pyodide.runPython(testCode)

    return {
      passed: true,
      error: null,
    }
  } catch (error) {
    // Test failed - format the error
    const errorMessage = error instanceof Error ? error.message : String(error)
    const formattedError = formatPythonError(errorMessage)

    return {
      passed: false,
      error: formattedError,
    }
  }
}

/**
 * Format Python errors for display
 * Converts Python tracebacks into user-friendly messages
 */
function formatPythonError(errorMessage: string): string {
  // If it's an AssertionError, extract the message
  if (errorMessage.includes('AssertionError')) {
    // Try to extract a custom message if present
    const match = errorMessage.match(/AssertionError:\s*(.+)/)
    if (match) {
      return match[1].trim()
    }
    return 'Test failed: Assertion error'
  }

  // If it's a NameError, make it more user-friendly
  if (errorMessage.includes('NameError')) {
    const match = errorMessage.match(/name '(\w+)' is not defined/)
    if (match) {
      return `Variable '${match[1]}' is not defined. Make sure you've created this variable.`
    }
  }

  // If it's a SyntaxError, extract the relevant part
  if (errorMessage.includes('SyntaxError')) {
    const lines = errorMessage.split('\n')
    // Find the line with the actual error
    const errorLine = lines.find(line => line.includes('SyntaxError'))
    if (errorLine) {
      return errorLine.trim()
    }
  }

  // For other errors, return the first meaningful line
  const lines = errorMessage.split('\n').filter(line => line.trim())
  if (lines.length > 0) {
    // Skip traceback lines, get to the actual error
    const errorLine = lines.find(line => 
      !line.includes('File "<exec>') && 
      !line.includes('Traceback') &&
      line.trim().length > 0
    )
    if (errorLine) {
      return errorLine.trim()
    }
    return lines[0].trim()
  }

  return errorMessage
}

