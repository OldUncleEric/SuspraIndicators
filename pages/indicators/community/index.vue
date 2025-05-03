<script setup lang="ts">
  const pages = [
    { title: 'Knowledge Tests', link: 'knowledge-tests' },
    { title: 'Surveys', link: 'surveys' },
    { title: 'Practices Done', link: 'practices-done' },
    { title: 'Volunteer Hours', link: 'volunteer-hours' },
  ];
  const score = useCommunityScore();

  function done() {
    navigateTo('/');
  }
</script>

<template>
  <nav>
    <ol>
      <li><NuxtLink to="/">Suspra Pathways</NuxtLink></li>
      <li>Community Indicators</li>
    </ol>
  </nav>
  <div class="grid">
    <template v-for="page in pages">
      <p>{{ page.title }}</p>
      <p><NuxtLink :to="'/indicators/community/' + page.link">Edit</NuxtLink></p>
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
nav ol {
  display: flex;
  list-style: none;
}
nav ol li + li {
  margin-inline-start: 0.25em;
}
nav ol li + li::before {
  content: "> ";
}
</style>
