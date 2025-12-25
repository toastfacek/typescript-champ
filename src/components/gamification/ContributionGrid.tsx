import { useState, useMemo, useRef } from 'react'
import type { ActivityHistory, ContributionViewMode } from '@/types/gamification'

interface ContributionGridProps {
  activityHistory: ActivityHistory
}

interface GridDay {
  date: Date
  count: number
  intensity: 'none' | 'light' | 'medium' | 'dark'
}

export function ContributionGrid({ activityHistory }: ContributionGridProps) {
  const [viewMode, setViewMode] = useState<ContributionViewMode>('1month')
  const [hoveredDay, setHoveredDay] = useState<GridDay | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  // Calculate date range based on view mode
  const { startDate, endDate, weeks } = useMemo(() => {
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
      case '3months':
        start.setMonth(start.getMonth() - 3)
        start.setDate(1)
        break
      case '6months':
        start.setMonth(start.getMonth() - 6)
        start.setDate(1)
        break
      case '12months':
        start.setMonth(start.getMonth() - 12)
        start.setDate(1)
        break
    }
    
    start.setHours(0, 0, 0, 0)

    // Calculate number of weeks
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    const weeksCount = Math.ceil(daysDiff / 7)

    return {
      startDate: start,
      endDate: end,
      weeks: weeksCount,
    }
  }, [viewMode])

  // Generate grid data
  const gridData = useMemo(() => {
    const days: GridDay[] = []
    const currentDate = new Date(startDate)

    // Find the first Monday on or before start date
    const dayOfWeek = currentDate.getDay()
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    currentDate.setDate(currentDate.getDate() - daysToMonday)

    // Generate all days in the grid (weeks * 7 days)
    const totalDays = weeks * 7
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(currentDate)
      date.setDate(date.getDate() + i)

      // Skip if date is after end date
      if (date > endDate) break

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
  }, [startDate, endDate, weeks, activityHistory])

  // Group days into weeks (7 days per week)
  const weeksData = useMemo(() => {
    const weeks: GridDay[][] = []
    for (let i = 0; i < gridData.length; i += 7) {
      weeks.push(gridData.slice(i, i + 7))
    }
    return weeks
  }, [gridData])

  // Get month labels for top of grid - simplified approach
  const monthLabels = useMemo(() => {
    const labels: Array<{ month: string; weekIndex: number }> = []
    const seenMonths = new Set<string>()

    // Find the first week that contains the 1st of each month
    weeksData.forEach((week, weekIndex) => {
      if (week.length > 0) {
        const firstDay = week[0].date
        const monthKey = `${firstDay.getFullYear()}-${firstDay.getMonth()}`
        
        // Only add label if this is the first week of the month (1st is in this week)
        const firstOfMonth = new Date(firstDay.getFullYear(), firstDay.getMonth(), 1)
        const weekStart = week[0].date
        const weekEnd = week[week.length - 1].date
        
        if (!seenMonths.has(monthKey) && firstOfMonth >= weekStart && firstOfMonth <= weekEnd) {
          seenMonths.add(monthKey)
          const monthName = firstDay.toLocaleDateString('en-US', { month: 'short' })
          labels.push({ month: monthName, weekIndex })
        }
      }
    })

    return labels
  }, [weeksData])

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


  return (
    <div className="w-full relative">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-surface-100">Your Learning Activity</h3>
        <div className="flex gap-1 bg-surface-800 rounded-lg p-1 flex-wrap">
          <button
            onClick={() => setViewMode('1week')}
            className={`px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              viewMode === '1week'
                ? 'bg-accent-500 text-surface-900'
                : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            1 week
          </button>
          <button
            onClick={() => setViewMode('1month')}
            className={`px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              viewMode === '1month'
                ? 'bg-accent-500 text-surface-900'
                : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            1 month
          </button>
          <button
            onClick={() => setViewMode('3months')}
            className={`px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              viewMode === '3months'
                ? 'bg-accent-500 text-surface-900'
                : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            3 months
          </button>
          <button
            onClick={() => setViewMode('6months')}
            className={`px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              viewMode === '6months'
                ? 'bg-accent-500 text-surface-900'
                : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            6 months
          </button>
          <button
            onClick={() => setViewMode('12months')}
            className={`px-2 py-1.5 text-xs font-medium rounded transition-colors ${
              viewMode === '12months'
                ? 'bg-accent-500 text-surface-900'
                : 'text-surface-400 hover:text-surface-200'
            }`}
          >
            12 months
          </button>
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto" ref={gridRef}>
        <div className="inline-block min-w-full">
          {/* Month Labels */}
          <div className="flex mb-2" style={{ paddingLeft: '24px' }}>
            {monthLabels.map((label, idx) => {
              // Each week is 10px (square) + 4px (gap) = 14px wide
              const weekWidth = 14
              const prevWeekIndex = idx > 0 ? monthLabels[idx - 1].weekIndex : 0
              const weekOffset = (label.weekIndex - prevWeekIndex) * weekWidth
              
              return (
                <div
                  key={idx}
                  className="text-xs text-surface-500 whitespace-nowrap"
                  style={{
                    marginLeft: idx === 0 ? '0' : `${weekOffset}px`,
                  }}
                >
                  {label.month}
                </div>
              )
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {/* Weekday Labels */}
            <div className="flex flex-col gap-1 mr-2">
              {[0, 2, 4].map((dayIdx) => {
                // Each row is 10px (square) + 4px (gap) = 14px tall
                const rowHeight = 14
                // For Mon (0): no margin, Wed (2): 2 rows down = 28px, Fri (4): 4 rows down = 56px
                // But we need to account for the gap-1 (4px) between rows
                const marginTop = dayIdx === 0 ? 0 : dayIdx * rowHeight
                return (
                  <div
                    key={dayIdx}
                    className="text-xs text-surface-500"
                    style={{ 
                      height: `${rowHeight}px`, 
                      lineHeight: `${rowHeight}px`,
                      marginTop: `${marginTop}px`
                    }}
                  >
                    {dayIdx === 0 ? 'Mon' : dayIdx === 2 ? 'Wed' : 'Fri'}
                  </div>
                )
              })}
            </div>

            {/* Contribution Squares */}
            <div className="flex gap-1 flex-1">
              {weeksData.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => {
                    const isInRange = day.date >= startDate && day.date <= endDate
                    if (!isInRange) {
                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className="rounded"
                        style={{ width: '10px', height: '10px' }}
                      />
                    )
                    }

                    return (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`rounded transition-all cursor-pointer ${getIntensityColor(day.intensity)} ${
                          hoveredDay?.date.getTime() === day.date.getTime()
                            ? 'ring-2 ring-accent-400 scale-110'
                            : 'hover:ring-2 hover:ring-accent-400/50'
                        }`}
                        style={{ width: '10px', height: '10px' }}
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
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-sm text-surface-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="rounded bg-surface-700" style={{ width: '10px', height: '10px' }} />
          <div className="rounded bg-accent-500/30" style={{ width: '10px', height: '10px' }} />
          <div className="rounded bg-accent-500/60" style={{ width: '10px', height: '10px' }} />
          <div className="rounded bg-accent-500" style={{ width: '10px', height: '10px' }} />
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

