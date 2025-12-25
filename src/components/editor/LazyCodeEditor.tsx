import { Suspense, lazy } from 'react'
import type { CodeEditorProps } from './types'

// Lazy load CodeEditor to reduce initial bundle size
// CodeMirror is only needed on lesson/practice pages
const CodeEditor = lazy(() => import('./CodeEditor').then(m => ({ default: m.CodeEditor })))

// Loading fallback for CodeEditor
const CodeEditorLoading = () => (
  <div className="flex items-center justify-center h-[300px] bg-surface-800/50 border border-surface-700/50 rounded-lg">
    <div className="text-center">
      <div className="relative inline-block">
        <div className="w-8 h-8 border-4 border-surface-700 rounded-full" />
        <div className="absolute top-0 left-0 w-8 h-8 border-4 border-accent-500 rounded-full border-t-transparent animate-spin" />
      </div>
      <p className="mt-2 text-sm text-surface-500">Loading editor...</p>
    </div>
  </div>
)

export function LazyCodeEditor(props: CodeEditorProps) {
  return (
    <Suspense fallback={<CodeEditorLoading />}>
      <CodeEditor {...props} />
    </Suspense>
  )
}

