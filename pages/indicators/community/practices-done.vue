<script setup lang="ts">
  const uplink = '/indicators/community/';

  const indicators = useCommunityIndicators();
  const count = ref((indicators.value.practicesDonePercentage ?? 0) * 100)

  function updateIndicator() {
    indicators.value.practicesDonePercentage = count.value / 100;
    saveIndicators(indicators);
  }

  function done() {
    navigateTo(uplink);
  }
</script>

<template>
  <nav>
    <ol>
      <li><NuxtLink to="/">Suspra Indicators</NuxtLink></li>
      <li><NuxtLink :to="uplink">Community Indicators</NuxtLink></li>
      <li>Practices Done</li>
    </ol>
  </nav>
  <form @submit.prevent="updateIndicator">
    <p>
      Percentage of practices done: <input type="number" required v-model="count">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>

<style scoped>
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
