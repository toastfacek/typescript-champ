import { clsx } from 'clsx'
import { useStore } from '@/store'
import type { AppState } from '@/store'

interface StreakBadgeProps {
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function StreakBadge({ size = 'md', showLabel = true, className }: StreakBadgeProps) {
  const progress = useStore((state: AppState) => state.progress)
  const streak = progress?.currentStreak || 0
  const isActive = streak > 0

  const sizes = {
    sm: {
      container: 'gap-1.5',
      icon: 'w-5 h-5',
      text: 'text-sm',
    },
    md: {
      container: 'gap-2',
      icon: 'w-6 h-6',
      text: 'text-base',
    },
    lg: {
      container: 'gap-3',
      icon: 'w-8 h-8',
      text: 'text-2xl',
    },
  }

  const s = sizes[size]

  return (
    <div
      className={clsx(
        'flex items-center',
        s.container,
        className
      )}
    >
      {/* Fire Icon */}
      <div className={clsx(
        'flex items-center justify-center rounded-xl p-1.5',
        isActive
          ? 'bg-gold-500/20 border border-gold-500/30'
          : 'bg-surface-700/50 border border-surface-600'
      )}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={clsx(
            s.icon,
            isActive && 'streak-animate'
          )}
        >
          {/* Outer flame */}
          <path
            d="M12 2C12 2 7 7.5 7 12.5C7 16.09 9.24 19.09 12.5 20C12.5 20 10.5 18 10.5 15.5C10.5 13 12 11 12 11C12 11 13.5 13 13.5 15.5C13.5 18 11.5 20 11.5 20C14.76 19.09 17 16.09 17 12.5C17 7.5 12 2 12 2Z"
            fill={isActive ? '#F59E0B' : 'currentColor'}
            className={!isActive ? 'text-surface-500' : ''}
          />
          {/* Inner flame highlight */}
          <path
            d="M12 8C12 8 9.5 11 9.5 13.5C9.5 15.43 10.57 17 12 17C13.43 17 14.5 15.43 14.5 13.5C14.5 11 12 8 12 8Z"
            fill={isActive ? '#FBBF24' : 'currentColor'}
            className={!isActive ? 'text-surface-400' : ''}
          />
          {/* Core glow */}
          {isActive && (
            <path
              d="M12 12C12 12 11 13.5 11 14.5C11 15.33 11.45 16 12 16C12.55 16 13 15.33 13 14.5C13 13.5 12 12 12 12Z"
              fill="#FDE68A"
            />
          )}
        </svg>
      </div>

      {/* Streak Count */}
      {showLabel && (
        <span
          className={clsx(
            'font-bold font-heading',
            s.text,
            isActive ? 'text-gold-400' : 'text-surface-500'
          )}
        >
          {streak}
        </span>
      )}
    </div>
  )
}
