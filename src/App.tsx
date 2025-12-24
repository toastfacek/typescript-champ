import { Routes, Route } from 'react-router-dom'
import { Header } from '@/components/navigation'
import { HomePage, CurriculumPage, ProfilePage, LessonPage, PracticePage, PracticeSessionPage, FocusedPracticePage, AuthPage } from '@/pages'
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-surface-700 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-accent-500 rounded-full border-t-transparent animate-spin" />
          </div>
          <p className="mt-4 text-surface-500 font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {!isOnline && isAuthenticated && (
        <div className="bg-gold-500/20 border-b border-gold-500/30 text-gold-400 px-4 py-2 text-center text-sm">
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
            </svg>
            You're offline. Changes will sync when you reconnect.
          </span>
        </div>
      )}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/session" element={<PracticeSessionPage />} />
          <Route path="/practice/focused/:lessonId" element={<FocusedPracticePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </main>
    </div>
  )
}
