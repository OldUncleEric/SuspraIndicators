export const useFoodFormulas = () =>
  useState<FoodFormulas>('foodFormulas', defaultFoodFormulas);
