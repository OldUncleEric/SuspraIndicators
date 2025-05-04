<script setup lang="ts">
  import {
    FormulaParametersLinearScaleClampedDisplay,
  } from '#components';

  const props = defineProps<{
    indicators: [string, FormulaCalculationProps][];
  }>();

  const componentMap = new Map<string, any>([
    ['linearScaleClamped', FormulaParametersLinearScaleClampedDisplay],
  ]);
</script>

<template>
  <div>
    <details v-for="[name, formula] in props.indicators" :key="name">
      <summary>{{ name }}</summary>
      <div>
        <p class="text-colon">Formula: {{ formula.formula }}</p>
        <p class="text-colon">Normalize by occupancy: {{ formula.normalize }}</p>
        <component :is="componentMap.get(formula.formula)" :formula-params="formula.parameters"></component>
      </div>
    </details>
  </div>
</template>

<style scoped>
p {
  margin-block: 0;
  margin-inline-start: 1em;
}
summary {
  text-transform: capitalize;
}
</style>
