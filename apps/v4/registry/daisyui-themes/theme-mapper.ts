import type { DaisyUITheme } from "./types"

export function mapDaisyUIToShadcn(daisyuiTheme: DaisyUITheme): Record<string, string> {
  return {
    "--background": daisyuiTheme.colors.base,
    "--foreground": getContrastColor(daisyuiTheme.colors.base),
    "--primary": daisyuiTheme.colors.primary,
    "--primary-foreground": getContrastColor(daisyuiTheme.colors.primary),
    "--secondary": daisyuiTheme.colors.secondary,
    "--secondary-foreground": getContrastColor(daisyuiTheme.colors.secondary),
    "--accent": daisyuiTheme.colors.accent,
    "--accent-foreground": getContrastColor(daisyuiTheme.colors.accent),
    "--neutral": daisyuiTheme.colors.neutral,
    "--neutral-foreground": getContrastColor(daisyuiTheme.colors.neutral),
    "--destructive": daisyuiTheme.colors.error,
    "--destructive-foreground": getContrastColor(daisyuiTheme.colors.error),
    "--muted": getLighterVariant(daisyuiTheme.colors.neutral, 0.5),
    "--muted-foreground": getLighterVariant(getContrastColor(daisyuiTheme.colors.neutral), 0.7),
    "--card": daisyuiTheme.colors.base,
    "--card-foreground": getContrastColor(daisyuiTheme.colors.base),
    "--popover": daisyuiTheme.colors.base,
    "--popover-foreground": getContrastColor(daisyuiTheme.colors.base),
    "--border": getLighterVariant(daisyuiTheme.colors.neutral, 0.2),
    "--input": getLighterVariant(daisyuiTheme.colors.base, 0.1),
    "--ring": daisyuiTheme.colors.primary,
    "--chart-1": daisyuiTheme.colors.primary,
    "--chart-2": daisyuiTheme.colors.secondary,
    "--chart-3": daisyuiTheme.colors.accent,
    "--chart-4": daisyuiTheme.colors.info,
    "--chart-5": daisyuiTheme.colors.success,
  }
}

function getContrastColor(hex: string): string {
  // Simple contrast calculation
  const color = hex.replace("#", "")
  const r = Number.parseInt(color.substr(0, 2), 16)
  const g = Number.parseInt(color.substr(2, 2), 16)
  const b = Number.parseInt(color.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? "#000000" : "#ffffff"
}

function getLighterVariant(hex: string, opacity: number): string {
  // Convert hex to RGB
  const color = hex.replace("#", "")
  const r = Number.parseInt(color.substr(0, 2), 16)
  const g = Number.parseInt(color.substr(2, 2), 16)
  const b = Number.parseInt(color.substr(4, 2), 16)

  // For simplicity, blend with white based on opacity
  const blendedR = Math.round(r + (255 - r) * opacity)
  const blendedG = Math.round(g + (255 - g) * opacity)
  const blendedB = Math.round(b + (255 - b) * opacity)

  return `#${blendedR.toString(16).padStart(2, "0")}${blendedG.toString(16).padStart(2, "0")}${blendedB.toString(16).padStart(2, "0")}`
}
