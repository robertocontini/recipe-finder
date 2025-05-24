import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Chip } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Recipe } from "../types";
import { fetchRecipeById } from "../services/api";
import FavoriteButton from "src/components/FavoriteButton/FavoriteButton";
import { useFavorites } from "src/hooks/useFavorites";
import theme from "src/theme/theme";
import Loader from "src/components/Loader/Loader";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await fetchRecipeById(id!);
        setRecipe(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    id && fetchRecipe();
  }, [id]);

  // TODO:
  const getIngredients = () => {
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

  const ingredients = getIngredients();

  if (error) {
    return (
      <Container sx={{ mt: 4, mb: 4 }} component="section" role="alert">
        <Typography variant="h4" component="h1" color="error" gutterBottom>
          Errore
        </Typography>

        <Typography component={"p"}>{error}</Typography>

        <Button component={RouterLink} to="/" variant="outlined">
          Torna alla home
        </Button>
      </Container>
    );
  }

  if (loading) return <Loader />;

  return (
    <main>
      {recipe && (
        <Container component="article" sx={{ mt: 4 }}>
          <header>
            <Typography
              component="h1"
              variant="h5"
              gutterBottom
              sx={{
                backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {recipe.strMeal}
            </Typography>

            <Box
              component="figure"
              sx={{
                width: "100%",
                maxWidth: 700,
                aspectRatio: "1/1",
                margin: 0,
                position: "relative",
              }}
            >
              <img
                src={recipe?.strMealThumb}
                alt={`Foto della ricetta ${recipe.strMeal}`}
                loading="eager"
                width={700}
                height={700}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />

              <FavoriteButton
                recipe={recipe}
                isFavorite={isFavorite(recipe.idMeal)}
                onToggleFavorite={toggle}
              />

              <figcaption style={{ display: "none" }}>
                {recipe.strMeal}
              </figcaption>
            </Box>
          </header>

          <section
            aria-labelledby="ingredients-title"
            style={{ marginTop: 24 }}
          >
            <Typography
              variant="h5"
              component="h2"
              id="ingredients-title"
              gutterBottom
            >
              Ingredienti
            </Typography>

            <Box component="ul" sx={{ pl: 3 }}>
              {ingredients.map((ingredient) => (
                <li key={ingredient.name}>
                  <Typography component="span">
                    {ingredient.measure} {ingredient.name}
                  </Typography>
                </li>
              ))}
            </Box>
          </section>

          <section aria-labelledby="info-title" style={{ marginTop: 16 }}>
            <Typography
              variant="h5"
              component="h2"
              id="info-title"
              gutterBottom
            >
              Informazioni
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Chip label={`Categoria: ${recipe.strCategory}`} />
              <Chip label={`Area: ${recipe.strArea}`} />
            </Box>
          </section>

          <section
            aria-labelledby="instructions-title"
            style={{ margin: "24px 0" }}
          >
            <Typography
              variant="h5"
              component="h2"
              id="instructions-title"
              gutterBottom
            >
              Istruzioni
            </Typography>

            <Typography component="p" sx={{ whiteSpace: "pre-line" }}>
              {recipe.strInstructions}
            </Typography>
          </section>
        </Container>
      )}
    </main>
  );
};

export default RecipeDetailPage;
