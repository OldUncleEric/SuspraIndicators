export const useWaterScore = () => {
  const indicators = useWaterIndicators();
  return computed(() => {
    return waterScore(indicators.value);
  });
}
