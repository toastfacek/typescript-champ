import { useCallback, useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { EditorView } from '@codemirror/view'
import { linter } from '@codemirror/lint'
import type { Diagnostic } from '@codemirror/lint'
import { useTypeScriptWorker } from '@/lib/useTypeScriptWorker'
import { DiagnosticCategory } from '@/lib/typescript-worker-singleton'
import { useTheme } from '@/hooks/useTheme'

interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  readOnly?: boolean
  height?: string
  className?: string
}

// Custom dark theme for gamified look
const customDarkTheme = EditorView.theme({
  '&': {
    fontSize: '14px',
    backgroundColor: '#0a0f1a',
  },
  '.cm-content': {
    fontFamily: "'JetBrains Mono', monospace",
    padding: '16px 0',
    color: '#f1f5f9',
  },
  '.cm-line': {
    padding: '0 16px',
  },
  '.cm-gutters': {
    backgroundColor: '#0a0f1a',
    color: '#64748b',
    border: 'none',
    paddingRight: '8px',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'rgba(34, 211, 238, 0.1)',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(34, 211, 238, 0.05)',
  },
  '.cm-selectionBackground': {
    backgroundColor: '#1e293b !important',
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#22d3ee',
  },
  '&.cm-focused .cm-selectionBackground': {
    backgroundColor: '#1e293b',
  },
})

// Custom light theme
const customLightTheme = EditorView.theme({
  '&': {
    fontSize: '14px',
    backgroundColor: '#ffffff',
  },
  '.cm-content': {
    fontFamily: "'JetBrains Mono', monospace",
    padding: '16px 0',
    color: '#0f172a',
  },
  '.cm-line': {
    padding: '0 16px',
  },
  '.cm-gutters': {
    backgroundColor: '#ffffff',
    color: '#64748b',
    border: 'none',
    paddingRight: '8px',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
  },
  '.cm-activeLine': {
    backgroundColor: 'rgba(6, 182, 212, 0.05)',
  },
  '.cm-selectionBackground': {
    backgroundColor: '#f1f5f9 !important',
  },
  '&.cm-focused .cm-cursor': {
    borderLeftColor: '#06b6d4',
  },
  '&.cm-focused .cm-selectionBackground': {
    backgroundColor: '#f1f5f9',
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
  const { effectiveTheme } = useTheme()

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


  const customTheme = effectiveTheme === 'dark' ? customDarkTheme : customLightTheme
  const codeMirrorTheme = effectiveTheme === 'dark' ? 'dark' : 'light'

  return (
    <div className={`rounded-lg overflow-hidden border ${effectiveTheme === 'dark' ? 'border-surface-700' : 'border-surface-200'} ${className}`}>
      <CodeMirror
        value={code}
        height={height}
        theme={codeMirrorTheme}
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
