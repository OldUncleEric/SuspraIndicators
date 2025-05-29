<script setup>
  import { useRouter } from 'vue-router'
  import { suspra } from '../suspra'

  const router = useRouter()

  function nextPathway() {
    router.push({ name: 'habitat' })
  }
</script>

<template>
  <main>
    <h1>Suspra Score Calculator - Goods Pathway</h1>
    <p>
      <label for="goods_percentageMaterialsRecyclable">Percentage of materials purchased that are recyclable</label>
      <input id="goods_percentageMaterialsRecyclable" type="text" v-model="suspra.goods.percentageMaterialsRecyclable">
    </p>
    <p>
      <label for="goods_percentageSolidWasteComposted">Percentage of solid waste composted</label>
      <input id="goods_percentageSolidWasteComposted" type="text" v-model="suspra.goods.percentageSolidWasteComposted">
    </p>
    <button @click="nextPathway">Next</button>
  </main>
</template>
