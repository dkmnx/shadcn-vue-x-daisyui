# DaisyUI Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add DaisyUI theme support and enhanced button component to shadcn-vue while maintaining backward compatibility

**Architecture:** Hybrid approach mapping DaisyUI themes to existing CSS variable system, extending button component with variant/subvariant pattern

**Tech Stack:** Vue 3, TypeScript, Tailwind CSS v4, Class Variance Authority (CVA), DaisyUI theme system

---

## Phase 1: Foundation Setup

### Task 1: Create Theme System Foundation

**Files:**
- Create: `apps/v4/registry/daisyui-themes/theme-mapper.ts`
- Create: `apps/v4/registry/daisyui-themes/types.ts`
- Create: `apps/v4/registry/daisyui-themes/index.ts`

**Step 1: Create theme types**

```typescript
// apps/v4/registry/daisyui-themes/types.ts
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
```

**Step 2: Create theme mapper**

```typescript
// apps/v4/registry/daisyui-themes/theme-mapper.ts
import type { DaisyUITheme } from './types'

export function mapDaisyUIToShadcn(daisyuiTheme: DaisyUITheme): Record<string, string> {
  return {
    '--background': daisyuiTheme.colors.base,
    '--foreground': getContrastColor(daisyuiTheme.colors.base),
    '--primary': daisyuiTheme.colors.primary,
    '--primary-foreground': getContrastColor(daisyuiTheme.colors.primary),
    '--secondary': daisyuiTheme.colors.secondary,
    '--secondary-foreground': getContrastColor(daisyuiTheme.colors.secondary),
    // ... map all color tokens
  }
}

function getContrastColor(hex: string): string {
  // Simple contrast calculation
  const color = hex.replace('#', '')
  const r = parseInt(color.substr(0, 2), 16)
  const g = parseInt(color.substr(2, 2), 16)
  const b = parseInt(color.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#000000' : '#ffffff'
}
```

**Step 3: Create theme registry**

```typescript
// apps/v4/registry/daisyui-themes/index.ts
import type { ThemeMapping } from './types'
import { lightTheme } from './light'
import { darkTheme } from './dark'

export const daisyUIThemes: ThemeMapping = {
  light: lightTheme,
  dark: darkTheme,
}

export function getTheme(name: string) {
  return daisyUIThemes[name]
}
```

**Step 4: Run tests**

Run: `pnpm test`
Expected: PASS (203 tests passing)

**Step 5: Commit**

```bash
git add apps/v4/registry/daisyui-themes/
git commit -m "feat: create daisyui theme system foundation"
```

### Task 2: Implement Light and Dark Themes

**Files:**
- Create: `apps/v4/registry/daisyui-themes/light.ts`
- Create: `apps/v4/registry/daisyui-themes/dark.ts`

**Step 1: Create light theme**

```typescript
// apps/v4/registry/daisyui-themes/light.ts
import type { DaisyUITheme } from './types'

export const lightTheme: DaisyUITheme = {
  name: 'light',
  colors: {
    primary: '#3b82f6',      // blue-500
    secondary: '#6b7280',    // gray-500
    accent: '#a855f7',       // purple-500
    neutral: '#374151',      // gray-700
    base: '#ffffff',         // white
    info: '#06b6d4',         // cyan-500
    success: '#10b981',      // emerald-500
    warning: '#f59e0b',      // amber-500
    error: '#ef4444',        // red-500
  },
  css: {
    '--animation-duration': '0.3s',
    '--border-radius': '0.5rem',
    '--font-sans': 'Inter, system-ui, sans-serif',
  }
}
```

**Step 2: Create dark theme**

```typescript
// apps/v4/registry/daisyui-themes/dark.ts
import type { DaisyUITheme } from './types'

export const darkTheme: DaisyUITheme = {
  name: 'dark',
  colors: {
    primary: '#60a5fa',      // blue-400
    secondary: '#9ca3af',    // gray-400
    accent: '#c084fc',       // purple-400
    neutral: '#d1d5db',      // gray-300
    base: '#1f2937',         // gray-800
    info: '#22d3ee',         // cyan-400
    success: '#34d399',      // emerald-400
    warning: '#fbbf24',      // amber-400
    error: '#f87171',        // red-400
  },
  css: {
    '--animation-duration': '0.3s',
    '--border-radius': '0.5rem',
    '--font-sans': 'Inter, system-ui, sans-serif',
  }
}
```

