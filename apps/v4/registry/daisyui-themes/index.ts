import type { DaisyUITheme, ThemeMapping } from "./types"
import { darkTheme } from "./dark.js"
import { lightTheme } from "./light.js"
import { mapDaisyUIToShadcn } from "./theme-mapper.js"

export const daisyUIThemes: ThemeMapping = {
  light: lightTheme,
  dark: darkTheme,
}

export function getTheme(name: string) {
  return daisyUIThemes[name]
}

export function addTheme(theme: DaisyUITheme) {
  daisyUIThemes[theme.name] = theme
}

export function applyThemeToCSS(themeName: string): Record<string, string> {
  const theme = getTheme(themeName)
  if (!theme) {
    throw new Error(`Theme "${themeName}" not found`)
  }
  return mapDaisyUIToShadcn(theme)
}
