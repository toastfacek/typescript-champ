import { SelectHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Visual variant */
  variant?: 'default' | 'filled'
  /** Select size */
  selectSize?: 'sm' | 'md' | 'lg'
  /** Error state */
  error?: boolean
  /** Error message to display */
  errorMessage?: string
  /** Label text */
  label?: string
  /** Helper text below select */
  helperText?: string
  /** Left icon/element */
  leftElement?: React.ReactNode
  /** Options array */
  options: Array<{ value: string; label: string; disabled?: boolean }>
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant = 'default',
      selectSize = 'md',
      error = false,
      errorMessage,
      label,
      helperText,
      leftElement,
      options,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`

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
            htmlFor={selectId}
            className="block text-sm font-medium text-surface-200 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftElement && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none">
              {leftElement}
            </div>
          )}
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              'w-full rounded-xl border transition-all duration-200',
              'text-surface-100 bg-surface-900',
              'focus:outline-none',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'appearance-none cursor-pointer',
              variants[variant],
              sizes[selectSize],
              leftElement && 'pl-10',
              'pr-10',
              className
            )}
            aria-invalid={error}
            aria-describedby={
              errorMessage ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
            }
            {...props}
          >
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="bg-surface-900 text-surface-100"
              >
                {option.label}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 pointer-events-none">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {errorMessage && (
          <p id={`${selectId}-error`} className="mt-2 text-sm text-danger-400">
            {errorMessage}
          </p>
        )}
        {helperText && !errorMessage && (
          <p id={`${selectId}-helper`} className="mt-2 text-sm text-surface-500">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

