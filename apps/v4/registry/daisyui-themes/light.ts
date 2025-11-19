import type { DaisyUITheme } from "./types"

export const lightTheme: DaisyUITheme = {
  name: "light",
  colors: {
    primary: "#3b82f6", // blue-500
    secondary: "#6b7280", // gray-500
    accent: "#a855f7", // purple-500
    neutral: "#374151", // gray-700
    base: "#ffffff", // white
    info: "#06b6d4", // cyan-500
    success: "#10b981", // emerald-500
    warning: "#f59e0b", // amber-500
    error: "#ef4444", // red-500
  },
  css: {
    "--animation-duration": "0.3s",
    "--border-radius": "0.5rem",
    "--font-sans": "Inter, system-ui, sans-serif",
  },
}
