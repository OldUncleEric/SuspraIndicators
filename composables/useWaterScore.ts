export const useWaterScore = () => {
  const assessment = useAssessment();
  const indicators = useWaterIndicators();
  const formulas = useWaterFormulas();
  return computed(() => {
    return waterScore(assessment.value, indicators.value, formulas.value);
  });
}
