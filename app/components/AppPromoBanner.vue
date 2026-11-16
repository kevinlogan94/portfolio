<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const { banner } = useAppConfig()

const actions = computed<ButtonProps[]>(() => [{
  label: 'Play',
  to: banner.to,
  color: 'primary',
  size: 'xs',
  class: 'relative z-10 hidden sm:inline-flex rounded-full bg-blue-600 font-semibold text-white hover:bg-blue-700 dark:bg-[#60a5fa] dark:text-[#0a0a0a] dark:hover:bg-[#93c5fd]'
}])

const closeButton = { 'aria-label': 'Dismiss announcement' } as ButtonProps
</script>

<template>
  <UBanner
    v-if="banner.enabled"
    :id="banner.id"
    :to="banner.to"
    :icon="banner.icon"
    color="neutral"
    :close="closeButton"
    :actions="actions"
    :ui="{
      root: 'relative z-50 w-full border-b border-default !outline-none !bg-neutral-100 hover:!bg-neutral-100 !text-neutral-900 dark:!bg-[#171717] dark:hover:!bg-[#171717] dark:!text-[#e5e5e5]',
      container: 'flex items-center justify-center gap-3 min-h-10 h-auto sm:h-12 py-1.5',
      left: 'flex flex-1 items-center',
      right: 'flex flex-1 items-center justify-end',
      center: 'flex min-w-0 items-center justify-center gap-1.5',
      icon: 'size-4.5 shrink-0 text-neutral-700 dark:text-[#e5e5e5] pointer-events-none',
      title: 'flex min-w-0 items-center gap-2 overflow-visible! whitespace-normal! text-sm font-medium text-neutral-900 dark:text-[#e5e5e5]',
      close: 'text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900 focus-visible:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white dark:focus-visible:bg-neutral-800 -me-1.5 lg:me-0'
    }"
  >
    <template #title>
      <span class="hidden shrink-0 rounded-full border border-blue-600/25 bg-blue-600/10 px-2 py-px text-xs font-semibold text-blue-700 dark:border-[#60a5fa]/35 dark:bg-[#60a5fa]/14 dark:text-[#bfdbfe] sm:inline">Early access</span>
      <span class="hidden sm:inline">{{ banner.title }}</span>
      <span class="sm:hidden">Xal's Path is out. Free. No ads.</span>
    </template>
  </UBanner>
</template>
