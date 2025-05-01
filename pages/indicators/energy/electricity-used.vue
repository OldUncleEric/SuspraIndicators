<script setup lang="ts">
  const uplink = '/indicators/energy/';

  const indicators = useEnergyIndicators();
  const electricityUsed = ref(indicators.value.electricityUsed ?? 0)

  function updateIndicator() {
    const v = electricityUsed.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.electricityUsed = v;
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
    &gt; Electricity Used
  </p>
  <p>Enter the amount of electricity used during the assessment period in kilowatt-hours (kWh).</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Electricity used (kWh): <input type="number" required v-model.number="electricityUsed">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>