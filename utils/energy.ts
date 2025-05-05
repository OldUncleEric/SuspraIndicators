// Energy indicators interface
export interface EnergyIndicators {
    indicators: 'energy';
    fuelUsed?: number;
    electricityUsed?: number;
    solarPercentage?: number;
  };

export interface EnergyFormulas extends Omit<Record<keyof EnergyIndicators, FormulaCalculationProps>, 'indicators'> {
  pathway: 'energy';
};
  
  // Default energy indicators
  export function defaultEnergyIndicators(): EnergyIndicators {
    return { indicators: 'energy' };
  }

export function defaultEnergyFormulas(): EnergyFormulas {
  return {
    pathway: 'energy',
    fuelUsed: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    electricityUsed: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    solarPercentage: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
  };
}
  
  export function energyStarted(indicators: EnergyIndicators) {
    return (indicators.fuelUsed !== undefined && indicators.fuelUsed > 0) || 
           (indicators.electricityUsed !== undefined && indicators.electricityUsed > 0) ||
           (indicators.solarPercentage !== undefined && indicators.solarPercentage > 0);
  }
  
  export function energyScore(assessment: Assessment, indicators: EnergyIndicators, formulas: EnergyFormulas) {
    if (!energyStarted(indicators)) {
      return 0;
    }
  
    // Implement the scoring logic based on the energy indicators
    let score = 0;
      
    // Score based on fuel used
    // Lower fuel usage is better - example thresholds
    const fuel = indicators.fuelUsed || 0;
    if (fuel <= 100) {
      score += 40;
    } else if (fuel <= 200) {
      score += 30;
    } else if (fuel <= 300) {
      score += 20;
    } else if (fuel <= 400) {
      score += 10;
    }
      
    // Score based on electricity usage
    // Lower usage is better
    const electricity = indicators.electricityUsed || 0;
    if (electricity <= 1000) {
      score += 40;
    } else if (electricity <= 2000) {
      score += 30;
    } else if (electricity <= 3000) {
      score += 20;
    } else if (electricity <= 4000) {
      score += 10;
    }
    
    // Score based on solar percentage
    // Higher percentage is better
    const solar = indicators.solarPercentage || 0;
    score += Math.round(solar / 2.5);
    
    return score;
  }

export function energyFormulasAsList(formulas: EnergyFormulas): IndicatorFormulas {
  return {
    name: formulas.pathway,
    indicators: [
        {
          key: 'fuelUsed',
          text: 'fuel used',
          formula: formulas.fuelUsed
        },
        {
          key: 'electricityUsed',
          text: 'electricity used',
          formula: formulas.electricityUsed
        },
        {
          key: 'solarPercentage',
          text: 'solar percentage',
          formula: formulas.solarPercentage
        },
    ],
  };
}
