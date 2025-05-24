import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleFavorite } from '../store/favoritesSlice';

export const useFavorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites);
  const dispatch = useDispatch();

  const toggle = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const isFavorite = (id: string) => favorites.includes(id);

  return { favorites, toggle, isFavorite };
}
