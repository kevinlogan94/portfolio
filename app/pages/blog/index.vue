<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryCollection('blog').order('date', 'DESC').all()
)

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
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          v-bind="post"
          :to="post.path"
        />
      </UBlogPosts>
    </UPageBody>
  </UPage>
</template>

