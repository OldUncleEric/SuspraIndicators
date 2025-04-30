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
  
  // Default movement indicators
  export function defaultMovementIndicators(): MovementIndicators {
    return { indicators: 'movement' };
  }
  
  export function movementStarted(indicators: MovementIndicators) {
    return indicators.totalMilesTraveled !== undefined && indicators.totalMilesTraveled > 0;
  }
  
  export function movementScore(indicators: MovementIndicators) {
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