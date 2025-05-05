export function createLinearScaleClampedProps(normalize: boolean, scale: number, threshold: number, clampMin: number, clampMax: number): LinearScaleClampedProps {
  return {
    formula: 'linearScaleClamped' as Formula,
    normalize, 
    parameters: {
      scale,
      threshold,
      clampMin,
      clampMax,
    },
  };
}

export function linearScaleClamped(assessment: Assessment, indicator: number, props: LinearScaleClampedProps): number {
  const fp = props.parameters;
  if (props.normalize && assessment.occupancy > 0) {
    indicator /= assessment.occupancy;
  }
  return Math.min(Math.max(fp.scale * (indicator - fp.threshold), fp.clampMin), fp.clampMax);
}

export interface LinearScaleClampedParameters {
  scale: number;
  threshold: number;
  clampMin: number;
  clampMax: number;
}

export type LinearScaleClampedProps = GenericFormulaCalculationProps<LinearScaleClampedParameters>;
