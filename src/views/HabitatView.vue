<script setup>
  import { useRouter } from 'vue-router'
  import { suspra } from '../suspra'

  const router = useRouter()

  function gotoScore() {
    router.push({ name: 'score' })
  }
</script>

<template>
  <main>
    <h1>Suspra Score Calculator - Habitat Pathway</h1>
    <p>
      <label for="habitat_gallonsSyntheticFertilizerApplied">Gallons of synthetic fertilizer applied to your yard per year</label>
      <input id="habitat_gallonsSyntheticFertilizerApplied" type="text" v-model="suspra.habitat.gallonsSyntheticFertilizerApplied">
    </p>
    <p>
      <label for="habitat_gallonsSyntheticPesticideApplied">Gallons of synthetic pesticide applied to your yard per year</label>
      <input id="habitat_gallonsSyntheticPesticideApplied" type="text" v-model="suspra.habitat.gallonsSyntheticPesticideApplied">
    </p>
    <button @click="gotoScore">Next</button>
  </main>
</template>
