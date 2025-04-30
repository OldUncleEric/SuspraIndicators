export const useMovementStarted = () => {
    const indicators = useMovementIndicators();
    return computed(() => movementStarted(indicators.value));
  }