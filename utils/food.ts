export interface FoodIndicators {
  indicators: 'food';
  budget?: number;
  tapWaterPercentage?: number;
  certifiedOrganicPercentage?: number;
  wasteRate?: number;
};

export interface FoodFormulas extends Omit<Record<keyof FoodIndicators, FormulaCalculationProps>, 'indicators'> {
  pathway: 'food';
};

export function defaultFoodIndicators(): FoodIndicators {
  return { indicators: 'food' };
}

export function defaultFoodFormulas(): FoodFormulas {
  return {
    pathway: 'food',
    budget: createLinearScaleClampedProps(true, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    tapWaterPercentage: createLinearScaleClampedProps(true, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    certifiedOrganicPercentage: createLinearScaleClampedProps(true, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    wasteRate: createLinearScaleClampedProps(true, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
  };
}

export function foodScore(assessment: Assessment, indicators: FoodIndicators, formulas: FoodFormulas) {
  return contribution(assessment, indicators.budget ?? 0, formulas.budget)
    + contribution(assessment, indicators.tapWaterPercentage ?? 0, formulas.tapWaterPercentage)
    + contribution(assessment, indicators.certifiedOrganicPercentage ?? 0, formulas.certifiedOrganicPercentage)
    + contribution(assessment, indicators.wasteRate ?? 0, formulas.wasteRate);
}

export function foodFormulasAsList(formulas: FoodFormulas): IndicatorFormulas {
  return {
    name: formulas.pathway,
    indicators: [
        {
          key: 'budget',
          text: 'budget',
          formula: formulas.budget
        },
        {
          key: 'tapWaterPercentage',
          text: 'tap water percentage',
          formula: formulas.tapWaterPercentage
        },
        {
          key: 'certifiedOrganicPercentage',
          text: 'certified organic percentage',
          formula: formulas.certifiedOrganicPercentage
        },
        {
          key: 'wasteRate',
          text: 'waste rate',
          formula: formulas.wasteRate
        },
    ],
  };
}
