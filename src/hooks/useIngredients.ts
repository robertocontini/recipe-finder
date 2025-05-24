import { Ingredient, Recipe } from "src/types";

export const useIngredients = (recipe: Recipe): Ingredient[] => {
  const ingredients: { name: string; measure: string }[] = [];

  for (let i = 1; i <= 20; i++) {
    const name = recipe && recipe[`strIngredient${i}`];
    const measure = recipe && recipe[`strMeasure${i}`];

    if (name && name.trim()) {
      ingredients.push({ name, measure: measure ?? "" });
    }
  }

  return ingredients;
};
