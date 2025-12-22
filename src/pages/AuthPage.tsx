import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TypeScript Champ</h1>
          <p className="text-gray-600">
            {mode === 'signin' && 'Welcome back!'}
            {mode === 'signup' && 'Start your TypeScript journey'}
            {mode === 'magic-link' && 'Sign in with magic link'}
          </p>
        </div>

        <Card>
          {mode !== 'magic-link' && (
            <div className="flex gap-2 mb-6">
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  mode === 'signin'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                  mode === 'signup'
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {magicLinkSent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-success-600"
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
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check your email</h3>
              <p className="text-gray-600 mb-6">
                We've sent a magic link to <strong>{email}</strong>. Click the link to sign in.
              </p>
              <Button variant="ghost" onClick={() => switchMode('signin')}>
                Back to sign in
              </Button>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      id="displayName"
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your name"
                      required
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                {mode !== 'magic-link' && (
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                    {mode === 'signup' && (
                      <p className="mt-1 text-xs text-gray-500">At least 6 characters</p>
                    )}
                  </div>
                )}

                {error && (
                  <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full" isLoading={isLoading}>
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
                    className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    Or sign in with magic link
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => switchMode('signin')}
                    className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
                  >
                    Back to sign in
                  </button>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                  Continue as a guest?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="text-primary-600 hover:text-primary-700 font-medium"
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
