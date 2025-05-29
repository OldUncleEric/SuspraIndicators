<script setup>
  import { useRouter } from 'vue-router'
  import { suspra } from '../suspra'

  const router = useRouter()

  function nextPathway() {
    router.push({ name: 'movement' })
  }
</script>

<template>
  <main>
    <h1>Suspra Score Calculator - Water Pathway</h1>
    <p>
      <label for="water_gallonsConsumed">Gallons of water consumed per person per day</label>
      <input id="water_gallonsConsumed" type="text" v-model="suspra.water.gallonsConsumed">
    </p>
    <button @click="nextPathway">Next</button>
  </main>
</template>
