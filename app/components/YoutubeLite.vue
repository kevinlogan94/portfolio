<script setup lang="ts">
const props = defineProps<{
  videoId: string
  playLabel: string
}>()

const playing = ref(false)

const posterSrc = computed(() => `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`)
const embedSrc = computed(() =>
  `https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1`
)

function play() {
  playing.value = true
}
</script>

<template>
  <div class="relative aspect-video overflow-hidden rounded-lg bg-muted">
    <iframe
      v-if="playing"
      class="absolute inset-0 size-full"
      :src="embedSrc"
      :title="playLabel"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
    <template v-else>
      <img
        :src="posterSrc"
        alt=""
        class="absolute inset-0 size-full object-cover"
        width="1280"
        height="720"
      >
      <button
        type="button"
        class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/45 text-white outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white motion-reduce:transition-none"
        :aria-label="playLabel"
        @click="play"
      >
        <span
          class="flex size-14 items-center justify-center rounded-full bg-white text-black shadow-md"
          aria-hidden="true"
        >
          <UIcon
            name="i-lucide-play"
            class="size-6 translate-x-0.5"
          />
        </span>
        <span class="px-4 text-center text-sm font-medium sm:text-base">
          {{ playLabel }}
        </span>
      </button>
    </template>
  </div>
</template>
