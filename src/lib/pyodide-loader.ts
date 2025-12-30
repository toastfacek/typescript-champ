/**
 * Pyodide loader singleton - initializes Pyodide once and provides access to it.
 * Pyodide is lazy-loaded only when Python lessons are accessed.
 */

import { loadPyodide, type PyodideInterface } from 'pyodide'

let pyodideInstance: PyodideInterface | null = null
let loadingPromise: Promise<PyodideInterface> | null = null
let isLoading = false

/**
 * Initialize Pyodide. This is a one-time operation that loads ~10MB.
 * Returns a promise that resolves when Pyodide is ready.
 */
export async function initializePyodide(): Promise<PyodideInterface> {
  // If already loaded, return the instance
  if (pyodideInstance) {
    return pyodideInstance
  }

  // If currently loading, return the existing promise
  if (loadingPromise) {
    return loadingPromise
  }

  // Start loading
  isLoading = true
  loadingPromise = (async () => {
    try {
      const pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.29.0/full/',
      })
      
      // Set up stdout/stderr capture
      pyodide.runPython(`
import sys
from io import StringIO

class CapturingIO:
    def __init__(self):
        self.buffer = StringIO()
    
    def write(self, s):
        self.buffer.write(s)
    
    def flush(self):
        pass
    
    def getvalue(self):
        return self.buffer.getvalue()
    
    def clear(self):
        self.buffer = StringIO()

capturing_stdout = CapturingIO()
capturing_stderr = CapturingIO()
      `)
      
      pyodideInstance = pyodide
      isLoading = false
      return pyodide
    } catch (error) {
      isLoading = false
      loadingPromise = null
      throw new Error(`Failed to load Pyodide: ${error instanceof Error ? error.message : String(error)}`)
    }
  })()

  return loadingPromise
}

/**
 * Get the Pyodide instance. Throws if not initialized.
 */
export function getPyodide(): PyodideInterface {
  if (!pyodideInstance) {
    throw new Error('Pyodide not initialized. Call initializePyodide() first.')
  }
  return pyodideInstance
}

/**
 * Check if Pyodide is currently loading
 */
export function isPyodideLoading(): boolean {
  return isLoading
}

/**
 * Check if Pyodide is ready
 */
export function isPyodideReady(): boolean {
  return pyodideInstance !== null
}

//