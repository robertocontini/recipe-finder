import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { RecipeCardProps } from "../../types";
import FavoriteButton from "../Favorite/FavoriteButton";
import React from "react";

const RecipeCard = ({
  recipe,
  isFavorite,
  onToggleFavorite,
  isAboveTheFold,
}: RecipeCardProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <CardMedia
        component="img"
        image={recipe.strMealThumb}
        alt={recipe.strMeal}
        loading={isAboveTheFold ? "eager" : "lazy"}
        sx={{
          aspectRatio: 1,
          transition: "transform 0.2s ease-out",
          willChange: "transform",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />

      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, .75)",
          paddingBottom: "12px",
        }}
      >
        <Typography
          variant="h6"
          component={RouterLink}
          to={`/recipe/${recipe.idMeal}`}
          aria-label={`Vai alla ricetta ${recipe.strMeal}`}
          sx={{
            textDecoration: "none",
            color: "inherit",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "block",
            whiteSpace: "nowrap",
          }}
        >
          {recipe.strMeal}
        </Typography>

        {recipe.strCategory && (
          <Typography variant="overline" sx={{ textTransform: "uppercase" }}>
            {recipe.strCategory}
          </Typography>
        )}
      </CardContent>

      <FavoriteButton
        recipe={recipe}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />
    </Card>
  );
};

export default React.memo(RecipeCard);
