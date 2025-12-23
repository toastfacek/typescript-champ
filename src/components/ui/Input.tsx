import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Visual variant */
  variant?: 'default' | 'filled'
  /** Input size */
  inputSize?: 'sm' | 'md' | 'lg'
  /** Error state */
  error?: boolean
  /** Error message to display */
  errorMessage?: string
  /** Label text */
  label?: string
  /** Helper text below input */
  helperText?: string
  /** Left icon/element */
  leftElement?: React.ReactNode
  /** Right icon/element */
  rightElement?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      inputSize = 'md',
      error = false,
      errorMessage,
      label,
      helperText,
      leftElement,
      rightElement,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    const variants = {
      default: clsx(
        'bg-surface-900 border-surface-600',
        'hover:border-surface-500',
        'focus:border-accent-500 focus:ring-1 focus:ring-accent-500',
        error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500'
      ),
      filled: clsx(
        'bg-surface-800 border-transparent',
        'hover:bg-surface-700',
        'focus:bg-surface-900 focus:border-accent-500 focus:ring-1 focus:ring-accent-500',
        error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-500'
      ),
    }

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base',
    }

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-surface-200 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftElement && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
              {leftElement}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx(
              'w-full rounded-xl border transition-all duration-200',
              'text-surface-100 placeholder-surface-500',
              'focus:outline-none',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              variants[variant],
              sizes[inputSize],
              leftElement && 'pl-10',
              rightElement && 'pr-10',
              className
            )}
            aria-invalid={error}
            aria-describedby={
              errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400">
              {rightElement}
            </div>
          )}
        </div>
        {errorMessage && (
          <p id={`${inputId}-error`} className="mt-2 text-sm text-danger-400">
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p id={`${inputId}-helper`} className="mt-2 text-sm text-surface-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

