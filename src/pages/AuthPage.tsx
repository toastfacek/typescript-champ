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

  const { signUp, signIn, signInWithMagicLink } = useAuth()
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
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                  mode === 'signin'
                    ? 'bg-gradient-to-r from-accent-500 to-accent-400 text-surface-900 shadow-glow'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700 border border-surface-600'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                  mode === 'signup'
                    ? 'bg-gradient-to-r from-accent-500 to-accent-400 text-surface-900 shadow-glow'
                    : 'bg-surface-800 text-surface-300 hover:bg-surface-700 border border-surface-600'
                }`}
              >
                Sign Up
              </button>
            </div>
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
