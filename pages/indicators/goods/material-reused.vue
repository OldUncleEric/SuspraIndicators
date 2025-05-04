<script setup lang="ts">
  const uplink = '/indicators/goods/';

  const indicators = useGoodsIndicators();
  const materialReused = ref(indicators.value.materialReused ?? 0)

  function updateIndicator() {
    const v = materialReused.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.materialReused = v;
    saveIndicators(indicators);
  }

  function done() {
    navigateTo(uplink);
  }
</script>

<template>
  <p>
    <NuxtLink to="/">Suspra Indicators</NuxtLink>
    &gt; <NuxtLink :to="uplink">Goods Indicators</NuxtLink>
    &gt; Material Reused
  </p>
  <p>Enter the amount of material reused annually (kg).</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Material reused (kg): <input type="number" required v-model.number="materialReused">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>