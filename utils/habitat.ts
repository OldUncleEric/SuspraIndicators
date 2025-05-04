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
  
  // Default habitat indicators
  export function defaultHabitatIndicators(): HabitatIndicators {
    return { indicators: 'habitat' };
  }
  
  export function habitatStarted(indicators: HabitatIndicators): boolean {
    return Object.keys(indicators).length > 1;
  }
  
  export function habitatScore(assessment: Assessment, indicators: HabitatIndicators) {
    if (!habitatStarted(indicators)) {
      return 0;
    }
  
    let score = 0;
    
    // Get occupancy from assessment for calculations
    const occupancy = assessment?.occupancy || 1;
    const totalArea = assessment?.totalArea || 1;
    
    // Score based on LEED points (0-110 scale)
    const leedPoints = indicators.leedPoints || 0;
    if (leedPoints >= 80) {
      score += 50;
    } else if (leedPoints >= 60) {
      score += 40;
    } else if (leedPoints >= 40) {
      score += 30;
    } else if (leedPoints >= 20) {
      score += 20;
    } else if (leedPoints > 0) {
      score += 10;
    }
    
    // Score based on NGBS points (similar to LEED)
    const ngbsPoints = indicators.ngbsPoints || 0;
    if (ngbsPoints >= 80) {
      score += 50;
    } else if (ngbsPoints >= 60) {
      score += 40;
    } else if (ngbsPoints >= 40) {
      score += 30;
    } else if (ngbsPoints >= 20) {
      score += 20;
    } else if (ngbsPoints > 0) {
      score += 10;
    }
    
    // Score based on conservation budget per person per year
    const conservationBudget = indicators.conservationBudget || 0;
    const budgetPerPerson = conservationBudget / occupancy;
    if (budgetPerPerson >= 1000) {
      score += 50;
    } else if (budgetPerPerson >= 500) {
      score += 30;
    } else if (budgetPerPerson >= 250) {
      score += 20;
    } else if (budgetPerPerson > 0) {
      score += 10;
    }
    
    // Score based on land growing wild as percentage of total area
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