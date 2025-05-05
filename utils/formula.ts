// Formula users should call contribution().
// This table should not be exposed outside this module.
const formulas: { [index: string]: FormulaCalculation } = {
  linearScaleClamped,
};

export type PathwayFormulas =
  | CommunityFormulas;

export type FormulaCalculationProps =
  | LinearScaleClampedProps;

export type FormulaParameters =
  | LinearScaleClampedParameters;

export function contribution(assessment: Assessment, indicator: number, props: FormulaCalculationProps): number {
  switch (props.formula) {
    case 'linearScaleClamped':
      return linearScaleClamped(assessment, indicator, props);
    default:
      throw new Error(`formula '${props.formula as string}' isn't known; you should add it to utils/formula.ts`);
  }
};

export type Formula = keyof typeof formulas;

export interface GenericFormulaCalculationProps<T extends FormulaParameters> {
  formula: Formula;
  occupancyNormalize: boolean;  // divide indicator value by assessment occupancy
  timeNormalize: boolean;
  parameters: T
}

export type FormulaCalculation = (assessment: Assessment, indicator: number, props: FormulaCalculationProps) => number;

export interface IndicatorFormula {
  key: string;
  text: string;
  formula: FormulaCalculationProps;
}

export interface IndicatorFormulas {
  name: string;
  indicators: IndicatorFormula[];
}
