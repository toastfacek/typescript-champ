import { clsx } from 'clsx'
import { useStore } from '@/store'

interface StreakBadgeProps {
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export function StreakBadge({ size = 'md', showLabel = true, className }: StreakBadgeProps) {
  const progress = useStore((state) => state.progress)
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
          <path d="M12 23C16.1421 23 19.5 19.6421 19.5 15.5C19.5 14.1395 19.1774 12.8533 18.6004 11.7079C18.4771 11.4621 18.1886 11.3528 17.9343 11.4571C17.6801 11.5614 17.5497 11.8401 17.6319 12.1016C17.8722 12.8656 18 13.6697 18 14.5C18 18.0899 15.0899 21 11.5 21C7.91015 21 5 18.0899 5 14.5C5 11.3355 7.25221 8.67433 10.25 8.08658V10.25C10.25 10.4489 10.329 10.6397 10.4697 10.7803C10.6103 10.921 10.8011 11 11 11C11.1989 11 11.3897 10.921 11.5303 10.7803L15.2803 7.03033C15.421 6.88968 15.5 6.69891 15.5 6.5C15.5 6.30109 15.421 6.11032 15.2803 5.96967L11.5303 2.21967C11.3897 2.07902 11.1989 2 11 2C10.8011 2 10.6103 2.07902 10.4697 2.21967C10.329 2.36032 10.25 2.55109 10.25 2.75V5.56689C5.81049 6.19519 2.5 10.0564 2.5 14.75C2.5 19.8586 6.64137 24 11.75 24C11.8333 24 11.9167 23.9983 12 23.995V23Z" />
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
