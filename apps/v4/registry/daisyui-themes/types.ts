export interface DaisyUITheme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    neutral: string
    base: string
    info: string
    success: string
    warning: string
    error: string
  }
  css: Record<string, string>
}

export interface ThemeMapping {
  [key: string]: DaisyUITheme
}
