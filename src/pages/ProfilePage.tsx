import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, ProgressBar, Badge, Button } from '@/components/ui'
import { XPCounter, StreakBadge, ContributionGrid } from '@/components/gamification'
import { SignOutConfirmModal } from '@/components/auth/SignOutConfirmModal'
import { useStore } from '@/store'
import type { AppState } from '@/store'
import { useAuth } from '@/contexts/AuthContext'
import { getProgressToNextLevel, getXPForNextLevel, LEVEL_THRESHOLDS } from '@/types'
import { curriculum } from '@/content/curriculum'

export function ProfilePage() {
  const { isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()
  const user = useStore((state: AppState) => state.user)
  const progress = useStore((state: AppState) => state.progress)
  const lessonProgress = useStore((state: AppState) => state.lessonProgress)
  const activityHistory = useStore((state: AppState) => state.activityHistory)
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  function handleSignOutClick() {
    setShowSignOutModal(true)
  }

  async function handleSignOutConfirm() {
    setShowSignOutModal(false)
    await signOut()
    navigate('/')
  }

  const totalXP = progress?.totalXP || 0
  const level = progress?.level || 1
  const currentStreak = progress?.currentStreak || 0
  const longestStreak = progress?.longestStreak || 0
  const lessonsCompleted = progress?.lessonsCompleted.length || 0

  const totalLessons = curriculum.modules.reduce(
    (acc, mod) => acc + mod.lessons.length,
    0
  )

  const progressToNext = getProgressToNextLevel(totalXP)
  const xpForNext = getXPForNextLevel(level)
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0
  const xpInCurrentLevel = totalXP - currentThreshold
  const xpNeededForNext = xpForNext - currentThreshold

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        {/* Left Sidebar - Learning Activity */}
        <aside className="lg:sticky lg:top-8 h-fit">
          <Card className="mb-8">
            <ContributionGrid activityHistory={activityHistory} variant="full" />
          </Card>
        </aside>

        {/* Main Content */}
        <div className="min-w-0">
      {/* Profile Header */}
      <Card className="mb-8" variant="gradient" glow="accent">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-glow">
            <span className="text-3xl font-heading font-bold text-surface-900">
              {user?.displayName?.charAt(0).toUpperCase() || 'L'}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-heading font-bold text-surface-50">
              {user?.displayName || 'Learner'}
            </h1>
            <p className="text-surface-400">TypeScript Apprentice</p>
            <div className="flex items-center gap-4 mt-3">
              <Badge variant="accent" size="md">
                Level {level}
              </Badge>
              <XPCounter size="sm" showLevel={false} />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center" hover>
          <div className="text-3xl font-heading font-bold text-gold-300">{totalXP}</div>
          <div className="text-sm text-surface-400">Total XP</div>
        </Card>

        <Card className="text-center" hover>
          <div className="flex justify-center mb-1">
            <StreakBadge size="lg" showLabel={false} />
          </div>
          <div className="text-3xl font-heading font-bold text-gold-300">{currentStreak}</div>
          <div className="text-sm text-surface-400">Day Streak</div>
        </Card>

        <Card className="text-center" hover>
          <div className="text-3xl font-heading font-bold text-success-300">{lessonsCompleted}</div>
          <div className="text-sm text-surface-400">Lessons Done</div>
        </Card>

        <Card className="text-center" hover>
          <div className="text-3xl font-heading font-bold text-accent-300">{longestStreak}</div>
          <div className="text-sm text-surface-400">Best Streak</div>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="mb-8">
        <h2 className="text-lg font-heading font-semibold text-surface-50 mb-4">Level Progress</h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center border border-accent-500/30">
            <span className="text-xl font-heading font-bold text-accent-300">{level}</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm text-surface-400 mb-2">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
            <ProgressBar progress={progressToNext} size="lg" color="accent" />
            <div className="text-center text-sm text-surface-500 mt-2 font-mono">
              {xpInCurrentLevel} / {xpNeededForNext} XP
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-surface-800 flex items-center justify-center border border-surface-700">
            <span className="text-xl font-heading font-bold text-surface-500">{level + 1}</span>
          </div>
        </div>
      </Card>

      {/* Course Progress */}
      <Card className="mb-8">
        <h2 className="text-lg font-heading font-semibold text-surface-50 mb-4">Course Progress</h2>
        <div className="space-y-4">
          {curriculum.modules.map((module) => {
            const completed = module.lessons.filter(
              (id) => lessonProgress[id]?.status === 'completed'
            ).length
            const moduleProgress = completed / module.lessons.length

            return (
              <div key={module.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-surface-200">{module.title}</span>
                  <span className="text-surface-400 font-mono">
                    {completed}/{module.lessons.length}
                  </span>
                </div>
                <ProgressBar
                  progress={moduleProgress}
                  size="sm"
                  color={moduleProgress === 1 ? 'success' : 'accent'}
                />
              </div>
            )
          })}
        </div>

        <div className="mt-6 pt-6 border-t border-surface-700">
          <div className="flex justify-between items-center mb-2">
            <span className="font-heading font-semibold text-surface-100">Overall Progress</span>
            <span className="text-accent-300 font-bold font-mono text-lg">
              {Math.round((lessonsCompleted / totalLessons) * 100)}%
            </span>
          </div>
          <ProgressBar
            progress={lessonsCompleted / totalLessons}
            size="md"
            color="accent"
          />
        </div>
      </Card>

      {/* Achievements Preview */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-semibold text-surface-50">Achievements</h2>
          <span className="text-sm text-surface-500 px-3 py-1 bg-surface-800/50 rounded-full border border-surface-700">Coming soon</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🎯', name: 'First Steps', locked: lessonsCompleted < 1 },
            { icon: '🔥', name: 'Week Warrior', locked: longestStreak < 7 },
            { icon: '💪', name: 'Type Master', locked: lessonsCompleted < 5 },
            { icon: '⚡', name: 'Speed Learner', locked: true },
          ].map((achievement) => (
            <div
              key={achievement.name}
              className={`text-center p-4 rounded-lg border transition-all ${
                achievement.locked
                  ? 'opacity-40 bg-surface-800/30 border-surface-700'
                  : 'bg-accent-500/10 border-accent-500/30 shadow-glow-sm'
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <div className="text-xs font-medium text-surface-300">
                {achievement.name}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Account Settings */}
      <Card>
        <h2 className="text-lg font-heading font-semibold text-surface-50 mb-4">Account</h2>
        {!isAuthenticated ? (
          <div className="bg-gold-500/10 border border-gold-500/20 rounded-lg p-4">
            <p className="text-surface-300 text-sm mb-3">
              You're currently using demo mode. Your progress is saved locally.
            </p>
            <Button variant="primary" onClick={() => navigate('/auth')} glow>
              Sign Up to Sync Progress
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-success-500/10 border border-success-500/20 rounded-lg p-4">
              <p className="text-success-300 text-sm">
                Your progress is synced across all your devices.
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOutClick}>
              Sign Out
            </Button>
          </div>
        )}
      </Card>
        </div>
      </div>

      <SignOutConfirmModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOutConfirm}
      />
    </div>
  )
}
