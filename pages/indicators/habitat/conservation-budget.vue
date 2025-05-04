<script setup lang="ts">
  const uplink = '/indicators/habitat/';

  const indicators = useHabitatIndicators();
  const budget = ref(indicators.value.conservationBudget ?? 0)

  function updateIndicator() {
    const v = budget.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.conservationBudget = v;
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
    &gt; Conservation Budget
  </p>
  <p>Enter the annual budget spent on environmental conservation efforts (e.g., habitat restoration, native plants, energy conservation upgrades).</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Annual budget (USD): <input type="number" required v-model.number="budget">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>