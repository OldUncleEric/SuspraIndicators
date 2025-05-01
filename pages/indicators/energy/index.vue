<script setup lang="ts">
  const pages = [
    { title: 'Fuel Used', link: 'fuel-used' },
    { title: 'Electricity Used', link: 'electricity-used' },
    { title: 'Solar Percentage', link: 'solar-percentage' },
  ];
  const score = useEnergyScore();

  function done() {
    navigateTo('/');
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Pathways</NuxtLink>
    &gt; Energy Indicators
  </p>
  <div class="grid">
    <template v-for="page in pages">
      <p>{{ page.title }}</p>
      <p><NuxtLink :to="'/indicators/energy/' + page.link">Edit</NuxtLink></p>
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