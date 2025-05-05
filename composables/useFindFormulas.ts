export const useFindFormulas = (pathway: string): FoundFormulas =>
{
  const formulaMap = new Map<string, FoundFormulas>([
    ['community', { useFormulas: useCommunityFormulas, asList: communityFormulasAsList }],
  ]);
  const entry = formulaMap.get(pathway);
  if (!entry) {
    throw new Error(`no registered formulas for pathway '${pathway}': you should add an entry for the pathway in composables/useFormulaList.ts`);
  }
  return entry;
};

export interface FoundFormulas {
  useFormulas: () => Ref<PathwayFormulas>;
  asList: (formulas: PathwayFormulas) => IndicatorFormulas;
}
