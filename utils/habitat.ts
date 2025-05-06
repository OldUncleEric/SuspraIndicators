// Habitat indicators interface
export interface HabitatIndicators {
    indicators: 'habitat';
    leedPoints?: number;
    ngbsPoints?: number;
    conservationBudget?: number;
    landGrowingWild?: number;
    fertilizerApplications?: number;
    fertilizerAmount?: number;
    pesticideApplications?: number;
    pesticideAmount?: number;
  }

export interface HabitatFormulas extends Omit<Record<keyof HabitatIndicators, FormulaCalculationProps>, 'indicators'> {
  pathway: 'habitat';
};
  
  // Default habitat indicators
  export function defaultHabitatIndicators(): HabitatIndicators {
    return { indicators: 'habitat' };
  }

export function defaultHabitatFormulas(): HabitatFormulas {
  return {
    pathway: 'habitat',
    leedPoints: createBinnedProps(false, true, 0, 'gte', [
      [80, 50],
      [60, 40],
      [40, 30],
      [20, 20],
      [1, 10],
    ]),
    ngbsPoints: createBinnedProps(false, true, 0, 'gte', [
      [80, 50],
      [60, 40],
      [40, 30],
      [20, 20],
      [1, 10],
    ]),
    conservationBudget: createBinnedProps(true, true, 0, 'gte', [
      [1000, 50],
      [500, 30],
      [250, 20],
      [1, 10],
    ]),
    landGrowingWild: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    fertilizerApplications: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    fertilizerAmount: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    pesticideApplications: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
    pesticideAmount: createLinearScaleClampedProps(false, true, 1, 1, -1, Number.MAX_SAFE_INTEGER),
  };
}
  
  export function habitatStarted(indicators: HabitatIndicators): boolean {
    return Object.keys(indicators).length > 1;
  }
  
  export function habitatScore(assessment: Assessment, indicators: HabitatIndicators, formulas: HabitatFormulas) {
    if (!habitatStarted(indicators)) {
      return 0;
    }
  
    let score = 0;
    
    // Score based on LEED points (0-110 scale)
    score += contribution(assessment, indicators.leedPoints ?? 0, formulas.leedPoints);
    
    // Score based on NGBS points (similar to LEED)
    score += contribution(assessment, indicators.ngbsPoints ?? 0, formulas.ngbsPoints);
    
    // Score based on conservation budget per person per year
    score += contribution(assessment, indicators.conservationBudget ?? 0, formulas.conservationBudget);
    
    // Score based on land growing wild as percentage of total area
    const totalArea = assessment?.totalArea ?? 1;
    const landGrowingWild = indicators.landGrowingWild || 0;
    const wildLandPercentage = (landGrowingWild / totalArea) * 100;
    if (wildLandPercentage >= 50) {
      score += 50;
    } else if (wildLandPercentage >= 25) {
      score += 30;
    } else if (wildLandPercentage >= 10) {
      score += 20;
    } else if (wildLandPercentage > 0) {
      score += 10;
    }
    
    // Negative scoring for fertilizer applications
    const fertilizerApps = indicators.fertilizerApplications || 0;
    const fertilizerAmount = indicators.fertilizerAmount || 0;
    const totalFertilizer = fertilizerApps * fertilizerAmount;
    if (totalFertilizer === 0) {
      score += 20;
    } else if (totalFertilizer < 10) {
      score += 10;
    } else if (totalFertilizer < 50) {
      score -= 10;
    } else {
      score -= 20;
    }
    
    // Negative scoring for pesticide applications
    const pesticideApps = indicators.pesticideApplications || 0;
    const pesticideAmount = indicators.pesticideAmount || 0;
    const totalPesticide = pesticideApps * pesticideAmount;
    if (totalPesticide === 0) {
      score += 20;
    } else if (totalPesticide < 5) {
      score += 10;
    } else if (totalPesticide < 25) {
      score -= 10;
    } else {
      score -= 20;
    }
    
    return score;
  }

export function habitatFormulasAsList(formulas: HabitatFormulas): IndicatorFormulas {
  return {
    name: formulas.pathway,
    indicators: [
        {
          key: 'leedPoints',
          text: 'LEED points',
          formula: formulas.leedPoints
        },
        {
          key: 'ngbsPoints',
          text: 'NGBS points',
          formula: formulas.ngbsPoints
        },
        {
          key: 'conservationBudget',
          text: 'conservation budget',
          formula: formulas.conservationBudget
        },
        {
          key: 'landGrowingWild',
          text: 'landGrowingWild',
          formula: formulas.landGrowingWild
        },
        {
          key: 'fertilizerApplications',
          text: 'fertilizer applications',
          formula: formulas.fertilizerApplications
        },
        {
          key: 'fertilizerAmount',
          text: 'fertilizer amount',
          formula: formulas.fertilizerAmount
        },
        {
          key: 'pesticideApplications',
          text: 'pesticide applications',
          formula: formulas.pesticideApplications
        },
        {
          key: 'pesticideAmount',
          text: 'pesticide amount',
          formula: formulas.pesticideAmount
        },
    ],
  };
}
