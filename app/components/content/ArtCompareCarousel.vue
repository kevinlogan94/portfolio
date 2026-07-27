<script setup lang="ts">
export interface ArtCompareItem {
  title: string
  remaster: string
  original?: string
  /** Use cover for tall backgrounds; contain (default) for sprites */
  cover?: boolean
}

defineProps<{
  items: ArtCompareItem[]
}>()
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="items"
    arrows
    dots
    loop
    :ui="{
      item: 'basis-full',
      container: 'ms-0'
    }"
    class="w-full"
  >
    <div class="flex flex-col items-center gap-3 px-2 pb-2">
      <p class="text-center font-medium m-0">
        {{ item.title }}
      </p>
      <div
        class="flex gap-3 justify-center items-end w-full"
        :class="item.original ? 'flex-wrap sm:flex-nowrap' : ''"
      >
        <figure
          v-if="item.original"
          class="m-0 flex-1 min-w-[40%] max-w-[280px] text-center"
        >
          <img
            :src="item.original"
            :alt="`${item.title} original`"
            class="w-full object-center mx-auto"
            :class="item.cover ? 'h-[28rem] sm:h-[32rem] object-contain rounded-md' : 'h-56 object-contain'"
          >
          <figcaption class="mt-2 text-xs text-muted">
            Original
          </figcaption>
        </figure>
        <figure class="m-0 flex-1 min-w-[40%] max-w-[280px] text-center">
          <img
            :src="item.remaster"
            :alt="item.original ? `${item.title} remaster` : item.title"
            class="w-full object-center mx-auto"
            :class="item.cover ? 'h-[28rem] sm:h-[32rem] object-contain rounded-md' : 'h-56 object-contain'"
          >
          <figcaption
            v-if="item.original"
            class="mt-2 text-xs text-muted"
          >
            Remaster
          </figcaption>
          <figcaption
            v-else
            class="mt-2 text-xs text-muted"
          >
            {{ item.title }}
          </figcaption>
        </figure>
      </div>
    </div>
  </UCarousel>
</template>
