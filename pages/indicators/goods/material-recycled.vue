<script setup lang="ts">
  const uplink = '/indicators/goods/';

  const indicators = useGoodsIndicators();
  const materialRecycled = ref(indicators.value.materialRecycled ?? 0)

  function updateIndicator() {
    const v = materialRecycled.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.materialRecycled = v;
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
    &gt; Material Recycled
  </p>
  <p>Enter the amount of material recycled annually (kg).</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Material recycled (kg): <input type="number" required v-model.number="materialRecycled">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>