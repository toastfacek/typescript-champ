import { useEffect, useMemo } from 'react'
import { useStore } from '@/store'

type Theme = 'light' | 'dark' | 'system'
type EffectiveTheme = 'light' | 'dark'

/**
 * Hook to manage theme state and apply it to the DOM
 * Handles system preference detection and theme switching
 */
export function useTheme() {
  const theme = useStore((state) => state.settings.theme)
  const updateSettings = useStore((state) => state.updateSettings)

  // Calculate effective theme (resolves 'system' to actual light/dark)
  const effectiveTheme: EffectiveTheme = useMemo(() => {
    if (theme === 'system') {
      if (typeof window !== 'undefined' && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return 'dark' // Default to dark if can't detect
    }
    return theme
  }, [theme])

  // Apply theme to DOM
  useEffect(() => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    
    // Remove existing theme attributes
    root.removeAttribute('data-theme')
    
    // Apply effective theme
    if (effectiveTheme === 'light') {
      root.setAttribute('data-theme', 'light')
      root.style.colorScheme = 'light'
    } else {
      root.setAttribute('data-theme', 'dark')
      root.style.colorScheme = 'dark'
    }
  }, [effectiveTheme])

  // Listen for system preference changes when theme is 'system'
  useEffect(() => {
    if (theme !== 'system' || typeof window === 'undefined' || !window.matchMedia) {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      // Force re-render by updating a dummy setting
      // The effectiveTheme will recalculate automatically
      const root = document.documentElement
      const isDark = mediaQuery.matches
      root.setAttribute('data-theme', isDark ? 'dark' : 'light')
      root.style.colorScheme = isDark ? 'dark' : 'light'
    }

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [theme])

  // Toggle between light and dark (ignoring system for now)
  const toggleTheme = () => {
    const newTheme: Theme = effectiveTheme === 'dark' ? 'light' : 'dark'
    updateSettings({ theme: newTheme })
  }

  // Set theme explicitly
  const setTheme = (newTheme: Theme) => {
    updateSettings({ theme: newTheme })
  }

  return {
    theme,
    effectiveTheme,
    toggleTheme,
    setTheme,
  }
}

