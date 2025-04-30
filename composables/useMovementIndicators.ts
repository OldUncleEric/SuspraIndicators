export const useMovementIndicators = () =>
    useState<MovementIndicators>('movementIndicators', defaultMovementIndicators);