import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Input } from '@/components/ui'
import { useAuth } from '@/contexts/AuthContext'

type AuthMode = 'signin' | 'signup' | 'magic-link'

export function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  const { signUp, signIn, signInWithMagicLink, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (mode === 'signup') {
        if (!displayName.trim()) {
          setError('Please enter your name')
          setIsLoading(false)
          return
        }
        const { error } = await signUp(email, password, displayName)
        if (error) {
          setError(error.message)
        } else {
          navigate('/')
        }
      } else if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message)
        } else {
          navigate('/')
        }
      } else if (mode === 'magic-link') {
        const { error } = await signInWithMagicLink(email)
        if (error) {
          setError(error.message)
        } else {
          setMagicLinkSent(true)
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  function resetForm() {
    setEmail('')
    setPassword('')
    setDisplayName('')
    setError(null)
    setMagicLinkSent(false)
  }

  function switchMode(newMode: AuthMode) {
    setMode(newMode)
    resetForm()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-accent-500 rounded-xl flex items-center justify-center shadow-glow mx-auto mb-4">
            <span className="text-surface-900 font-heading font-bold text-2xl">CH</span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-surface-50 mb-2">CodeHabit</h1>
          <p className="text-surface-300">
            {mode === 'signin' && 'Welcome back!'}
            {mode === 'signup' && 'Start your coding journey'}
            {mode === 'magic-link' && 'Sign in with magic link'}
          </p>
        </div>

        <Card variant="gradient">
          {mode !== 'magic-link' && (
            <>
              <Button
                type="button"
                variant="outline"
                className="w-full mb-6 flex items-center justify-center gap-3"
                onClick={async () => {
                  setError(null)
                  setIsLoading(true)
                  try {
                    const { error } = await signInWithGoogle()
                    if (error) {
                      setError(error.message)
                      setIsLoading(false)
                    }
                    // Note: OAuth redirect will happen on success, so we don't navigate here
                  } catch (err: any) {
                    if (err?.message?.includes('Unsupported provider') || err?.message?.includes('provider is not enabled')) {
                      setError('Google Sign-In is not enabled. Please contact the administrator.')
                    } else {
                      setError('An unexpected error occurred')
                    }
                    setIsLoading(false)
                  }
                }}
                isLoading={isLoading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-surface-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-surface-800 text-surface-400">Or</span>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${mode === 'signin'
                      ? 'bg-gradient-to-r from-accent-500 to-accent-400 text-surface-900 shadow-glow'
                      : 'bg-surface-800 text-surface-300 hover:bg-surface-700 border border-surface-600'
                    }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${mode === 'signup'
                      ? 'bg-gradient-to-r from-accent-500 to-accent-400 text-surface-900 shadow-glow'
                      : 'bg-surface-800 text-surface-300 hover:bg-surface-700 border border-surface-600'
                    }`}
                >
                  Sign Up
                </button>
              </div>
            </>
          )}

          {magicLinkSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success-500/20 border border-success-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-success-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-heading font-semibold text-surface-50 mb-2">Check your email</h3>
              <p className="text-surface-300 mb-6">
                We've sent a magic link to <strong className="text-accent-400">{email}</strong>. Click the link to sign in.
              </p>
              <Button variant="ghost" onClick={() => switchMode('signin')}>
                Back to sign in
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-5">
                {mode === 'signup' && (
                  <Input
                    label="Name"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                )}

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />

                {mode !== 'magic-link' && (
                  <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    helperText={mode === 'signup' ? 'At least 6 characters' : undefined}
                  />
                )}

                {error && (
                  <div className="bg-danger-500/10 border border-danger-500/30 text-danger-300 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" isLoading={isLoading} glow>
                  {mode === 'signup' && 'Create Account'}
                  {mode === 'signin' && 'Sign In'}
                  {mode === 'magic-link' && 'Send Magic Link'}
                </Button>
              </form>

              <div className="mt-6">
                {mode !== 'magic-link' ? (
                  <button
                    type="button"
                    onClick={() => switchMode('magic-link')}
                    className="w-full text-center text-sm text-surface-400 hover:text-accent-400 transition-colors"
                  >
                    Or sign in with magic link
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => switchMode('signin')}
                    className="w-full text-center text-sm text-surface-400 hover:text-accent-400 transition-colors"
                  >
                    Back to sign in
                  </button>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-surface-700">
                <p className="text-center text-sm text-surface-400">
                  Continue as a guest?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-accent-400 hover:text-accent-300 font-medium transition-colors"
                  >
                    Try demo mode
                  </button>
                </p>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
