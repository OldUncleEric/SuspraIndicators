<script setup lang="ts">
  const props = defineProps<{
    formulaParams: LinearScaleClampedParameters;
  }>();
</script>

<template>
  <div class="grid">
    <p class="ml-1 mt-0.5 text-colon">Scale</p>
    <p>{{ props.formulaParams.scale }}</p>
    <p class="ml-1 mt-0.5 text-colon">Threshold</p>
    <p>{{ props.formulaParams.threshold }}</p>
    <p class="ml-1 mt-0.5 text-colon">Clamp Range</p>
    <p>[ {{ props.formulaParams.clampMin }} .. {{ props.formulaParams.clampMax }} ]</p>
  </div>
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
.mt-0\.5 {
  margin-inline-end: 0.25em;
}
.text-colon::after {
  content: ":";
}
</style>
