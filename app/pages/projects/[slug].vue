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

const sectionById = computed(() => {
  return Object.fromEntries((project.value?.sections || []).map(section => [section.id, section]))
})

const blocks = computed(() => {
  if (project.value?.blocks?.length) {
    return project.value.blocks
  }
  return [
    'hero',
    ...(project.value?.sections || []).map(section => section.id)
  ]
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
    <template
      v-for="(block, blockIndex) in blocks"
      :key="block"
    >
      <UPageHero
        v-if="block === 'hero'"
        :title="project.title"
        :description="project.description"
        orientation="horizontal"
        :ui="{
          container: '!py-8 sm:!py-12 lg:!py-16',
          title: '!mx-0 text-left text-xl sm:text-5xl lg:text-5xl',
          description: '!mx-0 max-w-prose text-left text-md md:text-base',
          links: 'justify-start'
        }"
      >
        <template #links>
          <div class="flex max-w-prose flex-col gap-6">
            <ProjectLinks
              v-if="project.links?.length"
              :links="project.links"
            />
            <dl
              v-if="project.summary"
              class="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3"
            >
              <div>
                <dt class="text-muted">
                  Stack
                </dt>
                <dd>{{ project.summary.stack }}</dd>
              </div>
              <div>
                <dt class="text-muted">
                  Status
                </dt>
                <dd>{{ project.summary.status }}</dd>
              </div>
              <div>
                <dt class="text-muted">
                  Code
                </dt>
                <dd>{{ project.summary.code }}</dd>
              </div>
            </dl>
          </div>
        </template>
        <img
          :src="project.image"
          :alt="project.imageAlt || project.title"
          class="aspect-[4/3] w-full rounded-lg object-cover"
          width="1200"
          height="900"
        >
      </UPageHero>
      <UPageSection
        v-else-if="sectionById[block]"
        :ui="{ container: blockIndex === 1 ? '!gap-0 !pt-0 !pb-8 sm:!pb-10' : '!gap-0 !py-8 sm:!py-10' }"
      >
        <h2 class="text-left text-xl font-medium text-highlighted lg:text-2xl">
          {{ sectionById[block].title }}
        </h2>
        <p
          v-if="sectionById[block].body"
          class="mt-3 max-w-prose text-pretty text-muted"
        >
          {{ sectionById[block].body }}
        </p>
        <p
          v-if="sectionById[block].notes"
          class="mt-3 max-w-prose text-sm text-pretty text-muted"
        >
          {{ sectionById[block].notes }}
        </p>
        <div
          v-if="sectionById[block].images?.length"
          class="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <a
            v-for="(image, imageIndex) in sectionById[block].images"
            :key="`${image.src}-${imageIndex}`"
            :href="image.href"
            target="_blank"
            rel="noopener"
            :aria-label="`${image.alt} (opens in a new tab)`"
            class="block aspect-square overflow-hidden rounded-lg bg-muted outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-(--ui-bg)"
          >
            <NuxtImg
              :src="image.src"
              :alt="image.alt"
              :width="image.width"
              :height="image.height"
              loading="lazy"
              sizes="100vw sm:33vw"
              class="size-full object-cover"
            />
          </a>
        </div>
        <div
          v-if="sectionById[block].youtubeId"
          class="mt-8"
        >
          <YoutubeLite
            :video-id="sectionById[block].youtubeId"
            :play-label="sectionById[block].youtubeLabel || project.youtubeLabel || `Play ${project.title} video`"
          />
        </div>
        <div
          v-if="sectionById[block].columns?.length"
          class="mt-8 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2"
        >
          <div
            v-for="column in sectionById[block].columns"
            :key="column.title"
            class="rounded-lg bg-muted/50 p-5 sm:p-6"
          >
            <h3 class="text-lg font-medium text-highlighted">
              {{ column.title }}
            </h3>
            <ol class="mt-3 list-decimal space-y-2 pl-5 text-muted">
              <li
                v-for="step in column.steps"
                :key="step"
              >
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
        <ul
          v-if="sectionById[block].items?.length"
          class="mt-4 flex flex-wrap gap-2"
        >
          <li
            v-for="item in sectionById[block].items"
            :key="item"
          >
            <UBadge
              color="neutral"
              variant="subtle"
              :label="item"
            />
          </li>
        </ul>
        <ProjectLinks
          v-if="sectionById[block].showLinks && project.links?.length"
          class="mt-6"
          :links="project.links"
        />
      </UPageSection>
    </template>
  </UPage>
</template>
