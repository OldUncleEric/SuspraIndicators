<script setup lang="ts">
  const uplink = '/indicators/movement/';

  const indicators = useMovementIndicators();
  const miles = ref(indicators.value.totalMilesTraveled ?? 0)

  function updateIndicator() {
    const v = miles.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.totalMilesTraveled = v;
    saveIndicators(indicators);
  }

  function done() {
    navigateTo(uplink);
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Indicators</NuxtLink>
    &gt; <NuxtLink :to="uplink">Movement Indicators</NuxtLink>
    &gt; Total Miles Traveled
  </p>
  <p>Enter the total miles traveled for all transportation methods during the assessment period.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Total miles: <input type="number" required v-model.number="miles">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>