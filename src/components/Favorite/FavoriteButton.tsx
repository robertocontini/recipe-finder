import { Box, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { FavoriteProps } from "src/types";
import React from "react";

const FavoriteButton = ({
  recipe,
  isFavorite,
  onToggleFavorite,
}: FavoriteProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderTop: "70px solid rgba(255, 255, 255, .75)",
          borderLeft: "70px solid transparent",
        },
      }}
    >
      <IconButton
        onClick={() => onToggleFavorite(recipe.idMeal)}
        aria-label={
          isFavorite
            ? `Rimuovi ${recipe.strMeal} dai favoriti`
            : `Aggiungi ${recipe.strMeal} ai favoriti`
        }
        color="primary"
      >
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Box>
  );
};

export default React.memo(FavoriteButton);
