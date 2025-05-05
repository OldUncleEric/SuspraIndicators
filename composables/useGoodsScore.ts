export const useGoodsScore = () => {
    const assessment = useAssessment();
    const indicators = useGoodsIndicators();
    const formulas = useGoodsFormulas();
    return computed(() => {
      return goodsScore(assessment.value, indicators.value, formulas.value);
    });
  }
