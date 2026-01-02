import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { Header } from '@/components/navigation'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { useStore } from '@/store'
import type { AppState } from '@/store'
import { useAuth } from '@/contexts/AuthContext'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { useTheme } from '@/hooks/useTheme'
import { isDemoMode } from '@/lib/supabase'

// Lazy load all pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const CurriculumPage = lazy(() => import('@/pages/CurriculumPage').then(m => ({ default: m.CurriculumPage })))
const ProfilePage = lazy(() => import('@/pages/ProfilePage').then(m => ({ default: m.ProfilePage })))
const LessonPage = lazy(() => import('@/pages/LessonPage').then(m => ({ default: m.LessonPage })))
const PracticePage = lazy(() => import('@/pages/PracticePage').then(m => ({ default: m.PracticePage })))
const PracticeSessionPage = lazy(() => import('@/pages/PracticeSessionPage').then(m => ({ default: m.PracticeSessionPage })))
const FocusedPracticePage = lazy(() => import('@/pages/FocusedPracticePage').then(m => ({ default: m.FocusedPracticePage })))
const VibeTutorPage = lazy(() => import('@/pages/VibeTutorPage').then(m => ({ default: m.VibeTutorPage })))
const ProjectsPage = lazy(() => import('@/pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })))
const VibeTutorScopingPage = lazy(() => import('@/components/vibe-tutor/VibeTutorScoping').then(m => ({ default: m.VibeTutorScoping })))
const AuthPage = lazy(() => import('@/pages/AuthPage').then(m => ({ default: m.AuthPage })))

export default function App() {
  const { isLoading, isAuthenticated } = useAuth()
  const isOnline = useOnlineStatus()
  const setProgress = useStore((state: AppState) => state.setProgress)
  const setUser = useStore((state: AppState) => state.setUser)
  const progress = useStore((state: AppState) => state.progress)
  const user = useStore((state: AppState) => state.user)
  const recalculateStreakFromHistory = useStore((state: AppState) => state.recalculateStreakFromHistory)

  // Initialize theme on mount
  useTheme()

  // Recalculate streak from activity history on mount
  useEffect(() => {
    if (progress) {
      recalculateStreakFromHistory()
    }
  }, []) // Only run once on mount

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
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-surface-700 rounded-full" />
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-accent-500 rounded-full border-t-transparent animate-spin" />
                  </div>
                  <p className="mt-4 text-surface-500 font-medium">Loading...</p>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/curriculum" element={<CurriculumPage />} />
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/practice/session" element={<PracticeSessionPage />} />
              <Route path="/practice/focused/:lessonId" element={<FocusedPracticePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/lesson/:lessonId" element={<LessonPage />} />
              <Route path="/tutor" element={<VibeTutorPage />} />
              <Route path="/tutor/projects" element={<ProjectsPage />} />
              <Route path="/tutor/new" element={<VibeTutorScopingPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  )
}
