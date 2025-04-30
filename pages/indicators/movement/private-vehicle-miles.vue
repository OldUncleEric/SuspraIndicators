<script setup lang="ts">
  const uplink = '/indicators/movement/';

  const indicators = useMovementIndicators();
  const miles = ref(indicators.value.milesByPrivateVehicle ?? 0)

  function updateIndicator() {
    const v = miles.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.milesByPrivateVehicle = v;
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
    &gt; Miles by Private Vehicle
  </p>
  <p>Enter the miles traveled by any private passenger vehicle during the assessment period.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Private vehicle miles: <input type="number" required v-model.number="miles">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>