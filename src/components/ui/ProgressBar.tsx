import { clsx } from 'clsx'

interface ProgressBarProps {
  /** Progress value from 0 to 1 */
  progress: number
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Color variant matching the design system */
  color?: 'accent' | 'gold' | 'success' | 'danger'
  showLabel?: boolean
  /** Label position when showLabel is true */
  labelPosition?: 'right' | 'inside'
  animated?: boolean
  /** Add a subtle glow effect */
  glow?: boolean
  className?: string
}

export function ProgressBar({
  progress,
  size = 'md',
  color = 'accent',
  showLabel = false,
  labelPosition = 'right',
  animated = true,
  glow = false,
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
    danger: 'from-danger-500 to-danger-400',
  }

  const glowColors = {
    accent: 'shadow-[0_0_10px_rgba(6,182,212,0.3)]',
    gold: 'shadow-[0_0_10px_rgba(251,191,36,0.3)]',
    success: 'shadow-[0_0_10px_rgba(34,197,94,0.3)]',
    danger: 'shadow-[0_0_10px_rgba(244,63,94,0.3)]',
  }

  const trackBg = {
    accent: 'bg-accent-500/10',
    gold: 'bg-gold-500/10',
    success: 'bg-success-500/10',
    danger: 'bg-danger-500/10',
  }

  return (
    <div className={clsx('w-full', className)}>
      <div
        className={clsx(
          'w-full rounded-full overflow-hidden relative',
          trackBg[color],
          sizes[size]
        )}
      >
        <div
          className={clsx(
            'h-full rounded-full bg-gradient-to-r',
            gradients[color],
            animated && 'transition-all duration-500 ease-out',
            glow && glowColors[color]
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        {showLabel && labelPosition === 'inside' && size === 'lg' && (
          <span className="absolute inset-0 flex items-center justify-center text-2xs font-bold text-white">
            {percentage}%
          </span>
        )}
      </div>
      {showLabel && labelPosition === 'right' && (
        <div className="mt-1 text-sm text-surface-500 text-right font-mono tabular-nums">
          {percentage}%
        </div>
      )}
    </div>
  )
}
