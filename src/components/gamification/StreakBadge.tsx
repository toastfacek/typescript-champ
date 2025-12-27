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
          fill="currentColor"
          className={clsx(
            s.icon,
            isActive ? 'text-gold-400' : 'text-surface-500',
            isActive && 'streak-animate'
          )}
        >
          <path d="M12.75 3.033c0 1.96-1.922 2.533-2.6 4.675C9.75 9.067 11.25 10.3 11.25 12.067c0 2.275-2.031 3.292-2.738 5.125A6 6 0 1119.5 13.5c0-1.875-1.133-3.033-2.25-4.467-.625-.8-1.5-1.917-2.125-3.033-.483-.867-.842-1.775-1.542-2.292-.55-.408-1.558-.517-1.833-.675z" />
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
