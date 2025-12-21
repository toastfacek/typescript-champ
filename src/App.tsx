import { Routes, Route } from 'react-router-dom'
import { Header } from '@/components/navigation'
import { HomePage, CurriculumPage, ProfilePage, LessonPage, PracticePage, PracticeSessionPage } from '@/pages'
import { useEffect } from 'react'
import { useStore } from '@/store'

export default function App() {
  const setProgress = useStore((state) => state.setProgress)
  const progress = useStore((state) => state.progress)

  // Initialize demo progress if none exists
  useEffect(() => {
    if (!progress) {
      setProgress({
        userId: 'demo-user',
        totalXP: 0,
        level: 1,
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: '',
        lessonsCompleted: [],
      })
    }
  }, [progress, setProgress])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/practice/session" element={<PracticeSessionPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
        </Routes>
      </main>
    </div>
  )
}
