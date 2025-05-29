<script setup>
  import { useRouter } from 'vue-router'
  import { suspra } from '../suspra'

  const router = useRouter()

  function nextPathway() {
    router.push({ name: 'food' })
  }
</script>

<template>
  <main>
    <h1>Suspra Score Calculator - Community Pathway</h1>
    <p>
      <label for="community_knowledgeTestScore">Knowledge Test Score</label>
      <input id="community_knowledgeTestScore" type="text" v-model="suspra.community.knowledgeTestScore">
    </p>
    <button @click="nextPathway">Next</button>
  </main>
</template>
