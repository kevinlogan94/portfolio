<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const { banner } = useAppConfig()

const actions = computed<ButtonProps[]>(() => [{
  label: 'Play',
  to: banner.to,
  color: 'primary',
  size: 'xs',
  class: 'relative z-10 rounded-full bg-[#60a5fa] font-semibold text-[#0a0a0a] hover:bg-[#93c5fd]'
}])
</script>

<template>
  <UBanner
    v-if="banner.enabled"
    :id="banner.id"
    :to="banner.to"
    :icon="banner.icon"
    color="neutral"
    :close="{ 'aria-label': 'Dismiss announcement' }"
    :actions="actions"
    :ui="{
      root: 'relative z-50 w-full !bg-[#171717] !text-[#e5e5e5]',
      container: 'flex items-center justify-between gap-3 min-h-10 h-auto sm:h-12 py-1.5',
      icon: 'size-4.5 shrink-0 text-[#e5e5e5] pointer-events-none',
      title: 'flex min-w-0 items-center gap-2 text-sm font-medium text-[#e5e5e5]',
      close: 'text-neutral-400 hover:bg-neutral-800 hover:text-white focus-visible:bg-neutral-800 -me-1.5 lg:me-0'
    }"
  >
    <template #title>
      <span class="hidden shrink-0 rounded-full border border-[#60a5fa]/35 bg-[#60a5fa]/14 px-2 py-px text-xs font-semibold text-[#bfdbfe] sm:inline">Early access</span>
      <span class="hidden sm:inline">{{ banner.title }}</span>
      <span class="sm:hidden">Xal's Path is out. Free. No ads.</span>
    </template>
  </UBanner>
</template>
