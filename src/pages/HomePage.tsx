import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar";
import { fetchPopularRecipes, fetchRecipesByTextSearch } from "../services/api";
import { useAboveTheFoldCount } from "../hooks/useAboveTheFold";
import { useFavorites } from "../hooks/useFavorites";
import { Recipe } from "../types";
import Loader from "../components/Loader";
import RecipeCard from "../components/RecipeCard/RecipeCard";

const HomePage = () => {
  const [search, setSearch] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const aboveTheFoldCount = useAboveTheFoldCount();
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      setLoading(true);

      const fetchContent =
        search.length > 1 ? fetchRecipesByTextSearch : fetchPopularRecipes;

      fetchContent(search).then((res) => {
        setRecipes(res);
        setLoading(false);
      });

      // if (search.length > 1) {
      //   setLoading(true);
      //   fetchRecipesByTextSearch(search).then((res) => {
      //     setRecipes(res);
      //     setLoading(false);
      //   });
      // } else {
      //   setLoading(true);
      //   fetchPopularRecipes().then((res) => {
      //     setRecipes(res);
      //     setLoading(false);
      //   });
      // }

      // if (search.length > 1) {
      //   setLoading(true);

      //   fetchRecipesByTextSearch(search).then((res) => {
      //     setRecipes(res);
      //     setLoading(false);
      //   });
      // } else {
      //   setRecipes([]);
      // }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography component={"h1"} variant="h4" gutterBottom>
        Cerca una ricetta
      </Typography>

      <SearchBar value={search} onChange={setSearch} />

      {loading && <Loader />}

      <Grid container spacing={2} sx={{ mt: 4 }}>
        {recipes.map((recipe, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={recipe.idMeal}>
            <RecipeCard
              recipe={recipe}
              isFavorite={isFavorite(recipe.idMeal)}
              onToggleFavorite={toggle}
              isAboveTheFold={index < aboveTheFoldCount}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
