<script setup lang="ts">
  const pages = [
    { title: 'Goods Budget', link: 'budget' },
    { title: 'Material Reused', link: 'material-reused' },
    { title: 'Material Composted', link: 'material-composted' },
    { title: 'Material Recycled', link: 'material-recycled' },
    { title: 'Material Diverted', link: 'material-diverted' },
    { title: 'Material Landfilled', link: 'material-landfilled' },
  ];
  const score = useGoodsScore();

  function done() {
    navigateTo('/');
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Pathways</NuxtLink>
    &gt; Goods Indicators
  </p>
  <div class="grid">
    <template v-for="page in pages">
      <p>{{ page.title }}</p>
      <p><NuxtLink :to="'/indicators/goods/' + page.link">Edit</NuxtLink></p>
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