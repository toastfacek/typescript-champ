import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  /** 
   * Visual style variants:
   * - default: Neutral surface color
   * - accent: Primary cyan accent
   * - gold: Gold/amber for rewards/XP
   * - success: Green for completion/positive
   * - warning: Amber for attention
   * - danger: Red for errors/critical
   */
  variant?: 'default' | 'accent' | 'gold' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  /** Add a subtle dot indicator */
  dot?: boolean
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-surface-700/50 text-surface-300 border border-surface-600/50',
    accent: 'bg-accent-500/15 text-accent-400 border border-accent-500/25',
    gold: 'bg-gold-500/15 text-gold-400 border border-gold-500/25',
    success: 'bg-success-500/15 text-success-400 border border-success-500/25',
    warning: 'bg-warning-500/15 text-warning-400 border border-warning-500/25',
    danger: 'bg-danger-500/15 text-danger-400 border border-danger-500/25',
  }

  const dotColors = {
    default: 'bg-surface-400',
    accent: 'bg-accent-400',
    gold: 'bg-gold-400',
    success: 'bg-success-400',
    warning: 'bg-warning-400',
    danger: 'bg-danger-400',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1.5',
    md: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span className={clsx('w-1.5 h-1.5 rounded-full', dotColors[variant])} />
      )}
      {children}
    </span>
  )
}
