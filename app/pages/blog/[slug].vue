<script setup lang="ts">
const route = useRoute()

const slug = route.params.slug as string
const { data: post } = await useAsyncData(`blog-${slug}`, async () => {
  // Try to find the post by matching the slug in the path
  const allPosts = await queryCollection('blog').all()
  return allPosts.find((p: any) => {
    const path = p._path || p.path || ''
    return path.includes(slug) || path.endsWith(`/${slug}`) || path === `/blog/${slug}`
  }) || null
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Blog post not found',
    fatal: true
  })
}

useSeoMeta({
  title: post.value.title,
  ogTitle: post.value.title,
  description: post.value.description,
  ogDescription: post.value.description,
  ogImage: post.value.image
})
</script>

<template>
  <UPage v-if="post">
    <UPageHero
      :title="post.title"
      :description="post.description"
    >
      <template #links>
        <div class="flex items-center gap-4 text-sm text-muted">
          <div class="flex items-center gap-2">
            <UAvatar
              v-if="post.author?.avatar"
              :src="post.author.avatar.src"
              :alt="post.author.name"
              size="sm"
            />
            <span>{{ post.author?.name }}</span>
          </div>
          <span>•</span>
          <span>{{ new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
          <span>•</span>
          <span>{{ post.minRead }} min read</span>
        </div>
      </template>
    </UPageHero>

    <UPageBody>
      <UContainer>
        <article class="prose prose-neutral dark:prose-invert max-w-none">
          <ContentRenderer :value="post" />
        </article>

        <USeparator class="my-12" />

        <div class="flex justify-center">
          <UButton
            to="/blog"
            variant="soft"
            color="neutral"
            label="Back to Blog"
            icon="i-lucide-arrow-left"
          />
        </div>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

