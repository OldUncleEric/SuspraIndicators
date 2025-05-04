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
  
  // Default goods indicators
  export function defaultGoodsIndicators(): GoodsIndicators {
    return { indicators: 'goods' };
  }
  
  export function goodsStarted(indicators: GoodsIndicators) {
    return Object.getOwnPropertyNames(indicators).length > 1;
  }
  
  export function goodsScore(indicators: GoodsIndicators) {
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