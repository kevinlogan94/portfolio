<script setup lang="ts">
useSeoMeta({
  title: 'Blog',
  ogTitle: 'Blog',
  description: 'Articles and thoughts on engineering, leadership, and building great software.',
  ogDescription: 'Articles and thoughts on engineering, leadership, and building great software.'
})
</script>

<template>
  <UPage>
    <UPageHero
      title="Blog"
      description="Articles and thoughts on engineering, leadership, and building great software."
    />

    <UPageBody>
      <div class="flex flex-col items-center justify-center py-24 px-6 rounded-xl border border-dashed border-muted/50 bg-muted/5">
        <UIcon
          name="i-lucide-notebook-pen"
          class="size-16 text-muted mb-6"
        />
        <p class="text-2xl font-medium text-default">Coming Soon</p>
        <p class="text-md text-muted mt-2 text-center max-w-lg">
          I'm working on some articles to share my thoughts on engineering, leadership, and building great software. Stay tuned!
        </p>
        <UButton
          to="/"
          variant="soft"
          color="neutral"
          class="mt-8"
          label="Back to Home"
          icon="i-lucide-arrow-left"
        />
      </div>
    </UPageBody>
  </UPage>
</template>

