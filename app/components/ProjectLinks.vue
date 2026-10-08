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
    class="relative z-10 grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:flex lg:flex-wrap"
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
      class="min-h-11 justify-center"
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
