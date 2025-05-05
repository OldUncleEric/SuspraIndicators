export const useHabitatScore = () => {
    const assessment = useAssessment();
    const indicators = useHabitatIndicators();
    const formulas = useHabitatFormulas();
    return computed(() => {
      return habitatScore(assessment.value, indicators.value, formulas.value);
    });
  }
