import type { ThemeMapping } from "./types"
import { mapDaisyUIToShadcn } from "./theme-mapper"

// Temporary empty theme registry - will be populated in Task 2
export const daisyUIThemes: ThemeMapping = {}

export function getTheme(name: string) {
  return daisyUIThemes[name]
}

export function addTheme(theme: any) {
  daisyUIThemes[theme.name] = theme
}

export function applyThemeToCSS(themeName: string): Record<string, string> {
  const theme = getTheme(themeName)
  if (!theme) {
    throw new Error(`Theme "${themeName}" not found`)
  }
  return mapDaisyUIToShadcn(theme)
}
