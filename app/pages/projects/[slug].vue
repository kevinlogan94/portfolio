<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug || '')

const { data: project } = await useAsyncData(`project-${slug}`, () => {
  return queryCollection('projects').where('slug', '=', slug).first()
})

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const playing = ref(false)
const youtubeSrc = computed(() => {
  return `https://www.youtube-nocookie.com/embed/${project.value?.youtubeId}?autoplay=1`
})
const thumbnailSrc = computed(() => {
  return `https://i.ytimg.com/vi/${project.value?.youtubeId}/hqdefault.jpg`
})

useSeoMeta({
  title: project.value.title,
  ogTitle: project.value.title,
  description: project.value.description,
  ogDescription: project.value.description,
  ogImage: project.value.image
})
</script>

<template>
  <UPage v-if="project">
    <UPageHero
      :title="project.title"
      :description="project.description"
      :ui="{
        title: '!mx-0 text-left text-xl sm:text-5xl lg:text-5xl',
        description: '!mx-0 text-left text-md md:text-base',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="project.links?.length"
          class="flex flex-wrap items-center gap-2"
        >
          <UButton
            v-for="link in project.links"
            :key="link.to"
            v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
            target="_blank"
            rel="noopener"
            :aria-label="`${link.label} (opens in a new tab)`"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0'
      }"
    >
      <div
        v-if="project.youtubeId"
        class="relative aspect-video overflow-hidden rounded-lg bg-muted"
      >
        <iframe
          v-if="playing"
          class="absolute inset-0 size-full"
          :src="youtubeSrc"
          :title="project.title"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        />
        <button
          v-else
          type="button"
          class="absolute inset-0 size-full cursor-pointer"
          :aria-label="`Play ${project.title} video`"
          @click="playing = true"
        >
          <img
            :src="thumbnailSrc"
            :alt="`${project.title} video thumbnail`"
            class="size-full object-cover"
          >
          <span class="absolute inset-0 flex items-center justify-center bg-black/40">
            <span class="flex size-16 items-center justify-center rounded-full bg-white text-black">
              <UIcon
                name="i-lucide-play"
                class="size-8 translate-x-0.5"
              />
            </span>
          </span>
        </button>
      </div>
      <MDC
        v-if="project.body"
        class="mt-10 prose prose-neutral dark:prose-invert max-w-none"
        :value="project.body"
      />
    </UPageSection>
  </UPage>
</template>
