<script setup lang="ts">
  const pathways = computed(() => [
    communityFormulasAsList(useCommunityFormulas().value),
    energyFormulasAsList(useEnergyFormulas().value),
    foodFormulasAsList(useFoodFormulas().value),
    goodsFormulasAsList(useGoodsFormulas().value),
    habitatFormulasAsList(useHabitatFormulas().value),
    movementFormulasAsList(useMovementFormulas().value),
    waterFormulasAsList(useWaterFormulas().value),
  ]);

  function done() {
    navigateTo('/');
  }
</script>

<template>
  <nav>
    <ol>
      <li><NuxtLink to="/">Suspra Pathways</NuxtLink></li>
      <li>Indicator Formulas</li>
    </ol>
  </nav>
  <template v-for="pathway in pathways" :key="pathway.name">
    <dt class="flex-r">
      <p class="my-none mt-2 text-caps">{{ pathway.name }}</p>
      <NuxtLink :to="{ name: 'formulas-pathway', params: { pathway: pathway.name } }">Edit</NuxtLink>
    </dt>
    <dd>
      <FormulaDisplay :indicators="pathway.indicators" />
    </dd>
  </template>
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
.flex-r {
  display: flex;
}
.mb-1 {
  margin-block-start: 1lh;
}
.mt-2 {
  margin-inline-end: 2em;
}
.my-none {
  margin-block: 0;
}
.text-caps {
  text-transform: capitalize;
}
</style>
