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
    { value: 'ltf', text: '=/<' },
  ];

  const fallThroughScore = ref(props.formulaParams.fallThroughScore);
  const comparison = ref(props.formulaParams.comparison);
  const errors = ref({
    fallThroughScore: '',
    comparison: '',
    bins: '',
  });

  // This works around an issue with using bins directly as a deeply reactive
  // value in a v-for and updating either the cutoff or score properties in the
  // input event for an input field. What will happen is the update to either
  // property will trigger Vue's reactivity mechanism which, for some reason,
  // removes focus from the input control. The result is that you can type one
  // character and then you have to click back into the input control to type
  // another. That's a major inconvenience if you are trying to type in a
  // multi-digit number.
  const binCount = ref(props.formulaParams.bins.length);
  const bins = props.formulaParams.bins.map((v) => ({
    cutoff: v[0],
    score: v[1]
  }));

  function addBin(indicator: string) {
    bins.push({ cutoff: 0, score: 0 });
    binCount.value = bins.length;

    const id = `${indicator}-bin-${bins.length}-cutoff`;
    setTimeout(
      () => {
        const elem = document.getElementById(id);
        if (elem) {
          elem.focus();
          elem.select();
        }
      },
      0.1
    );
  }

  function removeBin(index: number) {
    bins.splice(index, 1);
    binCount.value = bins.length;
  }

  function updateCutoff(index: number, event: Event) {
    bins[index].cutoff = event.target.value;
  }

  function updateScore(index: number, event: Event) {
    bins[index].score = event.target.value;
  }

  function updateParams() {
    const fallThroughScoreNum = parseFloat(fallThroughScore.value);
    const comparisonValid = comparisons.find((v) => v.value === comparison.value);
    const binNums = bins.map((v) => {
      const cutoffNum = parseFloat(v.cutoff);
      const scoreNum = parseFloat(v.score);
      const invalid = Number.isNaN(cutoffNum) || Number.isNaN(scoreNum);
      return [invalid, [cutoffNum, scoreNum]];
    });
    errors.value.fallThroughScore = Number.isNaN(fallThroughScoreNum)
      ? 'Fall-through score should be a decimal number'
      : '';
    errors.value.comparison = comparisonValid
      ? ''
      : `Comparison should be one of: ${comparisons.map((v) => `'${v.text}'`)}`;
    errors.value.bins = binNums.filter((pr) => pr[0]).length
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
        bins: binNums.map((pr) => pr[1]),
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
    <p class="my-none mt-0.5">Bins</p>
    <p v-if="errors.bins" class="my-none text-red">{{ errors.bins }}</p>
    <p v-else class="my-none"></p>
    <p class="my-none"></p>
    <div class="grid-3">
      <p class="my-none">Cutoff</p>
      <p class="my-none">Score</p>
      <p class="my-none"></p>
      <template v-for="idx in binCount" :key="`bin-${bins[idx - 1].cutoff}-${bins[idx - 1].score}`">
        <input :id="`${props.indicator}-bin-${idx}-cutoff`" type="text" required :value="bins[idx - 1].cutoff" @input="updateCutoff(idx - 1, $event)">
        <input :id="`${props.indicator}-bin-${idx}-score`" type="text" required :value="bins[idx - 1].score" @input="updateScore(idx - 1, $event)">
        <button type="button" @click="removeBin(idx)">-</button>
      </template>
      <button type="button" @click="addBin(props.indicator)">+</button>
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
