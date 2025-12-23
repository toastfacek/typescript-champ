import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { useStore } from '@/store'
import { getProgressToNextLevel } from '@/types'

interface XPCounterProps {
  size?: 'sm' | 'md' | 'lg'
  showLevel?: boolean
  className?: string
}

export function XPCounter({ size = 'md', showLevel = true, className }: XPCounterProps) {
  const progress = useStore((state) => state.progress)
  const [displayXP, setDisplayXP] = useState(progress?.totalXP || 0)
  const [isAnimating, setIsAnimating] = useState(false)

  const totalXP = progress?.totalXP || 0
  const level = progress?.level || 1
  const progressToNext = getProgressToNextLevel(totalXP)

  // Animate XP changes
  useEffect(() => {
    if (totalXP !== displayXP) {
      setIsAnimating(true)
      const timer = setTimeout(() => {
        setDisplayXP(totalXP)
        setIsAnimating(false)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [totalXP, displayXP])

  const sizes = {
    sm: {
      container: 'gap-1.5',
      icon: 'w-5 h-5',
      text: 'text-sm',
      level: 'text-xs',
    },
    md: {
      container: 'gap-2',
      icon: 'w-6 h-6',
      text: 'text-base',
      level: 'text-sm',
    },
    lg: {
      container: 'gap-3',
      icon: 'w-8 h-8',
      text: 'text-2xl',
      level: 'text-sm',
    },
  }

  const s = sizes[size]

  return (
    <div className={clsx('flex items-center', s.container, className)}>
      {/* XP Icon */}
      <div
        className={clsx(
          'flex items-center justify-center rounded-xl bg-gold-500/20 border border-gold-500/30',
          s.icon,
          'p-1.5'
        )}
      >
        <svg
          className={clsx('text-gold-400', isAnimating && 'xp-animate')}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
        </svg>
      </div>

      {/* XP Value */}
      <div className="flex flex-col">
        <span
          className={clsx(
            'font-bold font-heading text-gold-400',
            s.text,
            isAnimating && 'text-glow-gold'
          )}
        >
          {displayXP.toLocaleString()} <span className="text-surface-500 font-normal">XP</span>
        </span>
        {showLevel && (
          <div className="flex items-center gap-2">
            <span className={clsx('text-surface-500', s.level)}>Level {level}</span>
            <div className="w-16 h-1.5 bg-surface-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full transition-all duration-500"
                style={{ width: `${progressToNext * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
