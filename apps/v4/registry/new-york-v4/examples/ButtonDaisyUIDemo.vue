<script setup lang="ts">
import { ref } from "vue"
import { Button } from "../ui/button"

const selectedVariant = ref("primary")
const selectedSubvariant = ref("")
</script>

<template>
  <div class="space-y-4">
    <h3 class="text-lg font-semibold">
      DaisyUI Button Examples
    </h3>

    <!-- Color Variants -->
    <div class="space-y-2">
      <h4 class="font-medium">
        Color Variants
      </h4>
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
    </div>

    <!-- Subvariants -->
    <div class="space-y-2">
      <h4 class="font-medium">
        Style Subvariants
      </h4>
      <div class="flex gap-2 flex-wrap">
        <Button variant="daisy_primary" subvariant="outline">
          Primary Outline
        </Button>
        <Button variant="daisy_success" subvariant="ghost">
          Success Ghost
        </Button>
        <Button variant="daisy_warning" subvariant="soft">
          Warning Soft
        </Button>
        <Button variant="daisy_error" subvariant="dash">
          Error Dash
        </Button>
      </div>
    </div>

    <!-- Size Variants -->
    <div class="space-y-2">
      <h4 class="font-medium">
        Size Variants
      </h4>
      <div class="flex gap-2 items-center">
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
    </div>

    <!-- Backward Compatibility -->
    <div class="space-y-2">
      <h4 class="font-medium">
        Backward Compatible
      </h4>
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
        <Button variant="ghost">
          Ghost
        </Button>
        <Button variant="link">
          Link
        </Button>
      </div>
    </div>
  </div>
</template>
