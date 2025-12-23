import { ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'success' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  glow?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      glow = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      inline-flex items-center justify-center font-semibold rounded-xl
      transition-all duration-200 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-900
      disabled:opacity-50 disabled:cursor-not-allowed
      active:scale-[0.98]
    `

    const variants = {
      primary: `
        bg-gradient-to-r from-accent-500 to-accent-400 text-surface-900
        hover:from-accent-400 hover:to-accent-300
        focus:ring-accent-500
        ${glow ? 'shadow-glow hover:shadow-glow-lg' : 'hover:shadow-glow-sm'}
      `,
      secondary: `
        bg-gradient-to-r from-gold-500 to-gold-400 text-surface-900
        hover:from-gold-400 hover:to-gold-300
        focus:ring-gold-500
        ${glow ? 'shadow-glow-gold' : ''}
      `,
      gold: `
        bg-gradient-to-r from-gold-500 to-gold-400 text-surface-900
        hover:from-gold-400 hover:to-gold-300
        focus:ring-gold-500
        ${glow ? 'shadow-glow-gold' : ''}
      `,
      success: `
        bg-gradient-to-r from-success-500 to-success-400 text-surface-900
        hover:from-success-400 hover:to-success-300
        focus:ring-success-500
      `,
      danger: `
        bg-gradient-to-r from-danger-500 to-danger-400 text-white
        hover:from-danger-400 hover:to-danger-300
        focus:ring-danger-500
      `,
      outline: `
        border border-surface-600 text-surface-300 bg-transparent
        hover:border-accent-500 hover:text-accent-400 hover:bg-accent-500/10
        focus:ring-accent-500
      `,
      ghost: `
        text-surface-300 bg-transparent
        hover:text-surface-100 hover:bg-surface-800
        focus:ring-surface-600
      `,
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm gap-1.5',
      md: 'px-5 py-2.5 text-sm gap-2',
      lg: 'px-7 py-3.5 text-base gap-2.5',
    }

    return (
      <button
        ref={ref}
        className={clsx(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
