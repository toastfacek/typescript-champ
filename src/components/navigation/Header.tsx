import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { XPCounter, StreakBadge } from '@/components/gamification'
import { ThemeToggle } from '@/components/ui'
import { SignOutConfirmModal } from '@/components/auth/SignOutConfirmModal'
import { useStore } from '@/store'
import type { AppState } from '@/store'
import { useAuth } from '@/contexts/AuthContext'
import { clsx } from 'clsx'

export function Header() {
  const user = useStore((state: AppState) => state.user)
  const progress = useStore((state: AppState) => state.progress)
  const { isAuthenticated, signOut } = useAuth()
  const location = useLocation()
  const [showSignOutModal, setShowSignOutModal] = useState(false)

  function handleSignOutClick() {
    setShowSignOutModal(true)
  }

  function handleSignOutConfirm() {
    setShowSignOutModal(false)
    signOut()
  }

  const navLinks = [
    { to: '/curriculum', label: 'Learn' },
    { to: '/practice', label: 'Practice' },
    { to: '/sprints', label: 'Sprints' },
    { to: '/tutor', label: 'Vibe Tutor' },
    { to: '/profile', label: 'Profile' },
  ]

  return (
    <header className="sticky top-0 z-50 glass-strong">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
                <span className="text-surface-900 font-bold text-lg font-heading">CH</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-accent-400/20 to-accent-600/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="font-heading font-bold text-xl text-surface-100 hidden sm:block">
              Code<span className="text-accent-400">Habit</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center bg-surface-800/50 rounded-xl p-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to ||
                  (link.to === '/curriculum' && location.pathname.startsWith('/lesson')) ||
                  (link.to === '/sprints' && location.pathname.startsWith('/sprints'))
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={clsx(
                      'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-accent-500/10 border border-accent-500/20 text-accent-400'
                        : 'text-surface-400 hover:text-surface-200 hover:bg-surface-700/50'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User Stats / Auth */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {progress && (
              <div className="hidden sm:flex items-center gap-3">
                <div className="w-px h-6 bg-surface-700" />
                <StreakBadge size="sm" />
                <div className="w-px h-6 bg-surface-700" />
                <XPCounter size="sm" showLevel={false} />
              </div>
            )}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="relative group"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-500/20 to-gold-500/20 border border-surface-600 flex items-center justify-center group-hover:border-accent-500/50 transition-colors">
                    <span className="text-accent-400 font-semibold text-sm">
                      {user?.displayName.charAt(0).toUpperCase() || '?'}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleSignOutClick}
                  className="text-sm text-surface-500 hover:text-surface-300 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-gradient-to-r from-accent-500 to-accent-400 text-surface-900 px-4 py-2 rounded-xl text-sm font-semibold hover:from-accent-400 hover:to-accent-300 transition-all duration-200 shadow-glow-sm hover:shadow-glow"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      <SignOutConfirmModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleSignOutConfirm}
      />
    </header>
  )
}
