// Movement indicators interface
export interface MovementIndicators {
    indicators: 'movement';
    totalMilesTraveled?: number;
    milesByAirplane?: number;
    milesByPrivateVehicle?: number;
    milesByNonHybridVehicle?: number;
    milesByHybridVehicle?: number;
    milesByElectricVehicle?: number;
  };

export interface MovementFormulas extends Omit<Record<keyof MovementIndicators, FormulaCalculationProps>, 'indicators'> {
  pathway: 'movement';
}
  
  // Default movement indicators
  export function defaultMovementIndicators(): MovementIndicators {
    return { indicators: 'movement' };
  }

export function defaultMovementFormulas(): MovementFormulas {
  return {
    pathway: 'movement',
    totalMilesTraveled: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    milesByAirplane: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    milesByPrivateVehicle: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    milesByNonHybridVehicle: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    milesByHybridVehicle: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    milesByElectricVehicle: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
  };
}
  
  export function movementStarted(indicators: MovementIndicators) {
    return indicators.totalMilesTraveled !== undefined && indicators.totalMilesTraveled > 0;
  }
  
  export function movementScore(assessment: Assessment, indicators: MovementIndicators, formulas: MovementFormulas) {
    // Start with a base score
    let score = 0;
    
    // If no data entered, return zero
    if (!movementStarted(indicators)) {
      return score;
    }
    
    const totalMiles = indicators.totalMilesTraveled || 0;
    const airplaneMiles = indicators.milesByAirplane || 0;
    const privateVehicleMiles = indicators.milesByPrivateVehicle || 0;
    const nonHybridMiles = indicators.milesByNonHybridVehicle || 0;
    const hybridMiles = indicators.milesByHybridVehicle || 0;
    const electricMiles = indicators.milesByElectricVehicle || 0;
    
    // Calculate what percentage of total miles are by less carbon-intensive methods
    // Higher percentages of electric/hybrid vehicles improve the score
    
    // Basic implementation - customize based on your scoring methodology
    if (totalMiles > 0) {
      // Lower score for high airplane usage (high carbon footprint)
      score -= (airplaneMiles / totalMiles) * 20;
      
      // Lower score for high non-hybrid vehicle usage
      score -= (nonHybridMiles / totalMiles) * 15;
      
      // Neutral effect for hybrid vehicles
      score += (hybridMiles / totalMiles) * 10;
      
      // Boost score for electric vehicle usage
      score += (electricMiles / totalMiles) * 20;
    }
    
    // Adjust score based on total miles traveled (less is better for environment)
    // These thresholds can be adjusted based on your metrics
    if (totalMiles < 1000) {
      score += 50;
    } else if (totalMiles < 5000) {
      score += 30;
    } else if (totalMiles < 10000) {
      score += 10;
    } else {
      score -= 10;
    }
    
    return Math.round(score);
  }

export function movementFormulasAsList(formulas: MovementFormulas): IndicatorFormulas {
  return {
    name: formulas.pathway,
    indicators: [
        {
          key: 'totalMilesTraveled',
          text: 'total miles traveled',
          formula: formulas.totalMilesTraveled
        },
        {
          key: 'milesByAirplane',
          text: 'miles by airplane',
          formula: formulas.milesByAirplane
        },
        {
          key: 'milesByPrivateVehicle',
          text: 'miles by private vehicle',
          formula: formulas.milesByPrivateVehicle
        },
        {
          key: 'milesByNonHybridVehicle',
          text: 'miles by non-hybrid vehicle',
          formula: formulas.milesByNonHybridVehicle
        },
        {
          key: 'milesByHybridVehicle',
          text: 'miles by hybrid vehicle',
          formula: formulas.milesByHybridVehicle
        },
        {
          key: 'milesByElectricVehicle',
          text: 'miles by electric vehicle',
          formula: formulas.milesByElectricVehicle
        },
    ],
  };
}
