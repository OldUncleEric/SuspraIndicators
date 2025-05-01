export const useEnergyStarted = () => {
    const indicators = useEnergyIndicators();
    return computed(() => energyStarted(indicators.value));
  }