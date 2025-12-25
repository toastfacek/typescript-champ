// Only export LazyCodeEditor - CodeEditor should only be accessed via lazy loading
export { LazyCodeEditor } from './LazyCodeEditor'
export { OutputPanel } from './OutputPanel'
// Re-export types from separate file (NOT from CodeEditor to avoid bundling CodeMirror)
export type { CodeEditorProps } from './types'
