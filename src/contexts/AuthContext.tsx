import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { authHelpers, isDemoMode } from '@/lib/supabase'
import { loadAllDataFromSupabase, syncAllDataToSupabase } from '@/services/supabase-sync'
import { useStore } from '@/store'
import { usePracticeStore } from '@/store/practice-store'

interface AuthContextType {
  supabaseUser: SupabaseUser | null
  isAuthenticated: boolean
  isLoading: boolean
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: Error | null }>
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signInWithMagicLink: (email: string) => Promise<{ error: Error | null }>
  signInWithGoogle: () => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { user, progress, lessonProgress, settings, setUser, setProgress, setLessonProgress, updateSettings } = useStore()
  const { practiceStats } = usePracticeStore()

  useEffect(() => {
    if (isDemoMode) {
      setIsLoading(false)
      return
    }

    // Check for existing session
    authHelpers.getSession().then(({ session, error }) => {
      if (error) {
        console.error('Error getting session:', error)
        setIsLoading(false)
        return
      }

      if (session?.user) {
        handleAuthStateChange(session.user)
      } else {
        setIsLoading(false)
      }
    })

    // Listen for auth state changes
    const { data: { subscription } } = authHelpers.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event)
      if (session?.user) {
        handleAuthStateChange(session.user)
      } else {
        setSupabaseUser(null)
        setIsAuthenticated(false)
        setIsLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function handleAuthStateChange(authUser: SupabaseUser) {
    setSupabaseUser(authUser)
    setIsAuthenticated(true)

    // Check if this is a demo user logging in for the first time
    const isDemoUser = user?.id === 'demo-user'

    if (isDemoUser && progress) {
      console.log('Demo user detected, migrating data to Supabase')

      // Update userId in progress
      const updatedProgress = { ...progress, userId: authUser.id }

      // Update userId in all lesson progress
      const updatedLessonProgress: Record<string, any> = {}
      for (const [lessonId, lesson] of Object.entries(lessonProgress)) {
        updatedLessonProgress[lessonId] = { ...lesson, userId: authUser.id }
      }

      // Sync all demo data to Supabase
      await syncAllDataToSupabase(
        authUser.id,
        updatedProgress,
        updatedLessonProgress,
        settings,
        practiceStats
      )

      // Update local state with new userId
      setProgress(updatedProgress)
      for (const [lessonId, lesson] of Object.entries(updatedLessonProgress)) {
        setLessonProgress(lessonId, lesson)
      }
    } else {
      // Load user data from Supabase
      console.log('Loading user data from Supabase')
      const data = await loadAllDataFromSupabase(authUser.id)

      // Update stores with Supabase data
      if (data.progress) {
        setProgress(data.progress)
      } else {
        // First time user, initialize progress
        const newProgress = {
          userId: authUser.id,
          totalXP: 0,
          level: 1,
          currentStreak: 0,
          longestStreak: 0,
          lastActivityDate: new Date().toISOString().split('T')[0],
          lessonsCompleted: [],
        }
        setProgress(newProgress)
      }

      if (data.settings) {
        updateSettings(data.settings)
      }

      for (const [lessonId, lesson] of Object.entries(data.lessonProgress)) {
        setLessonProgress(lessonId, lesson)
      }

      // Practice stats are handled by practice store
      // Could add a method to update practice store if needed
    }

    // Update user profile
    setUser({
      id: authUser.id,
      email: authUser.email!,
      displayName: authUser.user_metadata?.display_name || authUser.email!.split('@')[0],
      avatarUrl: authUser.user_metadata?.avatar_url,
      createdAt: new Date(authUser.created_at),
    })

    setIsLoading(false)
  }

  async function signUp(email: string, password: string, displayName: string) {
    try {
      const { error } = await authHelpers.signUp(email, password, displayName)
      if (error) {
        return { error }
      }
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { error } = await authHelpers.signIn(email, password)
      if (error) {
        return { error }
      }
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async function signInWithMagicLink(email: string) {
    try {
      const { error } = await authHelpers.signInWithMagicLink(email)
      if (error) {
        return { error }
      }
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async function signInWithGoogle() {
    try {
      const { error } = await authHelpers.signInWithGoogle()
      if (error) {
        return { error }
      }
      return { error: null }
    } catch (error) {
      return { error: error as Error }
    }
  }

  async function signOut() {
    await authHelpers.signOut()

    // Keep localStorage data for demo mode
    // Just clear the Supabase user state
    setSupabaseUser(null)
    setIsAuthenticated(false)

    // Reset to demo user
    setUser({
      id: 'demo-user',
      email: 'demo@example.com',
      displayName: 'Demo User',
      createdAt: new Date(),
    })
  }

  const value: AuthContextType = {
    supabaseUser,
    isAuthenticated,
    isLoading,
    signUp,
    signIn,
    signInWithMagicLink,
    signInWithGoogle,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
