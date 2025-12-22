import * as ts from 'typescript'

interface CompileRequest {
  id: string
  code: string
}

// Serializable version of ts.Diagnostic (no functions or complex objects)
interface SerializedDiagnostic {
  start: number | undefined
  length: number | undefined
  category: number  // Use plain number instead of ts.DiagnosticCategory
  code: number
  messageText: string
}

interface CompileResponse {
  id: string
  diagnostics: SerializedDiagnostic[]
  outputCode: string | null
  success: boolean
}

// DiagnosticCategory values (copied to avoid importing ts in response handling)
const DiagnosticCategory = {
  Warning: 0,
  Error: 1,
  Suggestion: 2,
  Message: 3,
}

// Flatten DiagnosticMessageChain to string
function flattenDiagnosticMessageText(messageText: string | ts.DiagnosticMessageChain): string {
  if (typeof messageText === 'string') {
    return messageText
  }
  // Handle DiagnosticMessageChain
  let result = messageText.messageText
  if (messageText.next) {
    for (const next of messageText.next) {
      result += '\n' + flattenDiagnosticMessageText(next)
    }
  }
  return result
}

// TypeScript compiler options
const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.ESNext,
  strict: true,
  esModuleInterop: true,
  skipLibCheck: true,
  noEmit: false,
}

// Compile TypeScript using transpileModule for maximum compatibility
function compileTypeScript(code: string): CompileResponse {
  try {
    // Use transpileModule which is simpler and doesn't require lib files
    const result = ts.transpileModule(code, {
      compilerOptions,
      reportDiagnostics: true,
    })

    // Serialize diagnostics to plain objects - ensure no functions or complex objects
    const diagnostics: SerializedDiagnostic[] = (result.diagnostics || []).map((d) => ({
      start: typeof d.start === 'number' ? d.start : undefined,
      length: typeof d.length === 'number' ? d.length : undefined,
      category: typeof d.category === 'number' ? d.category : DiagnosticCategory.Error,
      code: typeof d.code === 'number' ? d.code : 0,
      messageText: flattenDiagnosticMessageText(d.messageText),
    }))

    const hasErrors = diagnostics.some(d => d.category === DiagnosticCategory.Error)

    return {
      id: '',
      diagnostics,
      outputCode: hasErrors ? null : result.outputText,
      success: !hasErrors,
    }
  } catch (err) {
    return {
      id: '',
      diagnostics: [{
        start: 0,
        length: 0,
        category: DiagnosticCategory.Error,
        code: 0,
        messageText: `Compilation error: ${err instanceof Error ? err.message : String(err)}`,
      }],
      outputCode: null,
      success: false,
    }
  }
}

// Handle messages from main thread
self.onmessage = (e: MessageEvent<CompileRequest>) => {
  const { id, code } = e.data

  try {
    const result = compileTypeScript(code)
    result.id = id

    // Ensure the response is fully serializable by creating a plain object
    const response = {
      id: result.id,
      diagnostics: result.diagnostics.map(d => ({
        start: d.start,
        length: d.length,
        category: d.category,
        code: d.code,
        messageText: String(d.messageText),  // Ensure string
      })),
      outputCode: result.outputCode,
      success: result.success,
    }

    self.postMessage(response)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const response: CompileResponse = {
      id,
      diagnostics: [
        {
          start: 0,
          length: 0,
          category: DiagnosticCategory.Error,
          code: 0,
          messageText: `Compilation error: ${errorMessage}`,
        },
      ],
      outputCode: null,
      success: false,
    }
    self.postMessage(response)
  }
}

// Export empty object to make this a module
export {}

