<script setup lang="ts">
import { getRegistryItem } from '~/lib/registry'

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

const { data: item, error } = await useAsyncData(`registry-${slug}`, async () => {
  const registryItem = await getRegistryItem(slug)

  if (!registryItem) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Registry item not found',
    })
  }

  return registryItem
})

if (error.value) {
  throw createError({
    statusCode: error.value.statusCode || 404,
    statusMessage: error.value.statusMessage || 'Registry item not found',
  })
}

const title = computed(() => item.value?.name || 'Registry Item')
const description = computed(() => item.value?.description || 'Registry item from shadcn-vue')

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="flex flex-1 flex-col">
    <PageHeader>
      <PageHeaderHeading>{{ title }}</PageHeaderHeading>
      <PageHeaderDescription>{{ description }}</PageHeaderDescription>
    </PageHeader>

    <div class="container-wrapper section-soft flex flex-1 flex-col pb-6">
      <div class="theme-container container flex flex-1 scroll-mt-20 flex-col">
        <div class="bg-background flex flex-col overflow-hidden rounded-lg border bg-clip-padding md:flex-1 xl:rounded-xl">
          <div class="p-6">
            <!-- Render the registry item if it's a Vue component -->
            <component
              :is="item.name"
              v-if="item?.type === 'registry:example'"
              v-bind="item.props || {}"
            />

            <!-- Fallback for other types -->
            <div v-else class="space-y-4">
              <div class="prose prose-sm max-w-none dark:prose-invert">
                <h2>{{ item?.name }}</h2>
                <p>{{ item?.description }}</p>

                <!-- Show registry item info -->
                <div v-if="item" class="bg-muted p-4 rounded-md">
                  <h3 class="font-mono text-sm mb-2">
                    Registry Information:
                  </h3>
                  <pre class="text-xs overflow-auto">{{ JSON.stringify(item, null, 2) }}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
