import * as ts from 'typescript'

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

// TypeScript compiler options
const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2020,
  module: ts.ModuleKind.ESNext,
  lib: ['ES2020', 'DOM', 'DOM.Iterable'],
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  strict: true,
  esModuleInterop: true,
  skipLibCheck: true,
  noEmit: false,
  allowJs: true,
}

// Create a virtual file system for the source file
function compileTypeScript(code: string): CompileResponse {
  const fileName = 'main.ts'
  
  // Create source file
  const sourceFile = ts.createSourceFile(
    fileName,
    code,
    ts.ScriptTarget.ES2020,
    true
  )

  // Create a program with just this file
  const program = ts.createProgram([fileName], compilerOptions, {
    getSourceFile: (name) => {
      if (name === fileName) {
        return sourceFile
      }
      return undefined
    },
    writeFile: () => {},
    getCurrentDirectory: () => '',
    getDirectories: () => [],
    fileExists: (name) => name === fileName,
    readFile: (name) => (name === fileName ? code : undefined),
    getCanonicalFileName: (name) => name,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => '\n',
    getDefaultLibFileName: () => 'lib.d.ts',
  })

  // Get diagnostics (type errors)
  const diagnostics = [
    ...program.getSyntacticDiagnostics(sourceFile),
    ...program.getSemanticDiagnostics(sourceFile),
  ]

  // Transpile to JavaScript
  let outputCode: string | null = null
  let success = diagnostics.filter(d => d.category === ts.DiagnosticCategory.Error).length === 0

  if (success) {
    const result = ts.transpileModule(code, {
      compilerOptions,
      reportDiagnostics: false, // We already checked above
    })
    outputCode = result.outputText
  }

  return {
    id: '', // Will be set by caller
    diagnostics,
    outputCode,
    success,
  }
}

// Handle messages from main thread
self.onmessage = (e: MessageEvent<CompileRequest>) => {
  const { id, code } = e.data

  try {
    const result = compileTypeScript(code)
    result.id = id

    self.postMessage(result)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    const response: CompileResponse = {
      id,
      diagnostics: [
        {
          file: undefined,
          start: 0,
          length: 0,
          category: ts.DiagnosticCategory.Error,
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

