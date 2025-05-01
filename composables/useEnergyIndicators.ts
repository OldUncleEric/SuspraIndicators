export const useEnergyIndicators = () =>
    useState<EnergyIndicators>('energyIndicators', defaultEnergyIndicators);