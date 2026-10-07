<script setup lang="ts">
defineProps<{
  links: {
    label: string
    icon: string
    to: string
  }[]
}>()
</script>

<template>
  <div
    class="relative z-10 flex flex-wrap items-center gap-2"
    @click.stop
  >
    <UButton
      v-for="link in links"
      :key="link.to"
      v-bind="{ size: 'xs', color: 'neutral', variant: 'ghost', ...link }"
      target="_blank"
      rel="noopener"
      :aria-label="`${link.label} (opens in a new tab)`"
    />
  </div>
</template>
