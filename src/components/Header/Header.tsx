import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Box,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useFavorites } from '../../hooks/useFavorites';

const Header = () => {
  const { favorites } = useFavorites();
  const location = useLocation();

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{
              textDecoration: location.pathname === '/' ? 'underline' : 'none',
              fontWeight: 'bold',
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
          <Badge badgeContent={favorites.length} color="secondary">
            <FavoriteIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
