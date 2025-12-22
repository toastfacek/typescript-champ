import { useEffect, useRef, useCallback } from 'react'
import { SerializedDiagnostic } from './typescript-worker-singleton'

export interface CompileResult {
  diagnostics: SerializedDiagnostic[]
  outputCode: string | null
  success: boolean
}

interface CompileRequest {
  id: string
  code: string
}

interface CompileResponse {
  id: string
  diagnostics: SerializedDiagnostic[]
  outputCode: string | null
  success: boolean
}

let requestIdCounter = 0

export function useTypeScriptWorker() {
  const workerRef = useRef<Worker | null>(null)
  const pendingRequestsRef = useRef<Map<string, {
    resolve: (result: CompileResult) => void
    reject: (error: Error) => void
  }>>(new Map())
  const debounceTimerRef = useRef<number | null>(null)

  // Initialize worker
  useEffect(() => {
    try {
      const worker = new Worker(
        new URL('./typescript.worker.ts', import.meta.url),
        { type: 'module' }
      )

      worker.onmessage = (e: MessageEvent<CompileResponse>) => {
        const { id, diagnostics, outputCode, success } = e.data
        const pending = pendingRequestsRef.current.get(id)
        
        if (pending) {
          pendingRequestsRef.current.delete(id)
          pending.resolve({
            diagnostics,
            outputCode,
            success,
          })
        }
      }

      worker.onerror = (error) => {
        // Reject all pending requests
        pendingRequestsRef.current.forEach(({ reject }) => {
          reject(new Error(`Worker error: ${error.message}`))
        })
        pendingRequestsRef.current.clear()
      }

      workerRef.current = worker

      return () => {
        // Cleanup: reject pending requests and terminate worker
        pendingRequestsRef.current.forEach(({ reject }) => {
          reject(new Error('Worker terminated'))
        })
        pendingRequestsRef.current.clear()
        worker.terminate()
      }
    } catch (error) {
      console.error('Failed to create TypeScript worker:', error)
    }
  }, [])

  const compile = useCallback((code: string): Promise<CompileResult> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        reject(new Error('Worker not initialized'))
        return
      }

      const id = `req_${++requestIdCounter}_${Date.now()}`
      
      // Store the promise resolvers
      pendingRequestsRef.current.set(id, { resolve, reject })

      // Send compile request
      const request: CompileRequest = { id, code }
      workerRef.current.postMessage(request)
    })
  }, [])

  const compileDebounced = useCallback((code: string, delay: number = 300): Promise<CompileResult> => {
    return new Promise((resolve, reject) => {
      // Clear existing timer
      if (debounceTimerRef.current !== null) {
        clearTimeout(debounceTimerRef.current)
      }

      // Set new timer
      debounceTimerRef.current = window.setTimeout(() => {
        compile(code).then(resolve).catch(reject)
      }, delay)
    })
  }, [compile])

  return {
    compile,
    compileDebounced,
  }
}



