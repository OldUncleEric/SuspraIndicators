export const useFindFormulas = (pathway: string): FoundFormulas =>
{
  const formulaMap = new Map<string, FoundFormulas>([
    ['community', { useFormulas: useCommunityFormulas, asList: communityFormulasAsList } as FoundFormulas],
    ['energy', { useFormulas: useEnergyFormulas, asList: energyFormulasAsList } as FoundFormulas],
    ['food', { useFormulas: useFoodFormulas, asList: foodFormulasAsList } as FoundFormulas],
    ['goods', { useFormulas: useGoodsFormulas, asList: goodsFormulasAsList } as FoundFormulas],
    ['habitat', { useFormulas: useHabitatFormulas, asList: habitatFormulasAsList } as FoundFormulas],
    ['movement', { useFormulas: useMovementFormulas, asList: movementFormulasAsList } as FoundFormulas],
    ['water', { useFormulas: useWaterFormulas, asList: waterFormulasAsList } as FoundFormulas],
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
