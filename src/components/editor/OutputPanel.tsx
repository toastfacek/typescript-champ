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
        'bg-gray-900 rounded-lg border border-gray-700 overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-300">Output</span>
        {isRunning && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">Running...</span>
          </div>
        )}
      </div>

      {/* Output Content */}
      <div className="p-4 font-mono text-sm min-h-[100px] max-h-[200px] overflow-y-auto">
        {output.length === 0 ? (
          <span className="text-gray-500 italic">
            Click "Run" to execute your code...
          </span>
        ) : (
          <div className="space-y-1">
            {output.map((line, index) => (
              <div
                key={index}
                className={clsx(
                  'flex items-start gap-2',
                  line.type === 'error' && 'text-red-400',
                  line.type === 'success' && 'text-green-400',
                  line.type === 'info' && 'text-blue-400',
                  line.type === 'log' && 'text-gray-300'
                )}
              >
                <span className="text-gray-500 select-none">{'>'}</span>
                <span className="whitespace-pre-wrap break-all">{line.content}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
