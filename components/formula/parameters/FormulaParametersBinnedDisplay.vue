<script setup lang="ts">
  const props = defineProps<{
    formulaParams: BinnedParameters;
  }>();
  const op = comparisonAsOperator(props.formulaParams.comparison);

  function comparisonAsOperator(comparison: string) {
    switch (comparison) {
      case 'gte':
        return '>=';
      case 'lt':
        return '<';
      default:
        return '?';
    }
  }
</script>

<template>
  <div class="grid">
    <p class="ml-1 mt-0.5 text-colon">Fall Through Score</p>
    <p>{{ props.formulaParams.fallThroughScore }}</p>
    <p class="ml-1 mt-0.5 text-colon">Comparison</p>
    <p>{{ props.formulaParams.comparison }}</p>
  </div>
  <p class="ml-1 text-colon">Bins</p>
  <template v-for="[cutoff, score] in props.formulaParams.bins" :key="cutoff">
    <p class="ml-2">{{ `${op} ${cutoff} \u2192 ${score}` }}</p>
  </template>
</template>

<style scoped>
p {
  margin-block: 0;
}
.grid {
  display: grid;
  grid-template-columns: max-content 1fr;
}
.ml-1 {
  margin-inline-start: 1em;
}
.ml-2 {
  margin-inline-start: 2em;
}
.mt-0\.5 {
  margin-inline-end: 0.25em;
}
.text-colon::after {
  content: ":";
}
</style>
