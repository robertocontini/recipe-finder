import { SxProps } from "@mui/material";

export type Recipe = {
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

export type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
}

export type PageTitleProps = {
  title: string;
};

export type Ingredient = {
  name: string;
  measure: string
}