<script setup>
  import { useRouter } from 'vue-router'
  import { suspra } from '../suspra'

  const router = useRouter()

  function nextPathway() {
    router.push({ name: 'water' })
  }
</script>

<template>
  <main>
    <h1>Suspra Score Calculator - Food Pathway</h1>
    <p>
      <label for="food_percentagePlantBased">Plant-based meals as a percentage of total meals</label>
      <input id="food_percentagePlantBased" type="text" v-model="suspra.food.percentagePlantBased">
    </p>
    <p>
      <label for="food_percentageWater">Plain water as a percentage of total beverages consumed</label>
      <input id="food_percentageWater" type="text" v-model="suspra.food.percentageWater">
    </p>
    <button @click="nextPathway">Next</button>
  </main>
</template>
