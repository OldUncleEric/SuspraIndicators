export function defaultBinnedParameters(): BinnedParameters {
  return {
    fallThroughScore: 0,
    comparison: 'gte',
    bins: [],
  };
}

export function createBinnedProps(
  occupancyNormalize: boolean,
  timeNormalize: boolean,
  fallThroughScore: number,
  comparison: BinnedComparison,
  bins: BinnedBins
): BinnedProps {
  return {
    formula: 'binned' as Formula,
    occupancyNormalize,
    timeNormalize,
    parameters: {
      fallThroughScore,
      comparison,
      bins,
    },
  };
}

export function binned(assessment: Assessment, indicator: number, props: BinnedProps): number {
  const fp = props.parameters;
  if (props.occupancyNormalize && assessment.occupancy > 0) {
    indicator /= assessment.occupancy;
  }

  if (fp.comparison === 'gte') {
    for (const [cutoff, score] of fp.bins) {
      if (indicator >= cutoff) {
        return score;
      }
    }
    return fp.fallThroughScore;
  }

  if (fp.comparison === 'lt') {
    for (const [cutoff, score] of fp.bins) {
      if (indicator < cutoff) {
        return score;
      }
    }
    return fp.fallThroughScore;
  }

  if (fp.comparison === 'ltf') {
    if (!fp.bins.length) {
      return fp.fallThroughScore;
    }
    const bins = Array.from(fp.bins);
    const first = bins.shift()!;
    if (indicator === first[0]) {
      return first[1];
    }
    for (const [cutoff, score] of bins) {
      if (indicator < cutoff) {
        return score;
      }
    }
    return fp.fallThroughScore;
  }

  throw new Error(`Invalid binned comparison '${fp.comparison}': you should use one of (gte, lt, ltf)`);
  return 0;
}

export type BinnedComparison = 'gte' | 'lt' | 'ltf';
export type BinnedBins = [number, number][];

export interface BinnedParameters {
  fallThroughScore: number;
  comparison: BinnedComparison;
  bins: BinnedBins;
}

export type BinnedProps = GenericFormulaCalculationProps<BinnedParameters>;
