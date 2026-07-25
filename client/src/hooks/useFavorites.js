import { useGameContext } from "../context/GameContext";

export function useFavorites() {
  const { favorites, toggleFavorite, isFavorite } = useGameContext();

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}

export default useFavorites;
