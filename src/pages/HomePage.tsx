import { Link } from 'react-router-dom'
import { Button, Card, ProgressBar } from '@/components/ui'
import { XPCounter, StreakBadge } from '@/components/gamification'
import { useStore } from '@/store'
import { curriculum } from '@/content/curriculum'

export function HomePage() {
  const progress = useStore((state) => state.progress)
  const lessonProgress = useStore((state) => state.lessonProgress)

  const completedCount = progress?.lessonsCompleted.length || 0
  const totalLessons = curriculum.modules.reduce(
    (acc, mod) => acc + mod.lessons.length,
    0
  )

  // Find next lesson to continue
  const getNextLesson = () => {
    for (const module of curriculum.modules) {
      for (const lessonId of module.lessons) {
        const lp = lessonProgress[lessonId]
        if (!lp || lp.status !== 'completed') {
          return lessonId
        }
      }
    }
    return curriculum.modules[0]?.lessons[0] || null
  }

  const nextLessonId = getNextLesson()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Learn TypeScript,<br />
          <span className="text-primary-500">One Step at a Time</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Master TypeScript through interactive 25-minute sessions.
          Write real code, earn XP, and build skills for modern development.
        </p>

        {nextLessonId && (
          <Link to={`/lesson/${nextLessonId}`}>
            <Button size="lg" className="animate-pulse-glow">
              {completedCount === 0 ? 'Start Learning' : 'Continue Learning'}
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      {progress && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card className="text-center">
            <XPCounter size="lg" showLevel={true} className="justify-center" />
          </Card>

          <Card className="text-center">
            <div className="flex flex-col items-center">
              <StreakBadge size="lg" />
              <span className="text-sm text-gray-500 mt-1">Day Streak</span>
            </div>
          </Card>

          <Card className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {completedCount}/{totalLessons}
            </div>
            <span className="text-sm text-gray-500">Lessons Complete</span>
            <ProgressBar
              progress={completedCount / totalLessons}
              size="sm"
              className="mt-2"
            />
          </Card>
        </div>
      )}

      {/* Curriculum Preview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Learning Path</h2>
          <Link to="/curriculum" className="text-primary-500 hover:text-primary-600 font-medium">
            View All
          </Link>
        </div>

        <div className="space-y-4">
          {curriculum.modules.slice(0, 2).map((module) => (
            <Card key={module.id} hover>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{module.title}</h3>
                  <p className="text-sm text-gray-500">{module.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-400">
                      {module.lessons.length} lessons
                    </span>
                    {module.lessons.every((id) =>
                      lessonProgress[id]?.status === 'completed'
                    ) && (
                      <span className="text-xs text-success-500 font-medium">
                        Completed
                      </span>
                    )}
                  </div>
                </div>
                <Link to={`/lesson/${module.lessons[0]}`}>
                  <Button variant="outline" size="sm">
                    Start
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="text-center p-6">
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Real Code Practice</h3>
          <p className="text-sm text-gray-500">
            Write TypeScript in the browser with real-time feedback
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">25-Minute Sessions</h3>
          <p className="text-sm text-gray-500">
            Bite-sized lessons designed for focused learning
          </p>
        </div>

        <div className="text-center p-6">
          <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-success-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Hints</h3>
          <p className="text-sm text-gray-500">
            Get smart hints when you're stuck, without spoilers
          </p>
        </div>
      </div>
    </div>
  )
}
