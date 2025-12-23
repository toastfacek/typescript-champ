import { createContext, useContext, useState, ReactNode, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface TabsContextValue {
  value: string
  onChange: (value: string) => void
  variant: 'underline' | 'pills' | 'enclosed'
}

const TabsContext = createContext<TabsContextValue | null>(null)

function useTabsContext() {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within Tabs')
  }
  return context
}

interface TabsProps {
  children: ReactNode
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  variant?: 'underline' | 'pills' | 'enclosed'
  className?: string
}

export function Tabs({
  children,
  defaultValue,
  value: controlledValue,
  onChange: controlledOnChange,
  variant = 'underline',
  className,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '')
  const isControlled = controlledValue !== undefined

  const value = isControlled ? controlledValue : internalValue

  const handleChange = (newValue: string) => {
    if (!isControlled) {
      setInternalValue(newValue)
    }
    controlledOnChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{ value, onChange: handleChange, variant }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function TabsList({ children, className, ...props }: TabsListProps) {
  const { variant } = useTabsContext()

  const variants = {
    underline: 'border-b border-surface-700',
    pills: 'bg-surface-800/50 rounded-xl p-1',
    enclosed: 'border border-surface-700 rounded-t-xl bg-surface-800/30',
  }

  return (
    <div
      className={clsx('flex', variants[variant], className)}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  )
}

interface TabsTabProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  value: string
  disabled?: boolean
}

export function TabsTab({
  children,
  value,
  disabled = false,
  className,
  ...props
}: TabsTabProps) {
  const { value: selectedValue, onChange, variant } = useTabsContext()
  const isSelected = selectedValue === value

  const variants = {
    underline: clsx(
      'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-surface-900',
      isSelected
        ? 'border-accent-500 text-accent-400'
        : 'border-transparent text-surface-400 hover:text-surface-200 hover:border-surface-600',
      disabled && 'opacity-50 cursor-not-allowed'
    ),
    pills: clsx(
      'px-4 py-2 text-sm font-medium rounded-lg transition-all',
      'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-surface-900',
      isSelected
        ? 'bg-accent-500/20 text-accent-400'
        : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50',
      disabled && 'opacity-50 cursor-not-allowed'
    ),
    enclosed: clsx(
      'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-surface-900',
      isSelected
        ? 'border-accent-500 text-accent-400 bg-surface-900'
        : 'border-transparent text-surface-400 hover:text-surface-200 hover:bg-surface-800/50',
      disabled && 'opacity-50 cursor-not-allowed'
    ),
  }

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={() => !disabled && onChange(value)}
      className={clsx(variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}

interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  value: string
}

export function TabsPanel({
  children,
  value,
  className,
  ...props
}: TabsPanelProps) {
  const { value: selectedValue, variant } = useTabsContext()
  const isSelected = selectedValue === value

  const panelVariants = {
    underline: 'mt-4',
    pills: 'mt-4',
    enclosed: clsx(
      'border border-surface-700 border-t-0 rounded-b-xl p-6',
      'bg-surface-800/50'
    ),
  }

  if (!isSelected) return null

  return (
    <div
      role="tabpanel"
      className={clsx(panelVariants[variant], className)}
      {...props}
    >
      {children}
    </div>
  )
}

// Compound component exports
Tabs.List = TabsList
Tabs.Tab = TabsTab
Tabs.Panel = TabsPanel

