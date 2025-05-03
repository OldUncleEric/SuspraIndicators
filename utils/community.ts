export interface KnowledgeTest {
  description: string;
  maximumScore: number;
  dateTaken: string;
  score: number;
};

export interface CommunityIndicators {
  indicators: 'community';
  knowledgeTests?: KnowledgeTest[];
  practiceSurveys?: number;
  practicesDonePercentage?: number;
  volunteerHours?: number;
};

export interface CommunityFormulas {
  pathway: 'community';
  knowledgeTestsTaken: FormulaCalculation;
  knowledgeTestsAverageScore: FormulaCalculation;
  practiceSurveys: FormulaCalculation;
  practicesDonePercentage: FormulaCalculation;
  volunteerHours: FormulaCalculation;
};

export function defaultCommunityIndicators(): CommunityIndicators {
  return { indicators: 'community' };
}

export function defaultCommunityFormulas(): CommunityFormulas {
  return {
    pathway: 'community',
    knowledgeTestsTaken: createLinearScaleClampedFormula(true, 1, 1, -1, 1),
    knowledgeTestsAverageScore: createLinearScaleClampedFormula(true, 10, 0.7, -7, 3),
    practiceSurveys: createLinearScaleClampedFormula(true, 1, 1, -1, 1),
    practicesDonePercentage: createLinearScaleClampedFormula(false, 20, 0.5, -10, 10),
    volunteerHours: createLinearScaleClampedFormula(true, 0.01, 100, -2, 2),
  };
}

export function communityStarted(indicators: CommunityIndicators): boolean {
  return Object.keys(indicators).length > 1;
}

export function communityScore(assessment: Assessment, indicators: CommunityIndicators, formulas: CommunityFormulas) {
  if (!communityStarted(indicators)) {
    return 0;
  }

  let knowledgeTestsScore = 0;
  const tests = indicators.knowledgeTests ?? [];
  for (const test of tests) {
    const maxScore = Math.max(test.maximumScore, 0);
    if (maxScore === 0) {
      continue;
    }
    const score = Math.min(test.score, maxScore);
    const baseline = maxScore / 2;
    knowledgeTestsScore += (score - baseline) / maxScore;
  }
  return formulas.knowledgeTestsTaken.contribution(assessment, tests.length)
    + (tests.length ? formulas.knowledgeTestsAverageScore.contribution(assessment, knowledgeTestsScore / tests.length) : 0)
    + formulas.practiceSurveys.contribution(assessment, indicators.practiceSurveys ?? 0)
    + formulas.practicesDonePercentage.contribution(assessment, indicators.practicesDonePercentage ?? 0)
    + formulas.volunteerHours.contribution(assessment, indicators.volunteerHours ?? 0);
}
