import { computed, ref } from 'vue'
import { getTheme } from '../registry/daisyui-themes'

export function useDaisyUITheme() {
  const currentTheme = ref('light')

  const setTheme = (themeName: string) => {
    const theme = getTheme(themeName)
    if (theme) {
      currentTheme.value = themeName
      applyTheme(theme)
    }
  }

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

function applyTheme(theme: any) {
  const root = document.documentElement
  Object.entries(theme.css).forEach(([key, value]) => {
    root.style.setProperty(key, value as string)
  })

  // Set data-theme attribute
  root.setAttribute('data-theme', theme.name)
}
