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

export interface CommunityFormulas extends Omit<Record<keyof CommunityIndicators, FormulaCalculationProps>, 'indicators' | 'knowledgeTests'> {
  pathway: 'community';
  knowledgeTestsTaken: FormulaCalculationProps;
  knowledgeTestsAverageScore: FormulaCalculationProps;
};

export function defaultCommunityIndicators(): CommunityIndicators {
  return { indicators: 'community' };
}

export function defaultCommunityFormulas(): CommunityFormulas {
  return {
    pathway: 'community',
    knowledgeTestsTaken: createLinearScaleClampedProps(true, true, 1, 1, -1, 1),
    knowledgeTestsAverageScore: createLinearScaleClampedProps(true, true, 10, 0.7, -7, 3),
    practiceSurveys: createLinearScaleClampedProps(true, true, 1, 1, -1, 1),
    practicesDonePercentage: createLinearScaleClampedProps(false, true, 20, 0.5, -10, 10),
    volunteerHours: createLinearScaleClampedProps(true, true, 0.01, 100, -2, 2),
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
  return contribution(assessment, tests.length, formulas.knowledgeTestsTaken)
    + (tests.length ? contribution(assessment, knowledgeTestsScore / tests.length, formulas.knowledgeTestsAverageScore) : 0)
    + contribution(assessment, indicators.practiceSurveys ?? 0, formulas.practiceSurveys)
    + contribution(assessment, indicators.practicesDonePercentage ?? 0, formulas.practicesDonePercentage)
    + contribution(assessment, indicators.volunteerHours ?? 0, formulas.volunteerHours);
}

export function communityFormulasAsList(formulas: CommunityFormulas): IndicatorFormulas {
  return {
    name: formulas.pathway,
    indicators: [
        {
          key: 'knowledgeTestsTaken',
          text: 'knowledge tests taken',
          formula: formulas.knowledgeTestsTaken
        },
        {
          key: 'knowledgeTestsAverageScore',
          text: 'knowledge tests average score',
          formula: formulas.knowledgeTestsAverageScore
        },
        {
          key: 'practiceSurveys',
          text: 'practice surveys taken',
          formula: formulas.practiceSurveys
        },
        {
          key: 'practicesDonePercentage',
          text: 'practices done percentage',
          formula: formulas.practicesDonePercentage
        },
        {
          key: 'practicesDonePercentage',
          text: 'volunteer hours',
          formula: formulas.volunteerHours
        },
    ],
  };
}
