import { Recipe } from "../types";

const baseUrlApi = process.env.REACT_APP_BASE_URL_API

export const fetchPopularRecipes = async (): Promise<Recipe[]> => {
  // filtering on italian category
  const response = await fetch(`${baseUrlApi}/filter.php?a=Italian`);

  if (!response.ok) {
    throw new Error("Errore nella risposta del server");
  }

  const data = await response.json();

  if (!data.meals || data.meals.length === 0) {
    throw new Error("Ricetta non trovata");
  }

  return data.meals || [];
};


export const fetchRecipesByTextSearch = async (searchTerm: string): Promise<Recipe[]> => {
  const response = await fetch(`${baseUrlApi}/search.php?s=${searchTerm}`);

  const data = await response.json();

  return data.meals || [];
};

export const fetchRecipeById = async (id: string): Promise<Recipe> => {
  const response = await fetch(`${baseUrlApi}/lookup.php?i=${id}`);
  if (!response.ok) {
    throw new Error("Errore nella risposta del server");
  }

  const data = await response.json();

  if (!data.meals || data.meals.length === 0) {
    throw new Error("Ricetta non trovata");
  }

  return data.meals[0];
};