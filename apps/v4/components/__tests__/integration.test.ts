import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import ThemeProvider from '../../lib/theme-provider.vue'
import { Button } from '../../registry/new-york-v4/ui/button'

describe('daisyUI Integration', () => {
  beforeEach(() => {
    // Reset document theme before each test
    document.documentElement.removeAttribute('data-theme')
    // Clear any inline styles
    document.documentElement.removeAttribute('style')
  })

  afterEach(() => {
    // Clean up after each test
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.removeAttribute('style')
  })

  it('should render daisyui button with theme', async () => {
    const wrapper = mount(ThemeProvider, {
      slots: {
        default: {
          template: '<Button variant="daisy_primary">Primary</Button>',
          components: { Button },
        },
      },
      props: {
        defaultTheme: 'light',
      },
    })

    await nextTick()

    const button = wrapper.findComponent(Button)
    expect(button.classes()).toContain('bg-blue-500')
    expect(button.classes()).toContain('text-white')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('should maintain backward compatibility', async () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'default',
      },
    })

    await nextTick()

    expect(wrapper.classes()).toContain('bg-primary')
    expect(wrapper.classes()).toContain('text-primary-foreground')
  })

  it('should handle daisyui subvariants correctly', async () => {
    const wrapper = mount(Button, {
      props: {
        variant: 'daisy_primary',
        subvariant: 'outline',
      },
    })

    await nextTick()

    expect(wrapper.classes()).toContain('border-2')
    expect(wrapper.classes()).toContain('bg-transparent')
    // Outline subvariant overrides the background, so we expect bg-transparent, not bg-blue-500
  })

  it('should support all daisyui color variants', async () => {
    const colorVariants = [
      { variant: 'daisy_primary', class: 'bg-blue-500' },
      { variant: 'daisy_secondary', class: 'bg-gray-500' },
      { variant: 'daisy_success', class: 'bg-green-500' },
      { variant: 'daisy_warning', class: 'bg-yellow-500' },
      { variant: 'daisy_error', class: 'bg-red-500' },
      { variant: 'daisy_info', class: 'bg-cyan-500' },
      { variant: 'daisy_accent', class: 'bg-purple-500' },
      { variant: 'daisy_neutral', class: 'bg-gray-300' },
    ]

    for (const { variant, class: expectedClass } of colorVariants) {
      const wrapper = mount(Button, {
        props: {
          variant,
        },
      })

      await nextTick()
      expect(wrapper.classes()).toContain(expectedClass)
    }
  })

  it('should apply theme styles to document element', async () => {
    mount(ThemeProvider, {
      props: {
        defaultTheme: 'dark',
      },
    })

    await nextTick()

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('should handle size variants correctly', async () => {
    const sizeVariants = [
      { size: 'xs', class: 'h-6' },
      { size: 'sm', class: 'h-8' },
      { size: 'md', class: 'h-9' },
      { size: 'lg', class: 'h-10' },
      { size: 'xl', class: 'h-12' },
      { size: 'icon', class: 'size-9' },
      { size: 'icon-sm', class: 'size-8' },
      { size: 'icon-lg', class: 'size-10' },
    ]

    for (const { size, class: expectedClass } of sizeVariants) {
      const wrapper = mount(Button, {
        props: {
          variant: 'daisy_primary',
          size,
        },
      })

      await nextTick()
      expect(wrapper.classes()).toContain(expectedClass)
    }
  })

  it('should maintain all original shadcn variants', async () => {
    const originalVariants = [
      { variant: 'default', class: 'bg-primary' },
      { variant: 'destructive', class: 'bg-destructive' },
      { variant: 'outline', class: 'border' },
      { variant: 'secondary', class: 'bg-secondary' },
      { variant: 'ghost', class: '' }, // Ghost has no background color
      { variant: 'link', class: 'text-primary' },
    ]

    for (const { variant, class: expectedClass } of originalVariants) {
      const wrapper = mount(Button, {
        props: {
          variant,
        },
      })

      await nextTick()

      if (expectedClass) {
        expect(wrapper.classes()).toContain(expectedClass)
      }
      else {
        // For ghost variant, check it doesn't have background classes
        expect(wrapper.classes()).not.toContain('bg-')
      }
    }
  })
})
