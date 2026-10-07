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
      v-for="block in blocks"
      :key="block"
    >
      <UPageHero
        v-if="block === 'hero'"
        :title="project.title"
        :description="project.description"
        orientation="horizontal"
        :ui="{
          title: '!mx-0 text-left text-xl sm:text-5xl lg:text-5xl',
          description: '!mx-0 text-left text-md md:text-base',
          links: 'justify-start'
        }"
      >
        <template #links>
          <div class="flex flex-col gap-6">
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
          :alt="project.title"
          class="w-full rounded-lg object-cover"
        >
      </UPageHero>
      <UPageSection
        v-else-if="sectionById[block]"
        :ui="{ container: '!pt-0' }"
      >
        <h2 class="text-2xl font-bold text-highlighted">
          {{ sectionById[block].title }}
        </h2>
        <p
          v-if="sectionById[block].body"
          class="mt-4 text-muted"
        >
          {{ sectionById[block].body }}
        </p>
        <p
          v-if="sectionById[block].notes"
          class="mt-3 text-sm text-muted"
        >
          {{ sectionById[block].notes }}
        </p>
        <div
          v-if="sectionById[block].images?.length"
          class="mt-6 grid grid-cols-1 items-start gap-4 sm:grid-cols-3"
        >
          <a
            v-for="(image, imageIndex) in sectionById[block].images"
            :key="`${image.src}-${imageIndex}`"
            :href="image.href"
            target="_blank"
            rel="noopener"
            :aria-label="`${image.alt} (opens in a new tab)`"
            class="block overflow-hidden rounded-lg bg-muted"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              :width="image.width"
              :height="image.height"
              loading="lazy"
              class="h-auto w-full"
              :style="image.width && image.height ? { aspectRatio: `${image.width} / ${image.height}` } : undefined"
            >
          </a>
        </div>
        <div
          v-if="sectionById[block].youtubeId"
          class="mt-6"
        >
          <YoutubeLite
            :video-id="sectionById[block].youtubeId"
            :play-label="sectionById[block].youtubeLabel || project.youtubeLabel || `Play ${project.title} video`"
          />
        </div>
        <div
          v-if="sectionById[block].columns?.length"
          class="mt-6 grid gap-8 md:grid-cols-2"
        >
          <div
            v-for="column in sectionById[block].columns"
            :key="column.title"
          >
            <h3 class="text-lg font-semibold text-highlighted">
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
