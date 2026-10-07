<script setup lang="ts">
import 'lite-youtube-embed'

defineProps<{
  videoId: string
  playLabel: string
}>()
</script>

<template>
  <ClientOnly>
    <lite-youtube
      class="w-full overflow-hidden rounded-lg"
      :videoid="videoId"
      :playlabel="playLabel"
      :title="playLabel"
    />
    <template #fallback>
      <div class="relative aspect-video overflow-hidden rounded-lg bg-muted">
        <img
          :src="`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`"
          :alt="playLabel"
          class="size-full object-cover"
        >
        <span class="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-medium text-white">
          {{ playLabel }}
        </span>
      </div>
    </template>
  </ClientOnly>
</template>
