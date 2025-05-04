<script setup lang="ts">
  const uplink = '/indicators/habitat/';

  const indicators = useHabitatIndicators();
  const fertilizerApplications = ref(indicators.value.fertilizerApplications ?? 0)
  const fertilizerAmount = ref(indicators.value.fertilizerAmount ?? 0)

  function updateIndicator() {
    const apps = fertilizerApplications.value;
    const amount = fertilizerAmount.value;
    if (typeof apps !== "number" || typeof amount !== "number") {
      return;
    }
    indicators.value.fertilizerApplications = apps;
    indicators.value.fertilizerAmount = amount;
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
    &gt; Fertilizer Applications
  </p>
  <p>Enter the number of synthetic fertilizer applications per year and the amount used per application.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Number of applications per year: <input type="number" required v-model.number="fertilizerApplications">
    </p>
    <p>
      Amount per application (kg): <input type="number" required v-model.number="fertilizerAmount">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>