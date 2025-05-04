export const useGoodsStarted = () => {
    const indicators = useGoodsIndicators();
    return computed(() => goodsStarted(indicators.value));
  }