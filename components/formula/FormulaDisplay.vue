<script setup lang="ts">
  import {
    FormulaParametersLinearScaleClampedDisplay,
  } from '#components';

  const props = defineProps<{
    indicators: IndicatorFormula[]
  }>();

  const componentMap = new Map<string, any>([
    ['linearScaleClamped', FormulaParametersLinearScaleClampedDisplay],
  ]);
</script>

<template>
  <div>
    <details v-for="{ key, text, formula } in props.indicators" :key="key">
      <summary>{{ text }}</summary>
      <div>
        <p class="text-colon">Normalize by occupancy: {{ formula.occupancyNormalize }}</p>
        <p class="text-colon">Normalize by time: {{ formula.timeNormalize }}</p>
        <p class="text-colon">Formula: {{ formula.formula }}</p>
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
