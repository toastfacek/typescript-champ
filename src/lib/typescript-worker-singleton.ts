import * as ts from 'typescript'

export interface CompileResult {
  diagnostics: ts.Diagnostic[]
  outputCode: string | null
  success: boolean
}

interface CompileRequest {
  id: string
  code: string
}

interface CompileResponse {
  id: string
  diagnostics: ts.Diagnostic[]
  outputCode: string | null
  success: boolean
}

let requestIdCounter = 0
let workerInstance: Worker | null = null
const pendingRequests = new Map<string, {
  resolve: (result: CompileResult) => void
  reject: (error: Error) => void
}>()

function getWorker(): Worker {
  if (!workerInstance) {
    try {
      const worker = new Worker(
        new URL('./typescript.worker.ts', import.meta.url),
        { type: 'module' }
      )

      worker.onmessage = (e: MessageEvent<CompileResponse>) => {
        const { id, diagnostics, outputCode, success } = e.data
        const pending = pendingRequests.get(id)
        
        if (pending) {
          pendingRequests.delete(id)
          pending.resolve({
            diagnostics,
            outputCode,
            success,
          })
        }
      }

      worker.onerror = (error) => {
        // Reject all pending requests
        pendingRequests.forEach(({ reject }) => {
          reject(new Error(`Worker error: ${error.message}`))
        })
        pendingRequests.clear()
      }

      workerInstance = worker
    } catch (error) {
      throw new Error(`Failed to create TypeScript worker: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  return workerInstance
}

export function compileTypeScript(code: string): Promise<CompileResult> {
  return new Promise((resolve, reject) => {
    const worker = getWorker()
    const id = `req_${++requestIdCounter}_${Date.now()}`
    
    pendingRequests.set(id, { resolve, reject })

    const request: CompileRequest = { id, code }
    worker.postMessage(request)
  })
}


