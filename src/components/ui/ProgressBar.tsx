import { clsx } from 'clsx'

interface ProgressBarProps {
  progress: number // 0 to 1
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'secondary' | 'success'
  showLabel?: boolean
  animated?: boolean
  className?: string
}

export function ProgressBar({
  progress,
  size = 'md',
  color = 'primary',
  showLabel = false,
  animated = true,
  className,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1)
  const percentage = Math.round(clampedProgress * 100)

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const colors = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-success-500',
  }

  const bgColors = {
    primary: 'bg-primary-100',
    secondary: 'bg-secondary-100',
    success: 'bg-success-100',
  }

  return (
    <div className={clsx('w-full', className)}>
      <div
        className={clsx(
          'w-full rounded-full overflow-hidden',
          sizes[size],
          bgColors[color]
        )}
      >
        <div
          className={clsx(
            'h-full rounded-full',
            colors[color],
            animated && 'transition-all duration-500 ease-out'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-gray-600 text-right">{percentage}%</div>
      )}
    </div>
  )
}
