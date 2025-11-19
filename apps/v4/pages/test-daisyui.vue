<script setup lang="ts">
import ThemeProvider from '~/lib/theme-provider.vue'
import { Button } from '~/registry/new-york-v4/ui/button'

useSeoMeta({
  title: 'DaisyUI Button Test',
  description: 'Test page for DaisyUI button integration',
})
</script>

<template>
  <div class="container mx-auto p-8 space-y-6">
    <h1 class="text-3xl font-bold mb-6">
      🌼 DaisyUI Integration Test
    </h1>

    <ThemeProvider default-theme="light">
      <div class="space-y-6">
        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Color Variants
          </h2>
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
            <Button variant="daisy_accent">
              Accent
            </Button>
            <Button variant="daisy_neutral">
              Neutral
            </Button>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Subvariants
          </h2>
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
            <Button variant="daisy_info" subvariant="link">
              Link
            </Button>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Size Variants
          </h2>
          <div class="flex gap-2 flex-wrap items-center">
            <Button variant="daisy_primary" size="xs">
              XS
            </Button>
            <Button variant="daisy_primary" size="sm">
              SM
            </Button>
            <Button variant="daisy_primary" size="md">
              MD
            </Button>
            <Button variant="daisy_primary" size="lg">
              LG
            </Button>
            <Button variant="daisy_primary" size="xl">
              XL
            </Button>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4">
            Backward Compatible
          </h2>
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
            <Button variant="secondary">
              Secondary
            </Button>
            <Button variant="ghost">
              Ghost
            </Button>
            <Button variant="link">
              Link
            </Button>
          </div>
        </section>
      </div>
    </ThemeProvider>
  </div>
</template>
