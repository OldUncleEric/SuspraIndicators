<script setup lang="ts">
  const uplink = '/indicators/goods/';

  const indicators = useGoodsIndicators();
  const materialComposted = ref(indicators.value.materialComposted ?? 0)

  function updateIndicator() {
    const v = materialComposted.value;
    if (typeof v !== "number") {
      return;
    }
    indicators.value.materialComposted = v;
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
    &gt; Material Composted
  </p>
  <p>Enter the amount of material composted annually (kg).</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Material composted (kg): <input type="number" required v-model.number="materialComposted">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>