<script setup lang="ts">
  const uplink = '/indicators/energy/';

  const indicators = useEnergyIndicators();
  const solarPercentage = ref(indicators.value.solarPercentage ?? 0)

  function updateIndicator() {
    const v = solarPercentage.value;
    if (typeof v !== "number") {
      return;
    }
    if (v < 0) {
      return;
    }
    if (v <= 1) {
      indicators.value.solarPercentage = v * 100;
      return;
    }
    indicators.value.solarPercentage = v;
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
    &gt; Solar Percentage
  </p>
  <p>Enter the percentage of your electricity that comes from solar energy.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Solar percentage: <input type="number" required v-model.number="solarPercentage">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>