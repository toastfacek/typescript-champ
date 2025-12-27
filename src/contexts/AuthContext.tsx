import React, { createContext, useContext, useEffect, useState } from 'react'
import type { User as SupabaseUser } from '@supabase/supabase-js'
import { authHelpers, isDemoMode } from '@/lib/supabase'
import { loadAllDataFromSupabase, syncAllDataToSupabase, mergeAccountByEmail, findAccountByEmail, getProfile } from '@/services/supabase-sync'
import type { LessonProgress } from '@/types'
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

    // Handle OAuth callback from hash fragments
    const handleOAuthCallback = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1))
      const accessToken = hashParams.get('access_token')
      const error = hashParams.get('error')
      const errorDescription = hashParams.get('error_description')

      if (error) {
        console.error('OAuth error:', error, errorDescription)
        console.error('Current origin:', window.location.origin)
        console.error('Make sure this URL is added to Supabase Redirect URLs:', window.location.origin)
        // Clear hash from URL
        window.history.replaceState(null, '', window.location.pathname)
        setIsLoading(false)
        return
      }

      if (accessToken) {
        console.log('OAuth callback detected, waiting for Supabase to process session...')
        // OAuth callback detected, Supabase will handle it via onAuthStateChange
        // Don't clear hash yet - let Supabase process it first
        // The hash will be cleared after session is established
      }
    }

    handleOAuthCallback()

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
      console.log('Auth state changed:', event, session?.user?.email || 'no user')
      
      // Clear OAuth hash after successful authentication
      if (event === 'SIGNED_IN' && window.location.hash.includes('access_token')) {
        window.history.replaceState(null, '', window.location.pathname)
      }
      
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

    // First, check if this user already has data in Supabase
    // If they do, they're a returning user - not a demo user migrating
    const existingData = await loadAllDataFromSupabase(authUser.id)
    const hasExistingSupabaseData = existingData.progress !== null

    // Check if this is a demo user logging in for the first time
    // Only consider it a demo migration if:
    // 1. Local store has demo-user ID
    // 2. They have local progress to migrate
    // 3. They DON'T already have data in Supabase (returning user)
    const isDemoUser = user?.id === 'demo-user' && !hasExistingSupabaseData

    if (isDemoUser && progress) {
      console.log('Demo user detected, migrating data to Supabase')

      // Update userId in progress
      const updatedProgress = { ...progress, userId: authUser.id }

      // Update userId in all lesson progress
      const updatedLessonProgress: Record<string, LessonProgress> = {}
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
      // Use the data we already loaded above
      console.log('Loading user data from Supabase')
      let data = existingData

      // Check if this is a new OAuth account (Google) and there's an existing email/password account
      // OAuth users have identities array with provider info
      const isOAuthUser = authUser.identities && authUser.identities.some((id: any) => id.provider === 'google')

      // If no progress found and this is an OAuth user, try to merge with existing email account
      if (!data.progress && isOAuthUser && authUser.email) {
        console.log('OAuth user with no progress, checking for existing account to merge...')
        const existingAccount = await findAccountByEmail(authUser.email)

        if (existingAccount && existingAccount.userId !== authUser.id) {
          console.log('Found existing account, merging progress...', existingAccount)
          const mergeResult = await mergeAccountByEmail(authUser.id, authUser.email)

          if (mergeResult.success) {
            console.log('Account merged successfully:', mergeResult.message)
            // Reload data after merge
            data = await loadAllDataFromSupabase(authUser.id)
          } else {
            console.log('Merge failed or no account to merge:', mergeResult.message)
          }
        }
      }

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

    // Load user profile from database (has the most up-to-date info including merged accounts)
    const profile = await getProfile(authUser.id)
    if (profile) {
      setUser(profile)
    } else {
      // Fallback to auth metadata if profile doesn't exist yet
      setUser({
        id: authUser.id,
        email: authUser.email!,
        displayName: authUser.user_metadata?.display_name || authUser.email!.split('@')[0],
        avatarUrl: authUser.user_metadata?.avatar_url,
        createdAt: new Date(authUser.created_at),
      })
    }

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
