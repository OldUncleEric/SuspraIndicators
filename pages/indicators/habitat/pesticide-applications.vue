<script setup lang="ts">
  const uplink = '/indicators/habitat/';

  const indicators = useHabitatIndicators();
  const pesticideApplications = ref(indicators.value.pesticideApplications ?? 0)
  const pesticideAmount = ref(indicators.value.pesticideAmount ?? 0)

  function updateIndicator() {
    const apps = pesticideApplications.value;
    const amount = pesticideAmount.value;
    if (typeof apps !== "number" || typeof amount !== "number") {
      return;
    }
    indicators.value.pesticideApplications = apps;
    indicators.value.pesticideAmount = amount;
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
    &gt; Pesticide Applications
  </p>
  <p>Enter the number of synthetic pesticide applications per year and the amount used per application.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Number of applications per year: <input type="number" required v-model.number="pesticideApplications">
    </p>
    <p>
      Amount per application (liters): <input type="number" required v-model.number="pesticideAmount">
    </p>
    <p>
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>