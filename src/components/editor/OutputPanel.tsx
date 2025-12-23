import { clsx } from 'clsx'

interface OutputLine {
  type: 'log' | 'error' | 'info' | 'success'
  content: string
}

interface OutputPanelProps {
  output: OutputLine[]
  isRunning?: boolean
  className?: string
}

export function OutputPanel({ output, isRunning = false, className }: OutputPanelProps) {
  return (
    <div
      className={clsx(
        'bg-surface-900 rounded-xl border border-surface-700/50 overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-surface-800/50 border-b border-surface-700/50">
        <span className="text-sm font-medium text-surface-400">Output</span>
        {isRunning && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
            <span className="text-xs text-surface-500">Running...</span>
          </div>
        )}
      </div>

      {/* Output Content */}
      <div className="p-4 font-mono text-sm min-h-[100px] max-h-[200px] overflow-y-auto">
        {output.length === 0 ? (
          <span className="text-surface-600 italic">
            Click "Run" to execute your code...
          </span>
        ) : (
          <div className="space-y-1.5">
            {output.map((line, index) => (
              <div
                key={index}
                className={clsx(
                  'flex items-start gap-2',
                  line.type === 'error' && 'text-danger-400',
                  line.type === 'success' && 'text-success-400',
                  line.type === 'info' && 'text-accent-400',
                  line.type === 'log' && 'text-surface-300'
                )}
              >
                <span className={clsx(
                  'select-none',
                  line.type === 'error' && 'text-danger-500',
                  line.type === 'success' && 'text-success-500',
                  line.type === 'info' && 'text-accent-500',
                  line.type === 'log' && 'text-surface-600'
                )}>{'>'}</span>
                <span className="whitespace-pre-wrap break-all">{line.content}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
