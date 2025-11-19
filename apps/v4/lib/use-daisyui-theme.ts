import type { DaisyUITheme } from '../registry/daisyui-themes/types'
import { computed, ref } from 'vue'
import { daisyUIThemes, getTheme } from '../registry/daisyui-themes'

/**
 * Hook for managing DaisyUI theme state and application
 * @returns Object containing current theme, theme setter, and theme colors
 */
export function useDaisyUITheme() {
  const currentTheme = ref('light')

  /**
   * Sets the current theme and applies it to the DOM
   * @param themeName - The name of the theme to set
   * @throws Error if the theme is not found
   */
  const setTheme = (themeName: string) => {
    const theme = getTheme(themeName)
    if (!theme) {
      throw new Error(`Theme "${themeName}" not found. Available themes: ${Object.keys(daisyUIThemes).join(', ')}`)
    }
    currentTheme.value = themeName
    applyTheme(theme)
  }

  /**
   * Computed property that returns the colors of the current theme
   * @returns Object containing theme color values
   */
  const themeColors = computed(() => {
    const theme = getTheme(currentTheme.value)
    return theme?.colors || {}
  })

  return {
    currentTheme: computed(() => currentTheme.value),
    setTheme,
    themeColors,
  }
}

/**
 * Applies a DaisyUI theme to the DOM by setting CSS custom properties and data attributes
 * @param theme - The DaisyUITheme object to apply
 */
function applyTheme(theme: DaisyUITheme) {
  // SSR safety check: ensure we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return
  }

  const root = document.documentElement
  Object.entries(theme.css).forEach(([key, value]) => {
    root.style.setProperty(key, value as string)
  })

  // Set data-theme attribute
  root.setAttribute('data-theme', theme.name)
}