**Step 3: Run tests**

Run: `pnpm test`
Expected: PASS

**Step 4: Commit**

```bash
git add apps/v4/registry/daisyui-themes/light.ts apps/v4/registry/daisyui-themes/dark.ts
git commit -m "feat: add daisyui light and dark themes"
```

### Task 3: Create Theme Provider Composable

**Files:**
- Create: `apps/v4/lib/use-daisyui-theme.ts`
- Create: `apps/v4/lib/theme-provider.vue`

**Step 1: Write theme composable test**

```typescript
// apps/v4/components/__tests__/use-daisyui-theme.test.ts
import { renderHook } from '@vue/test-utils'
import { useDaisyUITheme } from '../../lib/use-daisyui-theme'

describe('useDaisyUITheme', () => {
  it('should return default theme', () => {
    const { result } = renderHook(() => useDaisyUITheme())
    expect(result.value.currentTheme).toBe('light')
  })

  it('should switch themes', () => {
    const { result } = renderHook(() => useDaisyUITheme())
    result.value.setTheme('dark')
    expect(result.value.currentTheme).toBe('dark')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter v4 test`
Expected: FAIL with "useDaisyUIThime not defined"

**Step 3: Implement theme composable**

```typescript
// apps/v4/lib/use-daisyui-theme.ts
import { ref, computed } from 'vue'
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
```

**Step 4: Create theme provider component**

```vue
<!-- apps/v4/lib/theme-provider.vue -->
<script setup lang="ts">
import { provide } from 'vue'
import { useDaisyUITheme } from './use-daisyui-theme'

interface Props {
  defaultTheme?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultTheme: 'light'
})

const { currentTheme, setTheme, themeColors } = useDaisyUITheme()

provide('daisyui-theme', {
  currentTheme,
  setTheme,
  themeColors,
})

// Set initial theme
setTheme(props.defaultTheme)
</script>

<template>
  <div data-theme-provider>
    <slot />
  </div>
</template>
```

**Step 5: Run tests to verify they pass**

Run: `pnpm --filter v4 test`
Expected: PASS

**Step 6: Commit**

```bash
git add apps/v4/lib/use-daisyui-theme.ts apps/v4/lib/theme-provider.vue apps/v4/components/__tests__/use-daisyui-theme.test.ts
git commit -m "feat: add daisyui theme provider and composable"
```

## Phase 2: Button Component Enhancement

### Task 4: Enhance Button Component Types

**Files:**
- Modify: `apps/v4/registry/new-york-v4/ui/button/index.ts`

**Step 1: Write button variants test**

