import { Link } from 'react-router-dom'
import { XPCounter, StreakBadge } from '@/components/gamification'
import { useStore } from '@/store'

export function Header() {
  const user = useStore((state) => state.user)
  const progress = useStore((state) => state.progress)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">TS</span>
            </div>
            <span className="font-bold text-xl text-gray-900">
              TypeScript Champ
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/curriculum"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Learn
            </Link>
            <Link
              to="/practice"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Practice
            </Link>
            <Link
              to="/profile"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Profile
            </Link>
          </nav>

          {/* User Stats / Auth */}
          <div className="flex items-center gap-4">
            {progress && (
              <>
                <StreakBadge size="sm" />
                <XPCounter size="sm" showLevel={false} />
              </>
            )}

            {user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-medium text-sm">
                    {user.displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            ) : (
              <Link
                to="/auth"
                className="btn-primary text-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
