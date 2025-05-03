export const useCommunityScore = () => {
  const assessment = useAssessment();
  const indicators = useCommunityIndicators();
  const formulas = useCommunityFormulas();
  return computed(() => communityScore(assessment.value, indicators.value, formulas.value));
}
