<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { data: posts } = await useAsyncData('index-blogs', () =>
  queryCollection('blog').order('date', 'DESC').limit(3).all()
)
</script>

<template>
  <UPageSection
    :title="page.blog.title"
    :description="page.blog.description"
    :ui="{
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <!-- Coming Soon Placeholder -->
    <div
      v-if="!posts || posts.length === 0"
      class="flex flex-col items-center justify-center py-12 px-6 rounded-xl border border-dashed border-muted/50 bg-muted/5"
    >
      <UIcon
        name="i-lucide-notebook-pen"
        class="size-12 text-muted mb-4"
      />
      <p class="text-lg font-medium text-default">Coming Soon</p>
      <p class="text-sm text-muted mt-1 text-center max-w-md">
        I'm working on some articles to share my thoughts on engineering, leadership, and building great software. Stay tuned!
      </p>
    </div>

    <!-- Blog Posts List -->
    <UBlogPosts
      v-else
      orientation="vertical"
      class="gap-4 lg:gap-y-4"
    >
      <UBlogPost
        v-for="(post, index) in posts"
        :key="index"
        orientation="horizontal"
        variant="naked"
        v-bind="post"
        :to="post.path"
        :ui="{
          root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
          body: '!px-0',
          header: 'hidden'
        }"
      >
        <template #footer>
          <UButton
            size="xs"
            variant="link"
            class="px-0 gap-0"
            label="Read Article"
          >
            <template #trailing>
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </template>
          </UButton>
        </template>
      </UBlogPost>
    </UBlogPosts>
  </UPageSection>
</template>
