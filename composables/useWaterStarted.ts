export const useWaterStarted = () => {
  const indicators = useWaterIndicators();
  return computed(() => waterStarted(indicators.value));
}
