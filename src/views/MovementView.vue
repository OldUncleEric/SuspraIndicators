<script setup>
  import { useRouter } from 'vue-router'
  import { suspra } from '../suspra'

  const router = useRouter()

  function nextPathway() {
    router.push({ name: 'energy' })
  }
</script>

<template>
  <main>
    <h1>Suspra Score Calculator - Movement Pathway</h1>
    <p>
      <label for="movement_percentageTrips">Percent of trips by walking, cycling or taking public transportation</label>
      <input id="movement_percentageTrips" type="text" v-model="suspra.movement.percentageTrips">
    </p>
    <button @click="nextPathway">Next</button>
  </main>
</template>
