export function createLinearScaleClampedProps(
  occupancyNormalize: boolean,
  timeNormalize: boolean,
  scale: number,
  threshold: number,
  clampMin: number,
  clampMax: number
): LinearScaleClampedProps {
  return {
    formula: 'linearScaleClamped' as Formula,
    occupancyNormalize,
    timeNormalize,
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
  if (props.occupancyNormalize && assessment.occupancy > 0) {
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
