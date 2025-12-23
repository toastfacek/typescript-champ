import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  interactive?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'glass' | 'gradient'
  glow?: 'none' | 'accent' | 'gold'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    hover = false, 
    interactive = false,
    padding = 'md', 
    variant = 'default',
    glow = 'none',
    children, 
    ...props 
  }, ref) => {
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }

    const variantStyles = {
      default: 'bg-surface-800/50 backdrop-blur-sm border-surface-700/50',
      glass: 'bg-surface-900/40 backdrop-blur-xl border-surface-600/30',
      gradient: 'bg-gradient-to-br from-surface-800/80 to-surface-900/80 backdrop-blur-sm border-surface-600/40',
    }

    const glowStyles = {
      none: '',
      accent: 'shadow-glow-sm',
      gold: 'shadow-glow-gold',
    }

    const hoverStyles = hover || interactive
      ? 'hover:border-accent-500/30 hover:bg-surface-800/80 hover:shadow-lg hover:shadow-accent-500/5 transition-all duration-300'
      : ''

    const interactiveStyles = interactive
      ? 'cursor-pointer active:scale-[0.99]'
      : ''

    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-2xl border',
          variantStyles[variant],
          paddingStyles[padding],
          glowStyles[glow],
          hoverStyles,
          interactiveStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
