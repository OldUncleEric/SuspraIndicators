import { computed, ref } from 'vue'

export const suspra = ref({
  community: {
    knowledgeTestScore: 0
  },
  food: {
    percentagePlantBased: 0,
    percentageWater: 0
  },
  water: {
    gallonsConsumed: 0
  },
  movement: {
    percentageTrips: 0
  },
  energy: {
    gallonsGasolineConsumed: 0,
    gallonsDieselConsumed: 0
  },
  goods: {
    percentageMaterialsRecyclable: 0,
    percentageSolidWasteComposted: 0
  },
  habitat: {
    gallonsSyntheticFertilizerApplied: 0,
    gallonsSyntheticPesticideApplied: 0
  }
})

function exp1(v, n) {
 return (1 / (1 + Math.exp(8 * v - 4)) - n) * 20
}

const scoreCommunity = computed(() => exp1(suspra.value.community.knowledgeTestScore, 0.5))
  const scoreFood = computed(() => exp1(suspra.value.food.percentagePlantBased, 0.1192)
  + exp1(suspra.value.food.percentageWater, 0.5))
const scoreWater = computed(() => (1 / (1 + Math.exp(-suspra.value.water.gallonsConsumed / 25 + 4)) - 0.5) * 20)
const scoreMovement = computed(() => exp1(suspra.value.movement.percentageTrips, 0.5))
const scoreEnergy = computed(() => (1 / (1 + Math.exp(2 - suspra.value.energy.gallonsGasolineConsumed)) - 0.8176) * 20
  + (1 / (1 + Math.exp(2 - suspra.value.energy.gallonsDieselConsumed)) - 0.8176) * 20)
const scoreGoods = computed(() => exp1(suspra.value.goods.percentageMaterialsRecyclable, 0.5)
  + exp1(suspra.value.goods.percentageSolidWasteComposted, 0.5))
const scoreHabitat = computed(() => (1 / (1 + Math.exp(2 - suspra.value.habitat.gallonsSyntheticFertilizerApplied)) - 0.8176) * 20
  + (1 / (1 + Math.exp(2 - suspra.value.habitat.gallonsSyntheticPesticideApplied)) - 0.8176) * 20)

export const score = computed(() => scoreCommunity.value + scoreFood.value + scoreWater.value + scoreMovement.value + scoreEnergy.value + scoreGoods.value + scoreHabitat.value)
