<script setup lang="ts">
  const uplink = '/indicators/energy/';

  const indicators = useEnergyIndicators();
  const fuelUsed = ref(indicators.value.fuelUsed ?? 0)

  function updateIndicator() {
    const v = fuelUsed.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.fuelUsed = v;
    saveIndicators(indicators);
  }

  function done() {
    navigateTo(uplink);
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Indicators</NuxtLink>
    &gt; <NuxtLink :to="uplink">Energy Indicators</NuxtLink>
    &gt; Fuel Used
  </p>
  <p>Enter the amount of fuel used during the assessment period in liters.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Fuel used (liters): <input type="number" required v-model.number="fuelUsed">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>