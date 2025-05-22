// export type Meal = {
//   idMeal: string;
//   strMeal: string;
//   strMealThumb: string;
//   strInstructions: string;
//   strCategory: string;
//   strArea: string;
//   [key: string]: string | null;
// };

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
  [key: string]: string | null;
}

export type RecipeCardProps = FavoriteProps & {
  isAboveTheFold: boolean;
};

export type FavoriteProps = {
  recipe: Recipe;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}