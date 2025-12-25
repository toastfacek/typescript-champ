import type { LessonProgress } from '@/types'
import type { PracticeStats, MasteryLevel } from '@/types/practice'
import type { ConceptProgress } from '@/types/focused-practice'
import type { ChallengeScore } from '@/types/recap'
import { lessons } from '@/content/curriculum'

/**
 * Calculate challenge score for a lesson based on recency, attempts, and difficulty.
 * Higher score = more challenging/recent, should be prioritized for recap.
 * 
 * Score = (1 / daysSinceCompletion) * attemptMultiplier * difficultyWeight * masteryBoost
 */
export function calculateChallengeScore(
  lessonId: string,
  lessonProgress: LessonProgress | undefined,
  practiceStats?: Record<string, PracticeStats>,
  focusedPracticeStats?: Record<string, ConceptProgress>
): ChallengeScore | null {
  // Must have completed the lesson
  if (!lessonProgress || lessonProgress.status !== 'completed' || !lessonProgress.completedAt) {
    return null
  }

  const lesson = lessons.find(l => l.id === lessonId)
  if (!lesson) {
    return null
  }

  // Calculate recency factor: 1 / daysSinceCompletion
  const completedAt = new Date(lessonProgress.completedAt)
  const daysSinceCompletion = Math.max(
    Math.floor((Date.now() - completedAt.getTime()) / (1000 * 60 * 60 * 24)),
    1 // Minimum 1 day to avoid division by zero
  )
  const recency = 1 / daysSinceCompletion

  // Calculate attempt multiplier: 1 + (attempts - 1) * 0.3
  const attempts = lessonProgress.attempts || 1
  const attemptMultiplier = 1 + (attempts - 1) * 0.3

  // Difficulty weight: beginner=1.0, intermediate=1.2, advanced=1.5
  const difficultyWeights = {
    beginner: 1.0,
    intermediate: 1.2,
    advanced: 1.5
  }
  const difficultyWeight = difficultyWeights[lesson.difficulty]

  // Mastery boost: check if concept needs more practice
  let masteryBoost = 1.0
  
  // Check practice mode stats for matching topic
  if (practiceStats) {
    // Map lesson tags to practice topics (simplified - could be more sophisticated)
    const lessonTags = lesson.tags || []
    for (const [topic, stats] of Object.entries(practiceStats)) {
      // Check if any lesson tag matches the topic
      if (lessonTags.some(tag => tag.toLowerCase().includes(topic.toLowerCase()) || 
                                topic.toLowerCase().includes(tag.toLowerCase()))) {
        if (stats.masteryLevel === 'learning' || stats.masteryLevel === 'practicing') {
          masteryBoost = 1.3
          break
        }
      }
    }
  }

  // Check focused practice stats
  if (focusedPracticeStats && focusedPracticeStats[lessonId]) {
    const conceptProgress = focusedPracticeStats[lessonId]
    if (conceptProgress.masteryLevel === 'learning' || conceptProgress.masteryLevel === 'practicing') {
      masteryBoost = Math.max(masteryBoost, 1.3)
    }
  }

  const score = recency * attemptMultiplier * difficultyWeight * masteryBoost

  return {
    lessonId,
    score,
    factors: {
      recency,
      attempts: attemptMultiplier,
      difficulty: difficultyWeight,
      masteryBoost
    }
  }
}

/**
 * Find the lesson with the highest challenge score from completed lessons.
 */
export function findMostChallengingLesson(
  lessonProgress: Record<string, LessonProgress>,
  practiceStats?: Record<string, PracticeStats>,
  focusedPracticeStats?: Record<string, ConceptProgress>
): ChallengeScore | null {
  let highestScore: ChallengeScore | null = null

  for (const lessonId in lessonProgress) {
    const score = calculateChallengeScore(
      lessonId,
      lessonProgress[lessonId],
      practiceStats,
      focusedPracticeStats
    )

    if (score && (!highestScore || score.score > highestScore.score)) {
      highestScore = score
    }
  }

  return highestScore
}

