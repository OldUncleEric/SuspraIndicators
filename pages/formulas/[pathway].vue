<script setup lang="ts">
  import {
    FormulaParametersLinearScaleClampedEdit,
  } from '#components';

  const uplink = '/formulas';
  const componentMap = new Map<string, any>([
    ['linearScaleClamped', FormulaParametersLinearScaleClampedEdit],
  ]);

  const route = useRoute();
  const pathway = route.params.pathway;
  const { useFormulas, asList } = useFindFormulas(pathway);
  const pathwayFormulas = useFormulas();
  const flist = computed(() => asList(pathwayFormulas.value));
  const ftype = ref(flist.value.indicators.map((v) => v.formula.formula));
  const normalize = ref(flist.value.indicators.map((v) => v.formula.normalize));

  function done() {
    navigateTo(uplink);
  }

  function saveParameters(index: number, params: FormulaParameters) {
    const indicator = flist.value.indicators[index];
    const formula = indicator.formula;
    formula.normalize = normalize.value[index];
    formula.parameters = params;
    pathwayFormulas.value[indicator.key] = formula;
  }
</script>

<template>
  <nav>
    <ol>
      <li><NuxtLink to="/">Suspra Pathways</NuxtLink></li>
      <li><NuxtLink :to="uplink">Indicator Formulas</NuxtLink></li>
      <li><span class="text-caps">{{ pathway }}</span> Formulas</li>
    </ol>
  </nav>
  <dl>
    <template v-for="({ key, text, formula }, idx) in flist.indicators" :key="key">
      <dt class="mb-1 text-caps">{{ text }}</dt>
      <dd>
        <p>{{ ftype[idx] }}</p>
        <label for="normalize">Normalize</label>
        <input id="normalize" type="checkbox" v-model="normalize[idx]">
        <component :is="componentMap.get(formula.formula)" @change="saveParameters" :index="idx" :formulaParams="formula.parameters"></component>
      </dd>
    </template>
  </dl>
  <button @click="done" class="mb-1">Done</button>
</template>

<style scoped>
nav ol {
  display: flex;
  list-style: none;
}
nav ol li + li {
  margin-inline-start: 0.25em;
}
nav ol li + li::before {
  content: ">";
  margin-inline-end: 0.25em;
}
.mb-1 {
  margin-block-start: 1lh;
}
.my-0 {
  margin-block-start: 0;
  margin-block-end: 0;
}
.text-caps {
  text-transform: capitalize;
}
</style>
