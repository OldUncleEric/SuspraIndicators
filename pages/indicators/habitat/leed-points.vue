<script setup lang="ts">
  const uplink = '/indicators/habitat/';

  const indicators = useHabitatIndicators();
  const leedPoints = ref(indicators.value.leedPoints ?? 0)

  function updateIndicator() {
    const v = leedPoints.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.leedPoints = v;
    saveIndicators(indicators);
  }

  function done() {
    navigateTo(uplink);
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Indicators</NuxtLink>
    &gt; <NuxtLink :to="uplink">Habitat Indicators</NuxtLink>
    &gt; LEED Points
  </p>
  <p>Enter the total LEED (Leadership in Energy and Environmental Design) points earned for your building.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      LEED Points: <input type="number" required v-model.number="leedPoints">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>