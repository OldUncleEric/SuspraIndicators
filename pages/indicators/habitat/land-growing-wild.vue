<script setup lang="ts">
  const uplink = '/indicators/habitat/';

  const indicators = useHabitatIndicators();
  const landGrowingWild = ref(indicators.value.landGrowingWild ?? 0)

  function updateIndicator() {
    const v = landGrowingWild.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.landGrowingWild = v;
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
    &gt; Land Growing Wild
  </p>
  <p>Enter the area of land that is allowed to grow wild or naturally (no mowing, no landscaping).</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Wild area (square meters): <input type="number" required v-model.number="landGrowingWild">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>