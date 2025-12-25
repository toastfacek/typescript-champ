// Achievement definition
export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'progress' | 'streak' | 'skill' | 'special'
  xpReward: number
  condition: AchievementCondition
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export type AchievementCondition =
  | { type: 'lessons_completed'; count: number }
  | { type: 'streak_days'; count: number }
  | { type: 'total_xp'; amount: number }
  | { type: 'perfect_lesson'; lessonId?: string }
  | { type: 'speed_run'; lessonId: string; maxSeconds: number }
  | { type: 'no_hints'; lessonId: string }

// User's unlocked achievement
export interface UserAchievement {
  achievementId: string
  userId: string
  unlockedAt: Date
  notified: boolean
}

// XP transaction for history
export interface XPTransaction {
  id: string
  userId: string
  amount: number
  source: 'lesson' | 'achievement' | 'streak_bonus' | 'daily_bonus'
  sourceId?: string
  timestamp: Date
}

// Level thresholds - XP required for each level
export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  850,    // Level 5
  1300,   // Level 6
  1900,   // Level 7
  2600,   // Level 8
  3500,   // Level 9
  4600,   // Level 10
  5900,   // Level 11
  7400,   // Level 12
  9100,   // Level 13
  11000,  // Level 14
  13100,  // Level 15
]

export function getLevelFromXP(totalXP: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_THRESHOLDS[i]) {
      return i + 1
    }
  }
  return 1
}

export function getXPForNextLevel(currentLevel: number): number {
  if (currentLevel >= LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + 2000
  }
  return LEVEL_THRESHOLDS[currentLevel]
}

export function getProgressToNextLevel(totalXP: number): number {
  const level = getLevelFromXP(totalXP)
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0
  const nextThreshold = LEVEL_THRESHOLDS[level] || currentThreshold + 2000
  const progress = (totalXP - currentThreshold) / (nextThreshold - currentThreshold)
  return Math.min(Math.max(progress, 0), 1)
}

// Daily activity tracking for contribution grid
export interface DailyActivity {
  date: string // YYYY-MM-DD format
  count: number // Number of activities on this day
}

export type ActivityHistory = Record<string, number> // date string -> activity count

export type ContributionViewMode = '1week' | '1month' | '1quarter' | '12months'
