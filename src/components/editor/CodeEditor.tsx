import { useCallback, useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { EditorView } from '@codemirror/view'
import { linter } from '@codemirror/lint'
import type { Diagnostic } from '@codemirror/lint'
import { autocompletion } from '@codemirror/autocomplete'
import * as ts from 'typescript'
import { useTypeScriptWorker } from '@/lib/useTypeScriptWorker'

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
          // Get message text
          let messageText = ''
          if (typeof diagnostic.messageText === 'string') {
            messageText = diagnostic.messageText
          } else {
            messageText = diagnostic.messageText.messageText
          }

          // Calculate positions
          const start = diagnostic.start || 0
          const end = start + (diagnostic.length || 0)

          return {
            from: start,
            to: end,
            severity: diagnostic.category === ts.DiagnosticCategory.Error ? 'error' : 'warning',
            message: messageText,
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

  // TypeScript keyword completions
  const tsCompletions = useMemo(() => {
    const keywords = [
      { label: 'interface', type: 'keyword', info: 'Define an interface' },
      { label: 'type', type: 'keyword', info: 'Define a type alias' },
      { label: 'enum', type: 'keyword', info: 'Define an enum' },
      { label: 'class', type: 'keyword', info: 'Define a class' },
      { label: 'extends', type: 'keyword', info: 'Extend a class or interface' },
      { label: 'implements', type: 'keyword', info: 'Implement an interface' },
      { label: 'public', type: 'keyword', info: 'Public access modifier' },
      { label: 'private', type: 'keyword', info: 'Private access modifier' },
      { label: 'protected', type: 'keyword', info: 'Protected access modifier' },
      { label: 'readonly', type: 'keyword', info: 'Readonly property modifier' },
      { label: 'abstract', type: 'keyword', info: 'Abstract class or method' },
      { label: 'as', type: 'keyword', info: 'Type assertion' },
      { label: 'keyof', type: 'keyword', info: 'Keyof operator' },
      { label: 'typeof', type: 'keyword', info: 'Typeof operator' },
      { label: 'infer', type: 'keyword', info: 'Infer type' },
      { label: 'namespace', type: 'keyword', info: 'Define a namespace' },
      { label: 'module', type: 'keyword', info: 'Define a module' },
      { label: 'declare', type: 'keyword', info: 'Declare ambient declarations' },
      { label: 'const', type: 'keyword', info: 'Const assertion' },
      { label: 'satisfies', type: 'keyword', info: 'Satisfies operator' },
    ]

    const types = [
      { label: 'string', type: 'type', info: 'String type' },
      { label: 'number', type: 'type', info: 'Number type' },
      { label: 'boolean', type: 'type', info: 'Boolean type' },
      { label: 'any', type: 'type', info: 'Any type' },
      { label: 'unknown', type: 'type', info: 'Unknown type' },
      { label: 'void', type: 'type', info: 'Void type' },
      { label: 'null', type: 'type', info: 'Null type' },
      { label: 'undefined', type: 'type', info: 'Undefined type' },
      { label: 'never', type: 'type', info: 'Never type' },
      { label: 'object', type: 'type', info: 'Object type' },
      { label: 'Record', type: 'type', info: 'Record<K, V> utility type' },
      { label: 'Partial', type: 'type', info: 'Partial<T> utility type' },
      { label: 'Required', type: 'type', info: 'Required<T> utility type' },
      { label: 'Pick', type: 'type', info: 'Pick<T, K> utility type' },
      { label: 'Omit', type: 'type', info: 'Omit<T, K> utility type' },
      { label: 'Readonly', type: 'type', info: 'Readonly<T> utility type' },
    ]

    return autocompletion({
      override: [
        (context) => {
          const word = context.matchBefore(/\w*/)
          if (!word && context.explicit) return null
          
          const options = [
            ...keywords.map(k => ({
              label: k.label,
              type: k.type,
              info: k.info,
            })),
            ...types.map(t => ({
              label: t.label,
              type: t.type,
              info: t.info,
            })),
          ]

          return {
            from: word ? word.from : context.pos,
            options,
          }
        },
      ],
    })
  }, [])

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
          ...(readOnly ? [] : [tsLinter, tsCompletions]),
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
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: false,
          highlightSelectionMatches: true,
        }}
      />
    </div>
  )
}
