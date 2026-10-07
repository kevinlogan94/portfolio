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
    class="relative z-10 flex flex-wrap gap-2"
    @click.stop
  >
    <UButton
      v-for="link in links"
      :key="link.to"
      :to="link.to"
      :icon="link.icon"
      color="neutral"
      variant="subtle"
      size="md"
      target="_blank"
      rel="noopener"
      :aria-label="`${link.label} (opens in a new tab)`"
      class="min-h-11 w-full justify-center sm:w-auto"
    >
      <span>{{ link.label }}</span>
      <UIcon
        name="i-lucide-arrow-up-right"
        class="size-4 opacity-70"
        aria-hidden="true"
      />
      <span class="sr-only">(opens in a new tab)</span>
    </UButton>
  </div>
</template>
