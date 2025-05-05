<script setup lang="ts">
  const props = defineProps<{
    indicator: string;
    index: number;
    formulaParams: LinearScaleClampedParameters;
  }>();
  const emit = defineEmits<{
    change: [index: number, params: LinearScaleClampedParameters];
  }>();

  const scale = ref(props.formulaParams.scale);
  const threshold = ref(props.formulaParams.threshold);
  const clampMin = ref(props.formulaParams.clampMin);
  const clampMax = ref(props.formulaParams.clampMax);
  const errors = ref({
    scale: '',
    threshold: '',
    clampMin: '',
    clampMax: '',
  });

  function updateParams() {
    const scaleNum = parseFloat(scale.value);
    const thresholdNum = parseFloat(threshold.value);
    const clampMinNum = parseFloat(clampMin.value);
    const clampMaxNum = parseFloat(clampMax.value);
    errors.value.scale = Number.isNaN(scaleNum)
      ? 'Scale should be a decimal number'
      : '';
    errors.value.threshold = Number.isNaN(thresholdNum)
      ? 'Threshold should be a decimal number'
      : '';
    errors.value.clampMin = Number.isNaN(clampMinNum)
      ? 'Clamp minimum should be a decimal number'
      : '';
    errors.value.clampMax = Number.isNaN(clampMaxNum)
      ? 'Clamp maximum should be a decimal number'
      : '';
    if (clampMin > clampMax) {
      errors.value.clampMin = 'Clamp minimum should be less than or equal to clamp maximum';
      errors.value.clampMax = 'Clamp maximum should be greater than or equal to clamp minimum';
    }
    if (errors.value.scale
      || errors.value.threshold
      || errors.value.clampMin
      || errors.value.clampMax) {
      return;
    }
    emit(
      'change',
      props.index,
      {
        scale: scaleNum,
        threshold: thresholdNum,
        clampMin: clampMinNum,
        clampMax: clampMaxNum,
      }
    );
  }
</script>

<template>
  <form @submit.prevent="updateParams" class="grid">
    <label :for="`scale-${props.indicator}`" class="mt-0.5 text-colon">Scale</label>
    <p v-if="errors.scale" class="my-none text-red">{{ errors.scale }}</p>
    <p v-if="errors.scale" class="my-none"></p>
    <input :id="`scale-${props.indicator}`" type="text" required v-model="scale">
    <label :for="`threshold-${props.indicator}`" class="mt-0.5 text-colon">Threshold</label>
    <p v-if="errors.threshold" class="my-none text-red">{{ errors.threshold }}</p>
    <p v-if="errors.threshold" class="my-none"></p>
    <input :id="`threshold-${props.indicator}`" type="text" required v-model="threshold">
    <label :for="`clampMin-${props.indicator}`" class="mt-0.5 text-colon">Clamp Minimum</label>
    <p v-if="errors.clampMin" class="my-none text-red">{{ errors.clampMin }}</p>
    <p v-if="errors.clampMin" class="my-none"></p>
    <input :id="`clampMin-${props.indicator}`" type="text" required v-model="clampMin">
    <label :for="`clampMax-${props.indicator}`" class="mt-0.5 text-colon">Clamp Maximum</label>
    <p v-if="errors.clampMax" class="my-none text-red">{{ errors.clampMax }}</p>
    <p v-if="errors.clampMax" class="my-none"></p>
    <input :id="`clampMax-${props.indicator}`" type="text" required v-model="clampMax">
    <input type="submit" value="Save">
  </form>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: max-content 1fr;
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
