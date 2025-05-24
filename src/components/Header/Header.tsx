import { AppBar, Toolbar, IconButton, Badge, Box, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import theme from "src/theme/theme";

const Header = () => {
  const { favorites } = useFavorites();

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            aria-label="Homepage"
            sx={{
              fontWeight: "bold",
              backgroundColor: "rgba(0,0,0, .1)",
            }}
          >
            Recipe Finder
          </Button>
        </Box>

        <IconButton
          component={RouterLink}
          to="/favorites"
          color="inherit"
          aria-label="Favorites"
        >
          <Badge badgeContent={favorites.length} color="primary">
            <FavoriteIcon sx={{ width: "1.2em", height: "1.2em" }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
