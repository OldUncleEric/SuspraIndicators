export const useFoodScore = () => {
  const assessment = useAssessment();
  const indicators = useFoodIndicators();
  const formulas = useFoodFormulas();
  return computed(() => {
    return foodScore(assessment.value, indicators.value, formulas.value);
  });
}
