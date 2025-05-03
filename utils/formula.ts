export type Formula =
  | 'linearscaleclamped';

export type FormulaParameters =
  | LinearScaleClampedParameters;

export interface FormulaCalculation {
  formula: Formula;
  normalize: boolean;  // divide indicator value by assessment occupancy
  parameters: FormulaParameters;
  contribution: (assessment: Assessment, indicator: number) => number;
}

export interface LinearScaleClampedParameters {
  scale: number;
  threshold: number;
  clampMin: number;
  clampMax: number;
}

export function createLinearScaleClampedFormula(normalize: boolean, scale: number, threshold: number, clampMin: number, clampMax: number): FormulaCalculation {
  const f = {
    formula: 'linearscaleclamped' as Formula,
    normalize, 
    parameters: {
      scale,
      threshold,
      clampMin,
      clampMax,
    },
    contribution: (assessment: Assessment, indicator: number): number => {
      if (f.normalize && assessment.occupancy > 0) {
        indicator /= assessment.occupancy;
      }
      return Math.min(Math.max(f.parameters.scale * (indicator - f.parameters.threshold), f.parameters.clampMin), f.parameters.clampMax);
    },
  };
  return f;
}
