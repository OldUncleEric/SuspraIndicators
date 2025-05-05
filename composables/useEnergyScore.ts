export const useEnergyScore = () => {
    const assessment = useAssessment();
    const indicators = useEnergyIndicators();
    const formulas = useEnergyFormulas();
    return computed(() => {
      return energyScore(assessment.value, indicators.value, formulas.value);
    });
  }
