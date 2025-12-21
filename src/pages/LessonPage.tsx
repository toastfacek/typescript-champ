import { useParams, Navigate } from 'react-router-dom'
import { LessonPlayer } from '@/components/lesson/LessonPlayer'
import { lessons } from '@/content/curriculum'

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()

  if (!lessonId || !lessons[lessonId]) {
    return <Navigate to="/curriculum" replace />
  }

  const lesson = lessons[lessonId]

  return <LessonPlayer lesson={lesson} />
}
