import { Routes, Route } from 'react-router-dom'
import { Header } from '@/components/navigation'
import { HomePage, CurriculumPage, ProfilePage, LessonPage, PracticePage, PracticeSessionPage, AuthPage } from '@/pages'
import { useEffect } from 'react'
import { useStore } from '@/store'
import { useAuth } from '@/contexts/AuthContext'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { isDemoMode } from '@/lib/supabase'

export default function App() {
  const { isLoading, isAuthenticated } = useAuth()
  const isOnline = useOnlineStatus()
  const setProgress = useStore((state) => state.setProgress)
  const setUser = useStore((state) => state.setUser)
  const progress = useStore((state) => state.progress)
  const user = useStore((state) => state.user)

  // Initialize demo progress if not authenticated and none exists
  useEffect(() => {
    if (!isAuthenticated && (isDemoMode || !isLoading)) {
      if (!progress) {
        setProgress({
          userId: 'demo-user',
          totalXP: 0,
          level: 1,
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: new Date().toISOString().split('T')[0],
          lessonsCompleted: [],
        })
      }
      if (!user) {
        setUser({
          id: 'demo-user',
          email: 'demo@example.com',
          displayName: 'Demo User',
          createdAt: new Date(),
        })
      }
    }
  }, [isAuthenticated, isLoading, progress, user, setProgress, setUser])

  // Show loading screen while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {!isOnline && isAuthenticated && (
        <div className="bg-orange-500 text-white px-4 py-2 text-center text-sm">
          You're offline. Changes will sync when you reconnect.
        </div>
      )}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/session" element={<PracticeSessionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
    </div>
  )
}
