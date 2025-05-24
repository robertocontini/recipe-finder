import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useAboveTheFoldCount } from "../hooks/useAboveTheFold";
import { useEffect, useState } from "react";
import { useFavorites } from "../hooks/useFavorites";
import { Recipe } from "../types";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import PageTitle from "src/components/PageTitle/PageTitle";

const FavoritesPage = () => {
  const { favorites, isFavorite, toggle } = useFavorites();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const aboveTheFoldCount = useAboveTheFoldCount();
  const baseUrlApi = process.env.REACT_APP_BASE_URL_API;

  useEffect(() => {
    const fetchFavoritesRecipes = async () => {
      const recipesData: Recipe[] = await Promise.all(
        favorites.map(async (id) => {
          const response = await fetch(`${baseUrlApi}/lookup.php?i=${id}`);

          const data = await response.json();

          return data.meals[0];
        })
      );

      setRecipes(recipesData);
    };

    fetchFavoritesRecipes();
  }, [favorites, baseUrlApi]);

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {recipes.length ? (
        <>
          <PageTitle title="I tuoi favoriti" />
          
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {recipes.map((recipe, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={recipe.idMeal}>
                <RecipeCard
                  recipe={recipe}
                  isFavorite={isFavorite(recipe.idMeal)}
                  onToggleFavorite={toggle}
                  isAboveTheFold={index < aboveTheFoldCount}
                />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <PageTitle title="Non hai ricette salvate nei favoriti" />
      )}
    </Container>
  );
};

export default FavoritesPage;
