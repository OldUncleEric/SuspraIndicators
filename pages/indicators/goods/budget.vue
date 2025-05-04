<script setup lang="ts">
  const uplink = '/indicators/goods/';

  const indicators = useGoodsIndicators();
  const budget = ref(indicators.value.budget ?? 0)

  function updateIndicator() {
    const v = budget.value;
    if (typeof v !== "number" || isNaN(v)) {
      return;
    }
    indicators.value.budget = v;
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
    &gt; Goods Budget
  </p>
  <p>Enter the total amount of money spent on tangible goods per year.</p>
  <form @submit.prevent="updateIndicator">
    <p>
      Annual budget ($): <input type="number" required v-model.number="budget">
      <input type="submit">
    </p>
  </form>
  <button @click="done">Done</button>
</template>