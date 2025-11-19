import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Existing shadcn variants
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",

        // DaisyUI color variants
        daisy_primary: "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500/50 focus-visible:ring-offset-0 focus-visible:ring-[3px]",
        daisy_secondary: "bg-gray-500 text-white hover:bg-gray-600 focus-visible:ring-gray-500/50 focus-visible:ring-offset-0 focus-visible:ring-[3px]",
        daisy_success: "bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500/50 focus-visible:ring-offset-0 focus-visible:ring-[3px]",
        daisy_warning: "bg-yellow-500 text-black hover:bg-yellow-400 focus-visible:ring-yellow-500/50 focus-visible:ring-offset-0 focus-visible:ring-[3px]",
        daisy_error: "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500/50 focus-visible:ring-offset-0 focus-visible:ring-[3px]",
        daisy_info: "bg-cyan-500 text-white hover:bg-cyan-600 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-0 focus-visible:ring-[3px]",
        daisy_accent: "bg-purple-500 text-white hover:bg-purple-600 focus-visible:ring-purple-500/50 focus-visible:ring-offset-0 focus-visible:ring-[3px]",
        daisy_neutral: "bg-gray-300 text-black hover:bg-gray-400 focus-visible:ring-gray-400/50 focus-visible:ring-offset-0 focus-visible:ring-[3px]",

        // Special standalone variants
        daisy_ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
        daisy_link: "bg-transparent underline hover:no-underline",
      },

      subvariant: {
        outline: "border-2 bg-transparent hover:bg-opacity-10 hover:bg-current hover:text-white",
        ghost: "bg-transparent hover:bg-black/10 dark:hover:bg-white/10",
        link: "bg-transparent underline hover:no-underline",
        soft: "bg-opacity-20 hover:bg-opacity-30",
        dash: "border-2 border-dashed bg-transparent",
        active: "ring-2 ring-offset-2",
        disabled: "opacity-50 cursor-not-allowed pointer-events-none",
      },

      size: {
        "xs": "h-6 px-2 text-xs",
        "sm": "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        "md": "h-9 px-4 py-2 has-[>svg]:px-3",
        "lg": "h-10 rounded-md px-6 has-[>svg]:px-4",
        "xl": "h-12 px-6 text-lg",
        "icon": "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
)
export type ButtonVariants = VariantProps<typeof buttonVariants>
