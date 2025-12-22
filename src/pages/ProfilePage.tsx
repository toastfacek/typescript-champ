import { useNavigate } from 'react-router-dom'
import { Card, ProgressBar, Badge, Button } from '@/components/ui'
import { XPCounter, StreakBadge } from '@/components/gamification'
import { useStore } from '@/store'
import { useAuth } from '@/contexts/AuthContext'
import { getProgressToNextLevel, getXPForNextLevel, LEVEL_THRESHOLDS } from '@/types'
import { curriculum } from '@/content/curriculum'

export function ProfilePage() {
  const { isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()
  const user = useStore((state) => state.user)
  const progress = useStore((state) => state.progress)
  const lessonProgress = useStore((state) => state.lessonProgress)

  async function handleSignOut() {
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">
              {user?.displayName?.charAt(0).toUpperCase() || 'L'}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.displayName || 'Learner'}
            </h1>
            <p className="text-gray-500">TypeScript Apprentice</p>
            <div className="flex items-center gap-4 mt-2">
              <Badge variant="primary" size="md">
                Level {level}
              </Badge>
              <XPCounter size="sm" showLevel={false} />
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="text-center">
          <div className="text-3xl font-bold text-primary-600">{totalXP}</div>
          <div className="text-sm text-gray-500">Total XP</div>
        </Card>

        <Card className="text-center">
          <div className="flex justify-center mb-1">
            <StreakBadge size="lg" showLabel={false} />
          </div>
          <div className="text-3xl font-bold text-orange-500">{currentStreak}</div>
          <div className="text-sm text-gray-500">Day Streak</div>
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-success-600">{lessonsCompleted}</div>
          <div className="text-sm text-gray-500">Lessons Done</div>
        </Card>

        <Card className="text-center">
          <div className="text-3xl font-bold text-secondary-600">{longestStreak}</div>
          <div className="text-sm text-gray-500">Best Streak</div>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Level Progress</h2>
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-xl font-bold text-primary-600">{level}</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
            <ProgressBar progress={progressToNext} size="lg" />
            <div className="text-center text-sm text-gray-500 mt-1">
              {xpInCurrentLevel} / {xpNeededForNext} XP
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-xl font-bold text-gray-400">{level + 1}</span>
          </div>
        </div>
      </Card>

      {/* Course Progress */}
      <Card className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h2>
        <div className="space-y-4">
          {curriculum.modules.map((module) => {
            const completed = module.lessons.filter(
              (id) => lessonProgress[id]?.status === 'completed'
            ).length
            const moduleProgress = completed / module.lessons.length

            return (
              <div key={module.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{module.title}</span>
                  <span className="text-gray-500">
                    {completed}/{module.lessons.length}
                  </span>
                </div>
                <ProgressBar
                  progress={moduleProgress}
                  size="sm"
                  color={moduleProgress === 1 ? 'success' : 'primary'}
                />
              </div>
            )
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Overall Progress</span>
            <span className="text-primary-600 font-bold">
              {Math.round((lessonsCompleted / totalLessons) * 100)}%
            </span>
          </div>
          <ProgressBar
            progress={lessonsCompleted / totalLessons}
            size="md"
            className="mt-2"
          />
        </div>
      </Card>

      {/* Achievements Preview */}
      <Card className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Achievements</h2>
          <span className="text-sm text-gray-500">Coming soon</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: '🎯', name: 'First Steps', locked: lessonsCompleted < 1 },
            { icon: '🔥', name: 'Week Warrior', locked: longestStreak < 7 },
            { icon: '💪', name: 'Type Master', locked: lessonsCompleted < 5 },
            { icon: '⚡', name: 'Speed Learner', locked: true },
          ].map((achievement) => (
            <div
              key={achievement.name}
              className={`text-center p-4 rounded-lg ${
                achievement.locked ? 'opacity-40' : 'bg-primary-50'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <div className="text-xs font-medium text-gray-700">
                {achievement.name}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Account Settings */}
      <Card>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
        {!isAuthenticated ? (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 text-sm mb-3">
              You're currently using demo mode. Your progress is saved locally.
            </p>
            <Button variant="primary" onClick={() => navigate('/auth')}>
              Sign Up to Sync Progress
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-success-50 rounded-lg p-4">
              <p className="text-success-700 text-sm">
                Your progress is synced across all your devices.
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        )}
      </Card>
    </div>
  )
}
