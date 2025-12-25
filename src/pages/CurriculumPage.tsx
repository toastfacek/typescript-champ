import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Badge, ProgressBar, Button } from '@/components/ui'
import { useStore } from '@/store'
import type { AppState } from '@/store'
import { curriculum, lessons } from '@/content/curriculum'

export function CurriculumPage() {
  const navigate = useNavigate()
  const lessonProgress = useStore((state: AppState) => state.lessonProgress)
  const redoLesson = useStore((state: AppState) => state.redoLesson)
  const [language, setLanguage] = useState<'typescript' | 'python'>('typescript')

  // Filter modules based on language
  const filteredModules = curriculum.modules.filter((module) => {
    if (language === 'python') {
      // Python modules start with 'python-'
      return module.id.startsWith('python-')
    } else {
      // TypeScript modules don't start with 'python-'
      return !module.id.startsWith('python-')
    }
  })

  // Get curriculum title and description based on language
  const curriculumTitle = language === 'python' ? 'Python Fundamentals' : curriculum.title
  const curriculumDescription = language === 'python' 
    ? 'Master Python from the ground up' 
    : curriculum.description

  const getLessonStatus = (lessonId: string) => {
    const lp = lessonProgress[lessonId]
    if (!lp) return 'not-started'
    return lp.status
  }

  const getModuleProgress = (moduleId: string) => {
    const module = filteredModules.find((m) => m.id === moduleId)
    if (!module) return 0
    const completed = module.lessons.filter(
      (id) => getLessonStatus(id) === 'completed'
    ).length
    return completed / module.lessons.length
  }

  const handleRedoLesson = (e: React.MouseEvent, lessonId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    const confirmed = window.confirm(
      'Redo this lesson? Your progress will be reset and you won\'t earn XP again.'
    )
    
    if (confirmed) {
      redoLesson(lessonId)
      navigate(`/lesson/${lessonId}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-heading font-bold text-surface-100 mb-2">
              {curriculumTitle}
            </h1>
            <p className="text-surface-300">{curriculumDescription}</p>
          </div>
          
          {/* Language Toggle */}
          <div className="flex items-center gap-2 bg-surface-800/50 rounded-xl p-1 border border-surface-700/50">
            <button
              onClick={() => setLanguage('typescript')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${language === 'typescript'
                  ? 'bg-accent-500/20 text-accent-400'
                  : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50'
                }
              `}
            >
              TypeScript
            </button>
            <button
              onClick={() => setLanguage('python')}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${language === 'python'
                  ? 'bg-accent-500/20 text-accent-400'
                  : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50'
                }
              `}
            >
              Python
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {filteredModules.map((module, moduleIndex) => {
          const moduleProgress = getModuleProgress(module.id)
          const isComplete = moduleProgress === 1

          return (
            <div key={module.id}>
              {/* Module Header */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    isComplete
                      ? 'bg-success-500 text-white'
                      : 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                  }`}
                >
                  {isComplete ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    moduleIndex + 1
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-heading font-semibold text-surface-100">
                    {module.title}
                  </h2>
                  <p className="text-sm text-surface-400">{module.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-surface-500">
                    {Math.round(moduleProgress * 100)}% complete
                  </span>
                  <ProgressBar
                    progress={moduleProgress}
                    size="sm"
                    color={isComplete ? 'success' : 'accent'}
                    className="w-24"
                  />
                </div>
              </div>

              {/* Lessons List */}
              <div className="ml-5 pl-9 border-l-2 border-surface-700 space-y-3">
                {module.lessons.map((lessonId) => {
                  const lesson = lessons[lessonId]
                  if (!lesson) return null

                  const status = getLessonStatus(lessonId)
                  const isLocked = false // Could add prerequisite logic here

                  return (
                    <div key={lessonId} className="relative group">
                      <Link
                        to={isLocked ? '#' : `/lesson/${lessonId}`}
                        className={isLocked ? 'cursor-not-allowed' : ''}
                      >
                        <Card
                          hover={!isLocked}
                          className={`relative ${
                            isLocked ? 'opacity-50' : ''
                          } ${
                            status === 'completed'
                              ? 'border-success-500/30 bg-success-500/10'
                              : status === 'in-progress'
                              ? 'border-accent-500/30 bg-accent-500/10'
                              : ''
                          }`}
                          padding="sm"
                        >
                          <div className="flex items-center gap-4">
                            {/* Status Icon */}
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                status === 'completed'
                                  ? 'bg-success-500 text-white'
                                  : status === 'in-progress'
                                  ? 'bg-accent-500 text-surface-900'
                                  : 'bg-surface-700 text-surface-500'
                              }`}
                            >
                              {status === 'completed' ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : status === 'in-progress' ? (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              )}
                            </div>

                            {/* Lesson Info */}
                            <div className="flex-1">
                              <h3 className="font-medium text-surface-100">
                                {lesson.title}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-surface-500">
                                  {lesson.estimatedMinutes} min
                                </span>
                                <Badge
                                  variant={
                                    lesson.difficulty === 'beginner'
                                      ? 'success'
                                      : lesson.difficulty === 'intermediate'
                                      ? 'warning'
                                      : 'danger'
                                  }
                                  size="sm"
                                >
                                  {lesson.difficulty}
                                </Badge>
                                <span className="text-xs text-gold-400 font-medium">
                                  +{lesson.xpReward} XP
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                              {status === 'completed' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => handleRedoLesson(e, lessonId)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Redo this lesson"
                                >
                                  <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                  </svg>
                                </Button>
                              )}
                              {/* Arrow */}
                              <svg
                                className="w-5 h-5 text-surface-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
