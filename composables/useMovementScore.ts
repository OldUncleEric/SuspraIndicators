export const useMovementScore = () => {
    const assessment = useAssessment();
    const indicators = useMovementIndicators();
    const formulas = useMovementFormulas();
    return computed(() => {
      return movementScore(assessment.value, indicators.value, formulas.value);
    });
  }
