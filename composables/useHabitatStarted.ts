export const useHabitatStarted = () => {
    const indicators = useHabitatIndicators();
    return computed(() => habitatStarted(indicators.value));
  }