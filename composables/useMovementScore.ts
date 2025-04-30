export const useMovementScore = () => {
    const indicators = useMovementIndicators();
    return computed(() => {
      return movementScore(indicators.value);
    });
  }