import { createContext, useContext, useCallback, ReactNode } from 'react'
import { clsx } from 'clsx'

interface SelectionContextValue {
  value: string | string[] | null
  onChange: (value: string) => void
  multiple: boolean
}

const SelectionContext = createContext<SelectionContextValue | null>(null)

function useSelectionContext() {
  const context = useContext(SelectionContext)
  if (!context) {
    throw new Error('SelectionItem must be used within SelectionGroup')
  }
  return context
}

interface SelectionGroupProps {
  children: ReactNode
  value: string | string[] | null
  onChange: (value: string | string[]) => void
  multiple?: boolean
  layout?: 'flex' | 'grid'
  columns?: number
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SelectionGroup({
  children,
  value,
  onChange,
  multiple = false,
  layout = 'flex',
  columns = 1,
  gap = 'md',
  className,
}: SelectionGroupProps) {
  const handleChange = useCallback(
    (itemValue: string) => {
      if (multiple) {
        const currentValue = Array.isArray(value) ? value : []
        const newValue = currentValue.includes(itemValue)
          ? currentValue.filter((v) => v !== itemValue)
          : [...currentValue, itemValue]
        onChange(newValue)
      } else {
        onChange(itemValue)
      }
    },
    [multiple, value, onChange]
  )

  const gapStyles = {
    sm: 'gap-2',
    md: 'gap-3',
    lg: 'gap-4',
  }

  const layoutStyles = {
    flex: 'flex',
    grid: clsx('grid', {
      'grid-cols-1': columns === 1,
      'grid-cols-2': columns === 2,
      'grid-cols-3': columns === 3,
      'grid-cols-4': columns === 4,
    }),
  }

  return (
    <SelectionContext.Provider
      value={{
        value,
        onChange: handleChange,
        multiple,
      }}
    >
      <div className={clsx(layoutStyles[layout], gapStyles[gap], className)}>
        {children}
      </div>
    </SelectionContext.Provider>
  )
}

interface SelectionItemProps {
  children: ReactNode
  value: string
  variant?: 'default' | 'accent' | 'gold' | 'success' | 'warning' | 'danger'
  disabled?: boolean
  icon?: ReactNode
  className?: string
}

export function SelectionItem({
  children,
  value,
  variant = 'default',
  disabled = false,
  icon,
  className,
}: SelectionItemProps) {
  const { value: selectedValue, onChange, multiple } = useSelectionContext()

  const isSelected = multiple
    ? Array.isArray(selectedValue) && selectedValue.includes(value)
    : selectedValue === value

  const handleClick = () => {
    if (!disabled) {
      onChange(value)
    }
  }

  const variants = {
    default: {
      base: 'bg-surface-800/50 border-surface-700/50 text-surface-200',
      selected: 'bg-accent-500/10 border-accent-500 text-accent-300',
      hover: 'hover:border-surface-600 hover:bg-surface-800',
    },
    accent: {
      base: 'bg-surface-800/50 border-surface-700/50 text-surface-200',
      selected: 'bg-accent-500/10 border-accent-500 text-accent-300',
      hover: 'hover:border-accent-500/50 hover:bg-accent-500/5',
    },
    gold: {
      base: 'bg-surface-800/50 border-surface-700/50 text-surface-200',
      selected: 'bg-gold-500/10 border-gold-500 text-gold-300',
      hover: 'hover:border-gold-500/50 hover:bg-gold-500/5',
    },
    success: {
      base: 'bg-surface-800/50 border-surface-700/50 text-surface-200',
      selected: 'bg-success-500/10 border-success-500 text-success-300',
      hover: 'hover:border-success-500/50 hover:bg-success-500/5',
    },
    warning: {
      base: 'bg-surface-800/50 border-surface-700/50 text-surface-200',
      selected: 'bg-warning-500/10 border-warning-500 text-warning-300',
      hover: 'hover:border-warning-500/50 hover:bg-warning-500/5',
    },
    danger: {
      base: 'bg-surface-800/50 border-surface-700/50 text-surface-200',
      selected: 'bg-danger-500/10 border-danger-500 text-danger-300',
      hover: 'hover:border-danger-500/50 hover:bg-danger-500/5',
    },
  }

  const variantStyles = variants[variant]

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={clsx(
        'relative rounded-xl border-2 p-4 text-left transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-900',
        disabled && 'opacity-50 cursor-not-allowed',
        isSelected
          ? clsx(variantStyles.selected, 'ring-2 ring-offset-2 ring-offset-surface-900', {
              'ring-accent-500': variant === 'accent' || variant === 'default',
              'ring-gold-500': variant === 'gold',
              'ring-success-500': variant === 'success',
              'ring-warning-500': variant === 'warning',
              'ring-danger-500': variant === 'danger',
            })
          : clsx(variantStyles.base, variantStyles.hover),
        className
      )}
      aria-pressed={isSelected}
      aria-disabled={disabled}
    >
      {icon && <div className="mb-2">{icon}</div>}
      <div className="font-medium">{children}</div>
    </button>
  )
}

