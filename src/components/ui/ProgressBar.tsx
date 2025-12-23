import { clsx } from 'clsx'

interface ProgressBarProps {
  progress: number // 0 to 1
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'accent' | 'gold' | 'success' | 'primary'
  showLabel?: boolean
  animated?: boolean
  className?: string
}

export function ProgressBar({
  progress,
  size = 'md',
  color = 'accent',
  showLabel = false,
  animated = true,
  className,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 1)
  const percentage = Math.round(clampedProgress * 100)

  const sizes = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  const gradients = {
    accent: 'from-accent-500 to-accent-400',
    gold: 'from-gold-500 to-gold-400',
    success: 'from-success-500 to-success-400',
    primary: 'from-accent-500 to-accent-400',
  }

  return (
    <div className={clsx('w-full', className)}>
      <div
        className={clsx(
          'w-full rounded-full overflow-hidden bg-surface-700',
          sizes[size]
        )}
      >
        <div
          className={clsx(
            'h-full rounded-full bg-gradient-to-r',
            gradients[color],
            animated && 'transition-all duration-500 ease-out'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-surface-500 text-right">{percentage}%</div>
      )}
    </div>
  )
}
