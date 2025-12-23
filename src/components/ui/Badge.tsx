import { clsx } from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: BadgeProps) {
  const variants = {
    default: 'bg-surface-700 text-surface-300 border border-surface-600',
    primary: 'bg-accent-500/20 text-accent-400 border border-accent-500/30',
    secondary: 'bg-gold-500/20 text-gold-400 border border-gold-500/30',
    success: 'bg-success-500/20 text-success-400 border border-success-500/30',
    warning: 'bg-gold-500/20 text-gold-400 border border-gold-500/30',
    error: 'bg-danger-500/20 text-danger-400 border border-danger-500/30',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
