<script setup lang="ts">
  const uplink = '/indicators/goods/';

  const indicators = useGoodsIndicators();
  const materialLandfilled = ref(indicators.value.materialLandfilled ?? 0)

  function updateIndicator() {
    const v = materialLandfilled.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.materialLandfilled = v;
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
    &gt; Material Landfilled
  </p>
  <p>Enter the amount of material landfilled annually (kg).</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Material landfilled (kg): <input type="number" required v-model.number="materialLandfilled">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>