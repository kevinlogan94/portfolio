<script setup lang="ts">
</script>

<template>
  <div>
    <AppPromoBanner />
    <UContainer class="sm:border-x border-default pt-2">
      <div class="-mx-4 sm:-mx-6 lg:-mx-8">
        <AppHeader :links="navLinks" />
      </div>
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>
