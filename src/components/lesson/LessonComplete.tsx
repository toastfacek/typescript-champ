import { useEffect } from 'react'
import type { Lesson } from '@/types'
import { Button, Card } from '@/components/ui'
import { XPCounter } from '@/components/gamification'
import confetti from 'canvas-confetti'

interface LessonCompleteProps {
  lesson: Lesson
  hintsUsed: number
  onContinue: () => void
}

export function LessonComplete({ lesson, hintsUsed, onContinue }: LessonCompleteProps) {
  const bonusMultiplier = hintsUsed === 0 ? 1.5 : 1
  const xpEarned = Math.round(lesson.xpReward * bonusMultiplier)
  const isPerfect = hintsUsed === 0

  // Celebration confetti
  useEffect(() => {
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#0ea5e9', '#f97316', '#22c55e'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#0ea5e9', '#f97316', '#22c55e'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()

    // Big burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0ea5e9', '#f97316', '#22c55e', '#fbbf24'],
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center animate-pop">
        {/* Trophy Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 3h14v3.5a2 2 0 01-1 1.73l-2.55 1.47A6.5 6.5 0 0118 13.5c0 2.49-1.4 4.65-3.45 5.74L14 19.5V21h2v2H8v-2h2v-1.5l-.55-.26C7.4 18.15 6 15.99 6 13.5c0-1.65.61-3.15 1.55-4.3L5 7.73A2 2 0 014 6V3h1zm2 0v2.5l3 1.73V5H7zm4 0v2.23l3-1.73V3h-3z"/>
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Lesson Complete!
        </h1>
        <p className="text-gray-600 mb-6">
          You've finished "{lesson.title}"
        </p>

        {/* XP Earned */}
        <div className="bg-gradient-to-r from-secondary-50 to-orange-50 rounded-xl p-6 mb-6">
          <div className="text-4xl font-bold text-secondary-600 mb-1 xp-animate">
            +{xpEarned} XP
          </div>
          {isPerfect && (
            <div className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              Perfect! 1.5x XP Bonus
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {lesson.steps.length}
            </div>
            <div className="text-sm text-gray-500">Steps Completed</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-gray-900">
              {hintsUsed}
            </div>
            <div className="text-sm text-gray-500">Hints Used</div>
          </div>
        </div>

        {/* Current Stats */}
        <div className="flex justify-center mb-6">
          <XPCounter size="lg" showLevel={true} />
        </div>

        {/* Continue Button */}
        <Button variant="primary" size="lg" onClick={onContinue} className="w-full">
          Continue Learning
          <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Button>
      </Card>
    </div>
  )
}
