<script setup lang="ts">
  const pages = [
    { title: 'LEED Points', link: 'leed-points' },
    { title: 'NGBS Points', link: 'ngbs-points' },
    { title: 'Conservation Budget', link: 'conservation-budget' },
    { title: 'Land Growing Wild', link: 'land-growing-wild' },
    { title: 'Fertilizer Applications', link: 'fertilizer-applications' },
    { title: 'Pesticide Applications', link: 'pesticide-applications' },
  ];
  const score = useHabitatScore();

  function done() {
    navigateTo('/');
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Pathways</NuxtLink>
    &gt; Habitat Indicators
  </p>
  <div class="grid">
    <template v-for="page in pages">
      <p>{{ page.title }}</p>
      <p><NuxtLink :to="'/indicators/habitat/' + page.link">Edit</NuxtLink></p>
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