```typescript
// apps/v4/registry/new-york-v4/ui/button/__tests__/variants.test.ts
import { buttonVariants } from '../index'
import { describe, it, expect } from 'vitest'

describe('buttonVariants', () => {
  it('should handle daisyui color variants', () => {
    const classes = buttonVariants({ variant: 'primary' })
    expect(classes).toContain('bg-blue-500')
    expect(classes).toContain('text-white')
  })

  it('should handle daisyui subvariants', () => {
    const classes = buttonVariants({ variant: 'primary', subvariant: 'outline' })
    expect(classes).toContain('border-2')
    expect(classes).toContain('bg-transparent')
  })

  it('should maintain backward compatibility', () => {
    const classes = buttonVariants({ variant: 'default' })
    expect(classes).toContain('bg-primary')
    expect(classes).toContain('text-primary-foreground')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `pnpm --filter v4 test`
Expected: FAIL with subvariant not defined

**Step 3: Enhance button variants**

```typescript
// apps/v4/registry/new-york-v4/ui/button/index.ts
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
        primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
        secondary: "bg-gray-500 text-white hover:bg-gray-600",
        success: "bg-green-500 text-white hover:bg-green-600",
        warning: "bg-yellow-500 text-black hover:bg-yellow-600",
        error: "bg-red-500 text-white hover:bg-red-600",
        info: "bg-cyan-500 text-white hover:bg-cyan-600",
        accent: "bg-purple-500 text-white hover:bg-purple-600",
        neutral: "bg-gray-300 text-black hover:bg-gray-400",

        // Special standalone variants
        daisy_ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
        daisy_link: "bg-transparent underline hover:no-underline",
      },

      subvariant: {
        outline: "border-2 bg-transparent hover:bg-current hover:text-white",
        ghost: "bg-transparent hover:bg-current hover:bg-opacity-10",
        link: "bg-transparent underline hover:no-underline",
        soft: "bg-opacity-20 hover:bg-opacity-30",
        dash: "border-2 border-dashed bg-transparent",
        active: "ring-2 ring-offset-2",
        disabled: "opacity-50 cursor-not-allowed pointer-events-none",
      },

      size: {
        xs: "h-6 px-2 text-xs",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        md: "h-9 px-4 py-2 has-[>svg]:px-3",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 px-6 text-lg",
        icon: "size-9",
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
```

**Step 4: Update Button component**

```vue
<!-- apps/v4/registry/new-york-v4/ui/button/Button.vue -->
<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ButtonVariants } from "."
import { Primitive } from "reka-ui"
import { cn } from "@/lib/utils"
import { buttonVariants } from "."

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"]
  subvariant?: ButtonVariants["subvariant"]
  size?: ButtonVariants["size"]
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
})
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, subvariant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
```

**Step 5: Run tests to verify they pass**

Run: `pnpm --filter v4 test`
Expected: PASS

**Step 6: Commit**

```bash
git add apps/v4/registry/new-york-v4/ui/button/
git commit -m "feat: enhance button component with daisyui variants"
```

### Task 5: Create Button Demo and Examples

**Files:**
- Create: `apps/v4/registry/new-york-v4/examples/ButtonDaisyUIDemo.vue`
- Modify: `apps/v4/registry/registry-ui.ts`

**Step 1: Create button demo component**

```vue
<!-- apps/v4/registry/new-york-v4/examples/ButtonDaisyUIDemo.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '../ui/button'

const selectedVariant = ref('primary')
const selectedSubvariant = ref('')
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">DaisyUI Button Examples</h3>

    <!-- Color Variants -->
    <div class="space-y-2">
      <h4 class="font-medium">Color Variants</h4>
      <div class="flex gap-2 flex-wrap">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="error">Error</Button>
        <Button variant="info">Info</Button>
      </div>
    </div>

    <!-- Subvariants -->
    <div class="space-y-2">
      <h4 class="font-medium">Style Subvariants</h4>
      <div class="flex gap-2 flex-wrap">
        <Button variant="primary" subvariant="outline">Primary Outline</Button>
        <Button variant="success" subvariant="ghost">Success Ghost</Button>
        <Button variant="warning" subvariant="soft">Warning Soft</Button>
        <Button variant="error" subvariant="dash">Error Dash</Button>
      </div>
    </div>

    <!-- Size Variants -->
    <div class="space-y-2">
      <h4 class="font-medium">Size Variants</h4>
      <div class="flex gap-2 items-center">
        <Button variant="primary" size="xs">XS</Button>
        <Button variant="primary" size="sm">SM</Button>
        <Button variant="primary" size="md">MD</Button>
        <Button variant="primary" size="lg">LG</Button>
        <Button variant="primary" size="xl">XL</Button>
      </div>
    </div>

    <!-- Backward Compatibility -->
    <div class="space-y-2">
      <h4 class="font-medium">Backward Compatible</h4>
      <div class="flex gap-2 flex-wrap">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  </div>
</template>
```

**Step 2: Add to registry**

```typescript
// apps/v4/registry/registry-ui.ts (find and modify)
export { default as ButtonDaisyUIDemo } from "./new-york-v4/examples/ButtonDaisyUIDemo"

// Add to registry exports
```

**Step 3: Run tests**

Run: `pnpm --filter v4 test`
Expected: PASS

**Step 4: Commit**

```bash
git add apps/v4/registry/new-york-v4/examples/ButtonDaisyUIDemo.vue apps/v4/registry/registry-ui.ts
git commit -m "feat: add daisyui button demo component"
```

## Phase 3: Documentation and Integration

### Task 6: Update Documentation

**Files:**
- Create: `apps/v4/content/docs/daisyui-integration.md`
- Modify: `apps/v4/pages/index.vue`

**Step 1: Create integration documentation**

```markdown
<!-- apps/v4/content/docs/daisyui-integration.md -->
---
title: 'DaisyUI Integration'
description: 'Using DaisyUI themes and styles with shadcn-vue'
---

