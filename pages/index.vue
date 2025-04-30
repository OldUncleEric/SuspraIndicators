<script setup lang="ts">
  const pathways = [
    { name: 'Community', link: 'community', indicators: useCommunityIndicators(), score: useCommunityScore(), started: useCommunityStarted() },
    { name: 'Food', link: 'food', indicators: useFoodIndicators(), score: useFoodScore(), started: useFoodStarted() },
    { name: 'Water', link: 'water', indicators: useWaterIndicators(), score: useWaterScore(), started: useWaterStarted() },
    { name: 'Movement', link: 'movement', indicators: useMovementIndicators(), score: useMovementScore(), started: useMovementStarted() },
  ];
  const assessment = useAssessment();
  const assessmentStarted = useAssessmentStarted();
  const isEditing = ref(false);
  const totalScore = computed(() => {
    let scores = new Map()
    for (const pathway of pathways) {
      scores.set(pathway.indicators.value.indicators, pathway.score.value);
    }
    return suspraScore(scores);
  });
  const assessmentTypes = new Map([
    ['quick', 'Quick'],
    ['regular', 'Regular'],
    ['detailed', 'Detailed'],
  ]);
  const street = ref();
  const state = ref();
  const country = ref();
  const postalCode = ref();
  const occupancy = ref();
  const totalArea = ref();
  const buildingArea = ref();
  const buildingVolume = ref();
  const startDate = ref();
  const endDate = ref();

  function startAssessment() {
    const address = {} as PhysicalAddress;
    address.street = street.value;
    address.state = state.value;
    address.country = country.value;
    if (postalCode.value) {
      address.postalCode = postalCode.value;
    }
    const a = { address: address } as Assessment;
    a.occupancy = parseInt(occupancy.value);
    a.totalArea = parseInt(totalArea.value);
    a.buildingArea = parseInt(buildingArea.value);
    a.buildingVolume = parseInt(buildingVolume.value);
    a.startDate = startDate.value;
    a.endDate = endDate.value;
    a.mode = 'regular';
    assessment.value = a;
    saveAssessment(assessment);
    isEditing.value = false;
  }

  function editDetails() {
    // Populate form fields with current assessment data
    street.value = assessment.value.address.street;
    state.value = assessment.value.address.state;
    country.value = assessment.value.address.country;
    postalCode.value = assessment.value.address.postalCode || '';
    occupancy.value = assessment.value.occupancy;
    totalArea.value = assessment.value.totalArea;
    buildingArea.value = assessment.value.buildingArea;
    buildingVolume.value = assessment.value.buildingVolume;
    startDate.value = assessment.value.startDate;
    endDate.value = assessment.value.endDate;
    
    // Enable editing mode
    isEditing.value = true;
  }
</script>
<template>
  <h1>Suspra Score Calculator</h1>
  <div v-if="!assessmentStarted || isEditing">
    <p>Start a regular assessment of your home.</p>
    <form @submit.prevent="startAssessment" class="flex-vertical">
      <p class="my-1">Address</p>
      <label>
        Street: <input type="text" required v-model="street">
      </label>
      <label>
        State: <input type="text" required v-model="state">
      </label>
      <label>
        Country: <input type="text" required v-model="country">
      </label>
      <label>
        Postal code: <input type="text" v-model="postalCode">
      </label>
      <label>
        Number of people living in the home: <input type="number" required v-model="occupancy">
      </label>
      <label>
        Area of the property: <input type="number" required v-model="totalArea">
      </label>
      <label>
        Land area of the main building: <input type="number" required v-model="buildingArea">
      </label>
      <label>
        Volume of the main building: <input type="number" required v-model="buildingVolume">
      </label>
      <p class="my-1">Time span for data being collected</p>
      <label>
        Start date: <input type="text" required v-model="startDate">
      </label>
      <label>
        End date: <input type="text" required v-model="endDate">
      </label>
      <input type="submit" class="ms-1 x-10" :value="isEditing ? 'Update Details' : 'Submit'">
      <button v-if="isEditing" type="button" class="ms-1 x-10" @click="isEditing = false">Cancel</button>
    </form>
  </div>
  <div v-else>
    <p>
      {{ assessmentTypes.get(assessment.mode) }} assessment for:
      {{ assessment.address.street }},
      {{ assessment.address.state }},
      {{ assessment.address.country }}
      <button class="ms-1" @click="editDetails">Edit Details</button>
    </p>
    <div class="grid">
      <p>Pathway</p>
      <p>Score</p>
      <p></p>
      <template v-for="pathway in pathways">
        <p>{{ pathway.name }}</p>
        <p>{{ pathway.score.value }}</p>
        <p><NuxtLink :to="`/indicators/${pathway.link}/`">{{ pathway.started.value ? 'Update' : 'Start' }}</NuxtLink></p>
      </template>
      <p>Suspra score</p>
      <p>{{ totalScore }}</p>
      <p></p>
    </div>
  </div>
</template>
<style scoped>
.flex-vertical {
  display: flex;
  flex-direction: column;
}
.grid {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
}
.ms-1 {
  margin-block-start: 0.25rem;
}
.my-1 {
  margin-block-start: 0.25rem;
  margin-block-end: 0.25rem;
}
.x-10 {
  width: 10rem;
}
</style>