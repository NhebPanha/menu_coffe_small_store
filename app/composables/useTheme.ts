import { useState } from '#imports'

export type Theme = 'light' | 'dark'

export const useTheme = () => {
  const theme = useState<Theme>('theme', () => 'light')

  const apply = (t: Theme) => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', t === 'dark')
    }
  }

  const setTheme = (t: Theme) => {
    theme.value = t
    if (import.meta.client) localStorage.setItem('theme', t)
    apply(t)
  }

  const toggleTheme = () => setTheme(theme.value === 'light' ? 'dark' : 'light')

  // load saved preference (or system) — call once on mount
  const initTheme = () => {
    if (!import.meta.client) return
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved)
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }

  return { theme, setTheme, toggleTheme, initTheme }
}
