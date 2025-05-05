// Goods indicators interface
export interface GoodsIndicators {
    indicators: 'goods';
    budget?: number;
    materialReused?: number;
    materialComposted?: number;
    materialRecycled?: number;
    materialDiverted?: number;
    materialLandfilled?: number;
  }

export interface GoodsFormulas extends Omit<Record<keyof GoodsIndicators, FormulaCalculationProps>, 'indicators'> {
  pathway: 'goods';
};
  
  // Default goods indicators
  export function defaultGoodsIndicators(): GoodsIndicators {
    return { indicators: 'goods' };
  }

export function defaultGoodsFormulas(): GoodsFormulas {
  return {
    pathway: 'goods',
    budget: createLinearScaleClampedProps(true, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    materialReused: createLinearScaleClampedProps(true, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    materialComposted: createLinearScaleClampedProps(true, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    materialRecycled: createLinearScaleClampedProps(true, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    materialDiverted: createLinearScaleClampedProps(true, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    materialLandfilled: createLinearScaleClampedProps(true, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
  };
}
  
  export function goodsStarted(indicators: GoodsIndicators) {
    return Object.getOwnPropertyNames(indicators).length > 1;
  }
  
  export function goodsScore(assessment: Assessment, indicators: GoodsIndicators, formulas: GoodsFormulas) {
    if (!goodsStarted(indicators)) {
      return 0;
    }
  
    // Implement the scoring logic based on the goods indicators
    let score = 0;
    
    // Score based on goods budget
    // Lower spending is better - example thresholds
    const budget = indicators.budget || 0;
    if (budget <= 500) {
      score += 40;
    } else if (budget <= 1500) {
      score += 30;
    } else if (budget <= 3000) {
      score += 20;
    } else if (budget <= 5000) {
      score += 10;
    }
    
    // Score based on material diversion from landfill
    const totalMaterial = 
      (indicators.materialReused || 0) +
      (indicators.materialComposted || 0) +
      (indicators.materialRecycled || 0) +
      (indicators.materialDiverted || 0) +
      (indicators.materialLandfilled || 0);
    
    if (totalMaterial > 0) {
      const diversionRate = 1 - (indicators.materialLandfilled || 0) / totalMaterial;
      score += Math.round(diversionRate * 60);
    }
    
    return score;
  }

export function goodsFormulasAsList(formulas: GoodsFormulas): IndicatorFormulas {
  return {
    name: formulas.pathway,
    indicators: [
        {
          key: 'budget',
          text: 'budget',
          formula: formulas.budget
        },
        {
          key: 'materialReused',
          text: 'material reused',
          formula: formulas.materialReused
        },
        {
          key: 'materialComposted',
          text: 'material composted',
          formula: formulas.materialComposted
        },
        {
          key: 'materialRecycled',
          text: 'material recycled',
          formula: formulas.materialRecycled
        },
        {
          key: 'materialDiverted',
          text: 'material diverted',
          formula: formulas.materialDiverted
        },
        {
          key: 'materialLandfilled',
          text: 'material landfilled',
          formula: formulas.materialLandfilled
        },
    ],
  };
}
