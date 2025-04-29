// Water indicators interface
export interface WaterIndicators {
  indicators: string;
  waterUsagePerPerson: number;
  waterProtectingPracticesPercentage: number;
}
  
// Default water indicators
export function defaultWaterIndicators(): WaterIndicators {
  return {
    indicators: 'water',
    waterUsagePerPerson: 0,
    waterProtectingPracticesPercentage: 0
  };
}

export function waterStarted(indicators: WaterIndicators) {
  return indicators.waterUsagePerPerson > 0
    || indicators.waterProtectingPracticesPercentage > 0;
}

export function waterScore(indicators: WaterIndicators) {
  if (!waterStarted(indicators)) {
    return 0;
  }

  // Implement the scoring logic based on the water indicators
  // This is a simple example - adjust based on your actual scoring methodology
  let score = 0;
    
  // Score based on water usage per person
  // Lower usage is better - example thresholds (adjust as needed)
  const usage = indicators.waterUsagePerPerson;
  if (usage <= 30) {
    score += 50;
  } else if (usage <= 50) {
    score += 40;
  } else if (usage <= 80) {
    score += 30;
  } else if (usage <= 100) {
    score += 20;
  } else if (usage > 0) {
    score += 10;
  }
    
  // Score based on water-protecting practices percentage
  const practices = indicators.waterProtectingPracticesPercentage;
  score += Math.round(practices / 2);
  
  return score;
};
