// Formula users should call contribution().
// This table should not be exposed outside this module.
const formulas: { [index: string]: FormulaCalculation } = {
  linearScaleClamped,
  binned,
};

export type FormulaCalculation =
  | ((assessment: Assessment, indicator: number, props: LinearScaleClampedProps) => number)
  | ((assessment: Assessment, indicator: number, props: BinnedProps) => number);

export type FormulaCalculationProps =
  | LinearScaleClampedProps
  | BinnedProps;

export type FormulaParameters =
  | LinearScaleClampedParameters
  | BinnedParameters;

export function contribution(assessment: Assessment, indicator: number, props: FormulaCalculationProps): number {
  switch (props.formula) {
    case 'linearScaleClamped':
      return linearScaleClamped(assessment, indicator, props as LinearScaleClampedProps);
    case 'binned':
      return binned(assessment, indicator, props as BinnedProps);
    default:
      throw new Error(`formula '${props.formula as string}' isn't known; you should add it to utils/formula.ts`);
  }
};

export function defaultFormulaParameters(formula: string): FormulaParameters {
  switch (formula) {
    case 'linearScaleClamped':
      return defaultLinearScaleClampedParameters();
    case 'binned':
      return defaultBinnedParameters();
    default:
      throw new Error(`formula ${formula} isn't known; you should add it to utils/formula.ts`);
  }
}

export function generateFormulaKey(pathway: string, indicator: string): string {
  return `${pathway}\u{1f}${indicator}`;
}

export type Formula = keyof typeof formulas;

export type PathwayFormulas =
  | CommunityFormulas
  | EnergyFormulas
  | FoodFormulas
  | GoodsFormulas
  | HabitatFormulas
  | MovementFormulas
  | WaterFormulas;

export interface GenericFormulaCalculationProps<T extends FormulaParameters> {
  formula: Formula;
  occupancyNormalize: boolean;  // divide indicator value by assessment occupancy
  timeNormalize: boolean;
  parameters: T
}

export interface IndicatorFormula {
  key: string;
  text: string;
  formula: FormulaCalculationProps;
}

export interface IndicatorFormulas {
  name: string;
  indicators: IndicatorFormula[];
}
