<script setup lang="ts">
  const uplink = '/indicators/habitat/';

  const indicators = useHabitatIndicators();
  const ngbsPoints = ref(indicators.value.ngbsPoints ?? 0)

  function updateIndicator() {
    const v = ngbsPoints.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.ngbsPoints = v;
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
    &gt; NGBS Points
  </p>
  <p>Enter the total NGBS (National Green Building Standard) points earned for your building.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      NGBS Points: <input type="number" required v-model.number="ngbsPoints">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>