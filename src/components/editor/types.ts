// Separate types file to avoid importing CodeEditor module
// This prevents CodeMirror from being bundled when only types are needed

export interface CodeEditorProps {
  code: string
  onChange: (code: string) => void
  readOnly?: boolean
  height?: string
  className?: string
  language?: 'typescript' | 'python'
}

