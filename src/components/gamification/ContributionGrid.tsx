import { useState, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'
import type { ActivityHistory, ContributionViewMode } from '@/types/gamification'

interface ContributionGridProps {
  activityHistory: ActivityHistory
  variant?: 'compact' | 'full'
  nextLessonId?: string | null
}

interface GridDay {
  date: Date
  count: number
  intensity: 'none' | 'light' | 'medium' | 'dark'
}

export function ContributionGrid({ activityHistory, variant = 'full', nextLessonId = null }: ContributionGridProps) {
  const [viewMode, setViewMode] = useState<ContributionViewMode>('1month')
  const [hoveredDay, setHoveredDay] = useState<GridDay | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Compact mode: always show last 7 days
  const compactDays = useMemo(() => {
    const days: GridDay[] = []
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)
      
      const dateStr = date.toISOString().split('T')[0]
      const count = activityHistory[dateStr] || 0
      
      let intensity: 'none' | 'light' | 'medium' | 'dark'
      if (count === 0) {
        intensity = 'none'
      } else if (count === 1) {
        intensity = 'light'
      } else if (count >= 2 && count <= 3) {
        intensity = 'medium'
      } else {
        intensity = 'dark'
      }
      
      days.push({ date, count, intensity })
    }
    
    return days
  }, [activityHistory])

  // Calculate activity count for this week (compact mode)
  const weekActivityCount = useMemo(() => {
    return compactDays.filter(d => d.count > 0).length
  }, [compactDays])

  // Calculate date range based on view mode (full mode only)
  const { startDate, endDate } = useMemo(() => {
    if (variant === 'compact') {
      return { startDate: new Date(), endDate: new Date() }
    }

    const end = new Date()
    end.setHours(23, 59, 59, 999)
    
    let start = new Date(end)
    
    switch (viewMode) {
      case '1week':
        start.setDate(start.getDate() - 7)
        break
      case '1month':
        start.setMonth(start.getMonth() - 1)
        start.setDate(1)
        break
      case '1quarter':
        start.setMonth(start.getMonth() - 3)
        start.setDate(1)
        break
      case '12months':
        start.setMonth(start.getMonth() - 12)
        start.setDate(1)
        break
    }
    
    start.setHours(0, 0, 0, 0)

    return {
      startDate: start,
      endDate: end,
    }
  }, [viewMode, variant])

  // Generate grid data (full mode)
  const gridData = useMemo(() => {
    if (variant === 'compact') return []
    
    const days: GridDay[] = []
    const currentDate = new Date(startDate)

    // Find the first Monday on or before start date
    const dayOfWeek = currentDate.getDay()
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    currentDate.setDate(currentDate.getDate() - daysToMonday)

    // End at today (don't show future days)
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    
    // Calculate total days to generate (up to today)
    const totalDays = Math.ceil((today.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(currentDate)
      date.setDate(date.getDate() + i)
      
      // Don't go past today
      if (date > today) break

      const dateStr = date.toISOString().split('T')[0]
      const count = activityHistory[dateStr] || 0

      // Calculate intensity
      let intensity: 'none' | 'light' | 'medium' | 'dark'
      if (count === 0) {
        intensity = 'none'
      } else if (count === 1) {
        intensity = 'light'
      } else if (count >= 2 && count <= 3) {
        intensity = 'medium'
      } else {
        intensity = 'dark'
      }

      days.push({ date, count, intensity })
    }

    return days
  }, [startDate, activityHistory, variant])

  // Group days into weeks (7 days per week) - full mode
  const weeksData = useMemo(() => {
    if (variant === 'compact') return []
    
    const today = new Date()
    today.setHours(23, 59, 59, 999)
    
    const weeks: GridDay[][] = []
    for (let i = 0; i < gridData.length; i += 7) {
      const week = gridData.slice(i, i + 7)
      
      // Ensure week always has 7 days - pad with future days if needed
      while (week.length < 7) {
        const lastDay = week[week.length - 1]?.date
        if (lastDay) {
          const nextDay = new Date(lastDay)
          nextDay.setDate(nextDay.getDate() + 1)
          // Mark as future day (date > today)
          week.push({ date: nextDay, count: 0, intensity: 'none' })
        } else {
          break
        }
      }
      
      weeks.push(week)
    }
    // Reverse so newest week is at top
    return weeks.reverse()
  }, [gridData, variant])


  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getIntensityColor = (intensity: GridDay['intensity']): string => {
    switch (intensity) {
      case 'none':
        return 'bg-surface-700'
      case 'light':
        return 'bg-accent-500/30'
      case 'medium':
        return 'bg-accent-500/60'
      case 'dark':
        return 'bg-accent-500'
      default:
        return 'bg-surface-700'
    }
  }

  // Compact mode render
  if (variant === 'compact') {
    const weekdayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    
    return (
      <div className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-surface-100">Your Week</h3>
          {nextLessonId && (
            <Link to={`/lesson/${nextLessonId}`}>
              <Button size="sm" variant="outline" className="group">
                Continue Lesson
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          )}
        </div>
        
        {/* Weekday Labels */}
        <div className="flex gap-2 mb-2">
          {weekdayLabels.map((day) => (
            <div key={day} className="flex-1 text-center text-xs text-surface-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Activity Boxes */}
        <div className="flex gap-2 mb-3">
          {compactDays.map((day, idx) => (
            <div
              key={idx}
              className={`flex-1 aspect-square rounded transition-all cursor-pointer ${getIntensityColor(day.intensity)} ${
                hoveredDay?.date.getTime() === day.date.getTime()
                  ? 'ring-2 ring-accent-400 scale-105'
                  : 'hover:ring-2 hover:ring-accent-400/50'
              }`}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            />
          ))}
        </div>
        
        {/* Activity Summary */}
        <div className="text-sm text-surface-400">
          {weekActivityCount > 0 ? (
            <span>
              {weekActivityCount} {weekActivityCount === 1 ? 'day' : 'days'} this week · Keep your streak going!
            </span>
          ) : (
            <span>Start learning today to build your streak!</span>
          )}
        </div>
        
        {/* Tooltip */}
        {hoveredDay && (
          <div className="absolute z-50 px-3 py-2 bg-surface-800 border border-surface-700 rounded-lg shadow-lg text-sm pointer-events-none"
            style={{
              left: '50%',
              top: '-80px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="font-medium text-surface-100">
              {hoveredDay.count} {hoveredDay.count === 1 ? 'activity' : 'activities'}
            </div>
            <div className="text-surface-400 text-xs mt-0.5">
              {formatDate(hoveredDay.date)}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Full mode render - vertical orientation
  return (
    <div className="w-full relative">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-100">Learning Activity</h3>
        <div className="flex gap-1 bg-surface-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('1week')}
            className={`px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              viewMode === '1week'
                ? 'bg-accent-500 text-surface-900'
                : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            1W
          </button>
          <button
            onClick={() => setViewMode('1month')}
            className={`px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              viewMode === '1month'
                ? 'bg-accent-500 text-surface-900'
                : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            1M
          </button>
          <button
            onClick={() => setViewMode('1quarter')}
            className={`px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              viewMode === '1quarter'
                ? 'bg-accent-500 text-surface-900'
                : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            1Q
          </button>
          <button
            onClick={() => setViewMode('12months')}
            className={`px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              viewMode === '12months'
                ? 'bg-accent-500 text-surface-900'
                : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            1Y
          </button>
        </div>
      </div>

      {/* Grid Container - Vertical Orientation */}
      <div ref={gridRef}>
        <div className="w-full">
          {/* Weekday Headers (columns) */}
          <div className="flex gap-1 mb-2" style={{ paddingLeft: '60px' }}>
            {['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((day) => (
              <div key={day} className="flex-1 text-center text-xs text-surface-500">
                {day}
              </div>
            ))}
          </div>

          {/* Weeks as Rows */}
          <div className="flex flex-col gap-1">
            {weeksData.map((week, weekIndex) => {
              // Get week label (first day of week)
              const weekStart = week[0]?.date
              const weekLabel = weekStart
                ? weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                : ''
              
              return (
                <div key={weekIndex} className="flex gap-1 items-center">
                  {/* Week Label */}
                  <div className="w-14 text-xs text-surface-500 text-right pr-2 shrink-0">
                    {weekLabel}
                  </div>
                  
                  {/* Days in Week */}
                  <div className="flex gap-1 flex-1">
                    {week.map((day, dayIndex) => {
                      const today = new Date()
                      today.setHours(23, 59, 59, 999)
                      const isFuture = day.date > today
                      const isInRange = day.date >= startDate && day.date <= endDate
                      
                      if (!isInRange) {
                        return (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className="flex-1 aspect-square rounded"
                            style={{ backgroundColor: 'transparent' }}
                          />
                        )
                      }

                      // Future days in current week - render as transparent
                      if (isFuture) {
                        return (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className="flex-1 aspect-square rounded"
                            style={{ backgroundColor: 'transparent' }}
                          />
                        )
                      }

                      return (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={`flex-1 aspect-square rounded transition-all cursor-pointer ${getIntensityColor(day.intensity)} ${
                            hoveredDay?.date.getTime() === day.date.getTime()
                              ? 'ring-2 ring-accent-400 scale-110'
                              : 'hover:ring-2 hover:ring-accent-400/50'
                          }`}
                          onMouseEnter={(e) => {
                            setHoveredDay(day)
                            if (gridRef.current) {
                              const rect = gridRef.current.getBoundingClientRect()
                              const targetRect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                              setTooltipPosition({
                                x: targetRect.left - rect.left + targetRect.width / 2,
                                y: targetRect.top - rect.top,
                              })
                            }
                          }}
                          onMouseLeave={() => {
                            setHoveredDay(null)
                            setTooltipPosition(null)
                          }}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-sm text-surface-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-surface-700" />
          <div className="w-3 h-3 rounded bg-accent-500/30" />
          <div className="w-3 h-3 rounded bg-accent-500/60" />
          <div className="w-3 h-3 rounded bg-accent-500" />
        </div>
        <span>More</span>
      </div>

      {/* Tooltip */}
      {hoveredDay && tooltipPosition && (
        <div
          className="absolute z-50 px-3 py-2 bg-surface-800 border border-surface-700 rounded-lg shadow-lg text-sm pointer-events-none"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 60}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="font-medium text-surface-100">
            {hoveredDay.count} {hoveredDay.count === 1 ? 'activity' : 'activities'}
          </div>
          <div className="text-surface-400 text-xs mt-0.5">
            {formatDate(hoveredDay.date)}
          </div>
        </div>
      )}
    </div>
  )
}
