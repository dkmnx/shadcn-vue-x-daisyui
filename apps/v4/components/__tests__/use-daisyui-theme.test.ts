import { describe, expect, it } from 'vitest'
import { useDaisyUITheme } from '../../lib/use-daisyui-theme'

describe('useDaisyUITheme', () => {
  it('should return default theme', () => {
    const { currentTheme } = useDaisyUITheme()
    expect(currentTheme.value).toBe('light')
  })

  it('should switch themes', () => {
    const { currentTheme, setTheme } = useDaisyUITheme()
    setTheme('dark')
    expect(currentTheme.value).toBe('dark')
  })
})
