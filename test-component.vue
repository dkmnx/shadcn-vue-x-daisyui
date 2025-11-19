<script setup lang="ts">
import { ThemeProvider } from './apps/v4/lib/theme-provider'
import { Button } from './apps/v4/registry/new-york-v4/ui/button'
</script>

<template>
  <div class="p-8 space-y-6">
    <h1 class="text-2xl font-bold">
      🌼 DaisyUI Integration Test
    </h1>

    <!-- Theme Provider Test -->
    <ThemeProvider default-theme="light">
      <div class="space-y-4">
        <h2 class="text-xl font-semibold">
          Color Variants
        </h2>

        <!-- DaisyUI Buttons -->
        <div class="flex gap-2 flex-wrap">
          <Button variant="daisy_primary">
            Primary
          </Button>
          <Button variant="daisy_secondary">
            Secondary
          </Button>
          <Button variant="daisy_success">
            Success
          </Button>
          <Button variant="daisy_warning">
            Warning
          </Button>
          <Button variant="daisy_error">
            Error
          </Button>
          <Button variant="daisy_info">
            Info
          </Button>
        </div>

        <h3 class="text-lg font-semibold">
          Subvariants
        </h3>
        <div class="flex gap-2 flex-wrap">
          <Button variant="daisy_primary" subvariant="outline">
            Outline
          </Button>
          <Button variant="daisy_success" subvariant="ghost">
            Ghost
          </Button>
          <Button variant="daisy_warning" subvariant="soft">
            Soft
          </Button>
          <Button variant="daisy_error" subvariant="dash">
            Dash
          </Button>
        </div>

        <h3 class="text-lg font-semibold">
          Backward Compatible
        </h3>
        <div class="flex gap-2 flex-wrap">
          <Button variant="default">
            Default
          </Button>
          <Button variant="destructive">
            Destructive
          </Button>
          <Button variant="outline">
            Outline
          </Button>
        </div>
      </div>
    </ThemeProvider>
  </div>
</template>
