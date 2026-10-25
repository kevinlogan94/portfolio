<script setup lang="ts">
</script>

<template>
  <div>
    <UContainer class="sm:border-x border-default">
      <div class="-mx-4 sm:-mx-6 lg:-mx-8">
        <AppPromoBanner />
        <div class="pt-2">
          <AppHeader :links="navLinks" />
        </div>
      </div>
      <slot />
      <AppFooter />
    </UContainer>
  </div>
</template>
