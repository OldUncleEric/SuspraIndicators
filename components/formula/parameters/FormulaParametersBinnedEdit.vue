<script setup lang="ts">
  const props = defineProps<{
    indicator: string;
    index: number;
    formulaParams: BinnedParameters;
  }>();
  const emit = defineEmits<{
    change: [index: number, params: BinnedParameters];
  }>();
  const comparisons = [
    { value: 'gte', text: '>=' },
    { value: 'lt', text: '<' },
  ];

  const fallThroughScore = ref(props.formulaParams.fallThroughScore);
  const comparison = ref(props.formulaParams.comparison);
  const binCutoffs = ref(props.formulaParams.bins.map((v) => v[0]));
  const binScores = ref(props.formulaParams.bins.map((v) => v[1]));
  const errors = ref({
    fallThroughScore: '',
    comparison: '',
    bins: '',
  });

  function addBin() {
    binCutoffs.value.push(0);
    binScores.value.push(0);
  }

  function removeBin(index: number) {
    binCutoffs.value.splice(index, 1);
    binScores.value.splice(index, 1);
  }

  function updateParams() {
    const fallThroughScoreNum = parseFloat(fallThroughScore.value);
    const comparisonValid = comparisons.find((v) => v.value === comparison.value);
    const binCutoffNums = binCutoffs.value.map((v) => {
      const num = parseFloat(v);
      const invalid = Number.isNaN(num);
      return [invalid, num];
    });
    const binScoreNums = binScores.value.map((v) => {
      const num = parseFloat(v);
      const invalid = Number.isNaN(num);
      return [invalid, num];
    });
    errors.value.fallThroughScore = Number.isNaN(fallThroughScoreNum)
      ? 'Fall-through score should be a decimal number'
      : '';
    errors.value.comparison = comparisonValid
      ? ''
      : `Comparison should be one of: ${comparisons.map((v) => `'${v.text}'`)}`;
    errors.value.bins = binCutoffNums.filter((pr) => pr[0]).length || binScoreNums.filter((pr) => pr[0]).length
      ? 'Bin cutoffs and scores should be decimal numbers'
      : '';
    if (errors.value.fallThroughScore
      || errors.value.comparison
      || errors.value.bins) {
      return;
    }
    emit(
      'change',
      props.index,
      {
        fallThroughScore: fallThroughScoreNum,
        comparison: comparison.value,
        bins: binCutoffNums.map((pr, i) => [pr[1], binScoreNums[i][1]]),
      }
    );
  }
</script>

<template>
  <form @submit.prevent="updateParams" class="grid">
    <label :for="`${props.indicator}-fallThroughScore`" class="mt-0.5 text-colon">Fall-Through Score</label>
    <p v-if="errors.fallThroughScore" class="my-none text-red">{{ errors.fallThroughScore }}</p>
    <p v-if="errors.fallThroughScore" class="my-none"></p>
    <input :id="`${props.indicator}-fallThroughScore`" type="text" required v-model="fallThroughScore">
    <label :for="`${props.indicator}-comparison`" class="mt-0.5 text-colon">Comparison</label>
    <p v-if="errors.comparison" class="my-none text-red">{{ errors.comparison }}</p>
    <p v-if="errors.comparison" class="my-none"></p>
    <select :id="`${props.indicator}-comparison`" required v-model="comparison">
      <option disabled value="">Select a comparison</option>
      <option v-for="option in comparisons" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <p class="mt-0.5">Bins</p>
    <p v-if="errors.bins" class="my-none text-red">{{ errors.bins }}</p>
    <p v-else class="my-none"></p>
    <p class="my-none"></p>
    <div class="grid-3">
      <p class="my-none">Cutoff</p>
      <p class="my-none">Score</p>
      <p class="my-none"></p>
      <template v-for="(cutoff, idx) in binCutoffs" :key="`${cutoff}-${binScores[idx]}`">
        <input :id="`${props.indicator}-bin-cutoff-${idx}`" type="text" required v-model="binCutoffs[idx]">
        <input :id="`${props.indicator}-bin-score-${idx}`" type="text" required v-model="binScores[idx]">
        <button @click.prevent="removeBin(idx)">-</button>
      </template>
      <button @click.prevent.stop="addBin">+</button>
    </div>
    <input type="submit" value="Save">
  </form>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: max-content 1fr;
}
.grid-3 {
  display: grid;
  grid-template-columns: 7em 7em 2em;
}
.ml-1 {
  margin-inline-start: 1em;
}
.mt-0\.5 {
  margin-inline-end: 0.5em;
}
.my-none {
  margin-block: 0;
}
.text-colon::after {
  content: ":";
}
.text-red {
  color: red;
}
</style>
