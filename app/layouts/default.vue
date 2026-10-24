<script setup lang="ts">
</script>

<template>
  <div>
    <AppPromoBanner />
    <UContainer class="sm:border-x border-default pt-2">
      <AppHeader :links="navLinks" />
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>
