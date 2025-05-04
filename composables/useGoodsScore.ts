export const useGoodsScore = () => {
    const indicators = useGoodsIndicators();
    return computed(() => {
      return goodsScore(indicators.value);
    });
  }