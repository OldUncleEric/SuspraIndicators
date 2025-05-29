<script setup>
  import { useRouter } from 'vue-router'
  import { suspra } from '../suspra'

  const router = useRouter()

  function nextPathway() {
    router.push({ name: 'goods' })
  }
</script>

<template>
  <main>
    <h1>Suspra Score Calculator - Energy Pathway</h1>
    <p>
      <label for="energy_gallonsGasolineConsumed">Gallons of gasoline consumed per person per day</label>
      <input id="energy_gallonsGasolineConsumed" type="text" v-model="suspra.energy.gallonsGasolineConsumed">
    </p>
    <p>
      <label for="energy_gallonsDieselConsumed">Gallons of diesel consumed per person per day</label>
      <input id="energy_gallonsDieselConsumed" type="text" v-model="suspra.energy.gallonsDieselConsumed">
    </p>
    <button @click="nextPathway">Next</button>
  </main>
</template>
