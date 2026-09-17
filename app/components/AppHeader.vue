<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()

const coffeeHref = 'https://buymeacoffee.com/kevinmlogan'
</script>

<template>
  <div class="fixed top-2 sm:top-4 mx-auto left-1/2 transform -translate-x-1/2 z-10">
    <UNavigationMenu
      :items="links"
      variant="link"
      color="neutral"
      class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
      :ui="{
        link: 'px-2 py-1',
        linkLeadingIcon: 'hidden'
      }"
    >
      <template #list-trailing>
        <div class="flex items-center gap-2 pl-1">
          <a
            :href="coffeeHref"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy me a coffee"
            class="inline-flex h-8 shrink-0 items-center justify-center gap-1 rounded-full bg-[#FFDD00] px-2.5 text-xs font-medium text-[#0f0f0f] no-underline hover:bg-[#f5d400]"
          >
            <UIcon name="i-lucide-coffee" class="size-3.5" />
            Coffee
          </a>
          <span class="h-5 w-px shrink-0 bg-neutral-500/50 dark:bg-neutral-400/50" aria-hidden="true" />
          <ColorModeButton />
        </div>
      </template>
    </UNavigationMenu>
  </div>
</template>
