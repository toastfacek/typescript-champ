import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** Toggle size */
  size?: 'sm' | 'md' | 'lg'
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error state */
  error?: boolean
  /** Error message */
  errorMessage?: string
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = 'md',
      label,
      helperText,
      error = false,
      errorMessage,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const toggleId = id || `toggle-${Math.random().toString(36).substr(2, 9)}`

    const sizes = {
      sm: {
        track: 'w-9 h-5',
        thumb: 'w-4 h-4',
        translate: 'translate-x-4',
      },
      md: {
        track: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: 'translate-x-5',
      },
      lg: {
        track: 'w-14 h-7',
        thumb: 'w-6 h-6',
        translate: 'translate-x-7',
      },
    }

    const sizeStyles = sizes[size]

    return (
      <div className={clsx('flex items-start gap-3', className)}>
        <div className="relative flex-shrink-0">
          <input
            ref={ref}
            id={toggleId}
            type="checkbox"
            role="switch"
            className="sr-only peer"
            aria-invalid={error}
            aria-describedby={
              errorMessage ? `${toggleId}-error` : helperText ? `${toggleId}-helper` : undefined
            }
            {...props}
          />
          {/* Track */}
          <label
            htmlFor={toggleId}
            className={clsx(
              'block rounded-full cursor-pointer transition-colors duration-200',
              'peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-500 peer-focus:ring-offset-2 peer-focus:ring-offset-surface-900',
              sizeStyles.track,
              props.checked
                ? error
                  ? 'bg-danger-500'
                  : 'bg-accent-500'
                : 'bg-surface-700',
              props.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {/* Thumb */}
            <span
              className={clsx(
                'absolute top-0.5 left-0.5 rounded-full bg-white transition-transform duration-200',
                'peer-checked:transform peer-checked:translate-x-full',
                sizeStyles.thumb,
                props.checked ? sizeStyles.translate : 'translate-x-0'
              )}
            />
          </label>
        </div>

        {(label || helperText || errorMessage) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                htmlFor={toggleId}
                className="block text-sm font-medium text-surface-200 cursor-pointer"
              >
                {label}
              </label>
            )}
            {errorMessage && (
              <p id={`${toggleId}-error`} className="mt-1 text-sm text-danger-400">
                {errorMessage}
              </p>
            )}
            {helperText && !errorMessage && (
              <p id={`${toggleId}-helper`} className="mt-1 text-sm text-surface-500">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Toggle.displayName = 'Toggle'

