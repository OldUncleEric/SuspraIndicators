<script setup lang="ts">
  const pages = [
    { title: 'Total Miles Traveled', link: 'total-miles' },
    { title: 'Miles by Airplane', link: 'airplane-miles' },
    { title: 'Miles by Private Vehicle', link: 'private-vehicle-miles' },
    { title: 'Miles by Non-Hybrid Vehicle', link: 'non-hybrid-miles' },
    { title: 'Miles by Hybrid Vehicle', link: 'hybrid-miles' },
    { title: 'Miles by Electric Vehicle', link: 'electric-miles' },
  ];
  const score = useMovementScore();

  function done() {
    navigateTo('/');
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Pathways</NuxtLink>
    &gt; Movement Indicators
  </p>
  <div class="grid">
    <template v-for="page in pages">
      <p>{{ page.title }}</p>
      <p><NuxtLink :to="'/indicators/movement/' + page.link">Edit</NuxtLink></p>
    </template>
  </div>
  <p>Score: {{ score }}</p>
  <button @click="done">Done</button>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
}
</style>