# DaisyUI Integration

shadcn-vue now supports DaisyUI themes and component styles while maintaining full backward compatibility.

## Theme Support

### Available Themes

- **Light**: Clean, bright interface
- **Dark**: Modern dark interface

### Using Themes

```vue
<script setup>
import { ThemeProvider } from '@/lib/theme-provider'
</script>

<template>
  <ThemeProvider default-theme="light">
    <YourApp />
  </ThemeProvider>
</template>
```

## Enhanced Button Component

The Button component now supports DaisyUI color and style variants.

### Color Variants

```vue
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="error">Error</Button>
<Button variant="info">Info</Button>
```

### Style Subvariants

```vue
<Button variant="primary" subvariant="outline">Outline</Button>
<Button variant="success" subvariant="ghost">Ghost</Button>
<Button variant="warning" subvariant="soft">Soft</Button>
<Button variant="error" subvariant="dash">Dash</Button>
```

### Size Variants

```vue
<Button variant="primary" size="xs">Extra Small</Button>
<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="lg">Large</Button>
<Button variant="primary" size="xl">Extra Large</Button>
```

### Backward Compatibility

Existing button usage continues to work unchanged:

```vue
<!-- Still works! -->
<Button variant="default">Default Button</Button>
<Button variant="destructive">Destructive</Button>
```
```

**Step 2: Run tests**

Run: `pnpm --filter v4 test`
Expected: PASS

**Step 3: Commit**

```bash
git add apps/v4/content/docs/daisyui-integration.md
git commit -m "docs: add daisyui integration documentation"
```

### Task 7: Final Integration Tests

**Files:**
- Create: `apps/v4/components/__tests__/integration.test.ts`

**Step 1: Write integration test**

```typescript
// apps/v4/components/__tests__/integration.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ThemeProvider from '../../lib/theme-provider'
import { Button } from '../../registry/new-york-v4/ui/button'

describe('DaisyUI Integration', () => {
  it('should render daisyui button with theme', async () => {
    const wrapper = mount(ThemeProvider, {
      slots: {
        default: Button,
      },
      props: {
        defaultTheme: 'light',
      },
    })

    const button = wrapper.findComponent(Button)
    await button.setProps({ variant: 'primary' })

    expect(button.classes()).toContain('bg-blue-500')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('should maintain backward compatibility', () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'default',
      },
    })

    expect(wrapper.classes()).toContain('bg-primary')
  })
})
```

**Step 2: Run integration tests**

Run: `pnpm --filter v4 test`
Expected: PASS

**Step 3: Run all tests**

Run: `pnpm test`
Expected: PASS (all CLI tests + new integration tests)

**Step 4: Update registry**

Run: `pnpm registry:build`
Expected: Registry builds successfully with new components

**Step 5: Commit**

```bash
git add apps/v4/components/__tests__/integration.test.ts
git commit -m "test: add daisyui integration tests"
```

### Task 8: Build and Final Verification

**Files:** None (verification only)

**Step 1: Build documentation site**

Run: `pnpm build`
Expected: Build completes successfully

**Step 2: Run final test suite**

Run: `pnpm test`
Expected: PASS (all tests passing)

**Step 3: Verify registry build**

Run: `pnpm registry:build`
Expected: Registry updated with new components

**Step 4: Final commit**

```bash
git add .
git commit -m "feat: complete daisyui integration with light/dark themes and enhanced button component

- Add DaisyUI theme system foundation
- Implement light and dark themes
- Create theme provider and composable
- Enhance button component with variant/subvariant pattern
- Add comprehensive tests and documentation
- Maintain full backward compatibility

Resolves: Adds DaisyUI integration as designed"
```

---

## Success Criteria

- [ ] All tests pass (`pnpm test`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Registry builds (`pnpm registry:build`)
- [ ] Documentation is comprehensive
- [ ] Backward compatibility maintained
- [ ] DaisyUI button variants work
- [ ] Theme switching functions

## Implementation Notes

- Each task includes tests following TDD principles
- Frequent commits ensure progress tracking
- All file paths are explicit and precise
- Backward compatibility is maintained throughout
- Tests cover both new functionality and regression prevention