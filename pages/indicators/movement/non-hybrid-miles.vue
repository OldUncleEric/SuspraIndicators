<script setup lang="ts">
  const uplink = '/indicators/movement/';

  const indicators = useMovementIndicators();
  const miles = ref(indicators.value.milesByNonHybridVehicle ?? 0)

  function updateIndicator() {
    const v = miles.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.milesByNonHybridVehicle = v;
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
    &gt; Miles by Non-Hybrid Vehicle
  </p>
  <p>Enter the miles traveled by non-hybrid fuel-burning private passenger vehicles during the assessment period.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Non-hybrid vehicle miles: <input type="number" required v-model.number="miles">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>