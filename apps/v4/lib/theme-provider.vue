<script setup lang="ts">
import { provide } from 'vue'
import { useDaisyUITheme } from './use-daisyui-theme'

interface Props {
  defaultTheme?: string
}

// Export component name for proper import
defineOptions({
  name: 'ThemeProvider',
})

const props = withDefaults(defineProps<Props>(), {
  defaultTheme: 'light',
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
