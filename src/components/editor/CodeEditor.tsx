import { useCallback, useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { EditorView } from '@codemirror/view'
import { linter } from '@codemirror/lint'
import type { Diagnostic } from '@codemirror/lint'
import { useTypeScriptWorker } from '@/lib/useTypeScriptWorker'
import { DiagnosticCategory } from '@/lib/typescript-worker-singleton'

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  readOnly?: boolean
  height?: string
  className?: string
}

// Custom theme for gamified look
const customTheme = EditorView.theme({
  '&': {
    fontSize: '14px',
    backgroundColor: '#1e1e2e',
  },
  '.cm-content': {
    fontFamily: "'JetBrains Mono', monospace",
    padding: '16px 0',
  },
  '.cm-line': {
    padding: '0 16px',
  },
  '.cm-gutters': {
    backgroundColor: '#1e1e2e',
    color: '#6c7086',
    border: 'none',
    paddingRight: '8px',
  },
  '.cm-activeLineGutter': {
    backgroundColor: '#313244',
  },
  '.cm-activeLine': {
    backgroundColor: '#31324422',
  },
  '.cm-selectionBackground': {
    backgroundColor: '#45475a !important',
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#f5e0dc',
  },
  '&.cm-focused .cm-selectionBackground': {
    backgroundColor: '#45475a',
  },
})

export function CodeEditor({
  code,
  onChange,
  readOnly = false,
  height = '300px',
  className = '',
}: CodeEditorProps) {
  const { compileDebounced } = useTypeScriptWorker()

  const handleChange = useCallback(
    (value: string) => {
      onChange(value)
    },
    [onChange]
  )

  // Create TypeScript linter
  const tsLinter = useMemo(() => {
    return linter(async (view): Promise<Diagnostic[]> => {
      const code = view.state.doc.toString()
      
      // Skip linting for empty code
      if (!code.trim()) {
        return []
      }

      try {
        const result = await compileDebounced(code, 300)
        
        return result.diagnostics.map((diagnostic): Diagnostic => {
          // Calculate positions
          const start = diagnostic.start || 0
          const end = start + (diagnostic.length || 0)

          return {
            from: start,
            to: end,
            severity: diagnostic.category === DiagnosticCategory.Error ? 'error' : 'warning',
            message: diagnostic.messageText,
          }
        })
      } catch (error) {
        // Return a diagnostic for the error
        return [{
          from: 0,
          to: view.state.doc.length,
          severity: 'error' as const,
          message: `Failed to check types: ${error instanceof Error ? error.message : String(error)}`,
        }]
      }
    }, {
      delay: 300,
    })
  }, [compileDebounced])


  return (
    <div className={`rounded-lg overflow-hidden border border-gray-700 ${className}`}>
      <CodeMirror
        value={code}
        height={height}
        theme="dark"
        extensions={[
          javascript({ typescript: true }),
          customTheme,
          EditorView.lineWrapping,
          ...(readOnly ? [] : [tsLinter]),
        ]}
        onChange={handleChange}
        readOnly={readOnly}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightActiveLine: true,
          foldGutter: false,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: false,
          rectangularSelection: true,
          crosshairCursor: false,
          highlightSelectionMatches: true,
        }}
      />
    </div>
  )
}
