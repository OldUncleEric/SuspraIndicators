<script setup lang="ts">
  const uplink = '/indicators/movement/';

  const indicators = useMovementIndicators();
  const miles = ref(indicators.value.milesByHybridVehicle ?? 0)

  function updateIndicator() {
    const v = miles.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.milesByHybridVehicle = v;
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
    &gt; Miles by Hybrid Vehicle
  </p>
  <p>Enter the miles traveled by hybrid fuel-burning private passenger vehicles during the assessment period.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Hybrid vehicle miles: <input type="number" required v-model.number="miles">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>