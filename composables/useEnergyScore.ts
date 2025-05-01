export const useEnergyScore = () => {
    const indicators = useEnergyIndicators();
    return computed(() => {
      return energyScore(indicators.value);
    });
  }