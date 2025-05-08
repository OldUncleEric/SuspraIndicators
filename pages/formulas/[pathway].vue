<script setup lang="ts">
  import {
    FormulaParametersLinearScaleClampedEdit,
    FormulaParametersBinnedEdit,
  } from '#components';

  const uplink = '/formulas';
  const componentMap = new Map<Formula, any>([
    ['linearScaleClamped', FormulaParametersLinearScaleClampedEdit],
    ['binned', FormulaParametersBinnedEdit],
  ]);
  const availableFormulas = [...componentMap.keys()];

  const route = useRoute();
  const pathway = route.params.pathway;
  const { useFormulas, asList } = useFindFormulas(pathway);
  const pathwayFormulas = useFormulas();
  const flist = ref(asList(pathwayFormulas.value));
  const ftype = ref(flist.value.indicators.map((v) => v.formula.formula));
  const onorm = ref(flist.value.indicators.map((v) => v.formula.occupancyNormalize));
  const tnorm = ref(flist.value.indicators.map((v) => v.formula.timeNormalize));
  const fparams = flist.value.indicators.map((v) => {
    const o = {} as { [index: string]: FormulaParameters };
    o[v.formula.formula] = v.formula.parameters;
    return o;
  });

  function done() {
    navigateTo(uplink);
  }

  function changeFormula(index: number) {
    const ft = ftype.value[index];
    let params = fparams[index][ft];
    if (!params) {
      params = defaultFormulaParameters(ft);
      fparams[index][ft] = params;
    }
    const indicator = flist.value.indicators[index];
    indicator.formula.formula = ft;
    indicator.formula.parameters = params;
  }

  function saveParameters(index: number, params: FormulaParameters) {
    const indicator = flist.value.indicators[index];
    const formula = indicator.formula;
    formula.occupancyNormalize = onorm.value[index];
    formula.timeNormalize = tnorm.value[index];
    formula.parameters = params;
    pathwayFormulas.value[indicator.key] = formula;
    fparams[index][ftype.value[index]] = params;
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
        <div class="grid">
          <label :for="`onorm-${key}`">Occupancy normalize</label>
          <input :id="`onorm-${key}`" type="checkbox" v-model="onorm[idx]">
          <label :for="`tnorm-${key}`">Time normalize</label>
          <input :id="`tnorm-${key}`" type="checkbox" v-model="tnorm[idx]">
          <label :for="`ftype-${key}`">Formula</label>
          <select :id="`ftype-${key}`" v-model="ftype[idx]" @change="changeFormula(idx)">
            <option disabled value="">Select a formula</option>
            <option v-for="option in availableFormulas" :key="option" :value="option">
              {{ option }}
            </option>
        </select>
        </div>
        <component :is="componentMap.get(formula.formula)" @change="saveParameters" :indicator="key" :index="idx" :formulaParams="fparams[idx][ftype[idx]]"></component>
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
.grid {
  display: grid;
  grid-template-columns: max-content 1fr;
  justify-items: start;
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
