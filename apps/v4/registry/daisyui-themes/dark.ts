import type { DaisyUITheme } from "./types"

export const darkTheme: DaisyUITheme = {
  name: "dark",
  colors: {
    primary: "#60a5fa", // blue-400
    secondary: "#9ca3af", // gray-400
    accent: "#c084fc", // purple-400
    neutral: "#d1d5db", // gray-300
    base: "#1f2937", // gray-800
    info: "#22d3ee", // cyan-400
    success: "#34d399", // emerald-400
    warning: "#fbbf24", // amber-400
    error: "#f87171", // red-400
  },
  css: {
    "--animation-duration": "0.3s",
    "--border-radius": "0.5rem",
    "--font-sans": "Inter, system-ui, sans-serif",
  },
}
