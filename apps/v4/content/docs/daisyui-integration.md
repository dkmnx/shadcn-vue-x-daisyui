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