<script setup lang="ts">
  const uplink = '/indicators/goods/';

  const indicators = useGoodsIndicators();
  const materialDiverted = ref(indicators.value.materialDiverted ?? 0)

  function updateIndicator() {
    const v = materialDiverted.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.materialDiverted = v;
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
    &gt; Material Diverted
  </p>
  <p>Enter the amount of material diverted as hazardous waste annually (kg).</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Material diverted (kg): <input type="number" required v-model.number="materialDiverted">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>