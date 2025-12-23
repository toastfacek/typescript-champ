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
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-8 animate-slide-down">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
            </span>
            <span className="text-accent-400 text-sm font-medium">Interactive TypeScript Learning</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 animate-slide-up">
            <span className="text-surface-100">Master TypeScript</span>
            <br />
            <span className="text-gradient">One Challenge at a Time</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-surface-400 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Level up your skills through bite-sized lessons, real coding challenges, 
            and instant feedback. No boring tutorials—just hands-on practice.
          </p>

          {/* CTA */}
          {nextLessonId && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to={`/lesson/${nextLessonId}`}>
                <Button size="lg" glow className="group">
                  {completedCount === 0 ? 'Start Learning' : 'Continue Learning'}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
              </Link>
              <Link to="/curriculum">
                <Button variant="ghost" size="lg">
                  View Curriculum
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      {progress && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* XP Card */}
              <Card variant="gradient" className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent-500/10 rounded-full blur-2xl group-hover:bg-accent-500/20 transition-colors" />
                <div className="relative">
                  <div className="text-surface-500 text-sm font-medium mb-2">Total Experience</div>
                  <XPCounter size="lg" showLevel={true} className="justify-start" />
                </div>
              </Card>

              {/* Streak Card */}
              <Card variant="gradient" className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/20 transition-colors" />
                <div className="relative">
                  <div className="text-surface-500 text-sm font-medium mb-2">Day Streak</div>
                  <StreakBadge size="lg" />
                </div>
              </Card>

              {/* Progress Card */}
              <Card variant="gradient" className="relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-success-500/10 rounded-full blur-2xl group-hover:bg-success-500/20 transition-colors" />
                <div className="relative">
                  <div className="text-surface-500 text-sm font-medium mb-2">Lessons Complete</div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-3xl font-bold font-display text-surface-100">{completedCount}</span>
                    <span className="text-surface-500">/ {totalLessons}</span>
                  </div>
                  <ProgressBar
                    progress={completedCount / totalLessons}
                    size="sm"
                  />
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Curriculum Preview */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-surface-100">Your Learning Path</h2>
              <p className="text-surface-500 mt-1">Pick up where you left off</p>
            </div>
            <Link 
              to="/curriculum" 
              className="text-accent-400 hover:text-accent-300 font-medium text-sm flex items-center gap-1 group"
            >
              View All
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="space-y-4">
            {curriculum.modules.slice(0, 3).map((module, index) => {
              const moduleCompleted = module.lessons.every((id) =>
                lessonProgress[id]?.status === 'completed'
              )
              const moduleLessonsCompleted = module.lessons.filter(
                (id) => lessonProgress[id]?.status === 'completed'
              ).length

              return (
                <Card 
                  key={module.id} 
                  hover 
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-6">
                    {/* Module Number */}
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-lg
                      ${moduleCompleted 
                        ? 'bg-success-500/20 text-success-400 border border-success-500/30' 
                        : 'bg-surface-700/50 text-surface-400 border border-surface-600 group-hover:border-accent-500/30 group-hover:text-accent-400'
                      }
                      transition-colors duration-300
                    `}>
                      {moduleCompleted ? (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>

                    {/* Module Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-surface-100 group-hover:text-accent-400 transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-sm text-surface-500 mt-0.5 truncate">{module.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-surface-600">
                          {moduleLessonsCompleted}/{module.lessons.length} lessons
                        </span>
                        {moduleLessonsCompleted > 0 && !moduleCompleted && (
                          <div className="flex-1 max-w-24">
                            <ProgressBar 
                              progress={moduleLessonsCompleted / module.lessons.length} 
                              size="xs" 
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action */}
                    <Link to={`/lesson/${module.lessons[0]}`}>
                      <Button 
                        variant={moduleCompleted ? 'ghost' : 'outline'} 
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {moduleCompleted ? 'Review' : 'Start'}
                      </Button>
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-surface-100 mb-4">
              Why TypeScript Champ?
            </h2>
            <p className="text-surface-500">Learn the way that actually sticks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                ),
                title: 'Real Code Practice',
                description: 'Write TypeScript in the browser with real-time type checking and instant feedback.',
                color: 'accent',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Bite-Sized Lessons',
                description: '10-15 minute sessions designed for focused learning without overwhelm.',
                color: 'gold',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'Smart Hints',
                description: 'Get contextual hints when stuck, designed to guide without giving away answers.',
                color: 'success',
              },
            ].map((feature) => (
              <Card key={feature.title} hover padding="lg" className="text-center group">
                <div className={`
                  w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center
                  bg-${feature.color}-500/10 text-${feature.color}-400
                  border border-${feature.color}-500/20
                  group-hover:bg-${feature.color}-500/20 group-hover:border-${feature.color}-500/40
                  transition-colors duration-300
                `}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-surface-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Card variant="gradient" padding="lg" className="text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-gold-500/5" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold text-surface-100 mb-3">
                Ready to become a TypeScript pro?
              </h2>
              <p className="text-surface-400 mb-6">
                Start with the basics and build your way up to advanced patterns.
              </p>
              {nextLessonId && (
                <Link to={`/lesson/${nextLessonId}`}>
                  <Button size="lg" glow>
                    {completedCount === 0 ? 'Start Your Journey' : 'Continue Learning'}
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
