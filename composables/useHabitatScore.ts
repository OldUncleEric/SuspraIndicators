export const useHabitatScore = () => {
    const assessment = useAssessment();
    const indicators = useHabitatIndicators();
    return computed(() => {
      return habitatScore(assessment.value, indicators.value);
    });
  }