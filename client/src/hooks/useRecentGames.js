import { useGameContext } from "../context/GameContext";

export function useRecentGames() {
  const { recentlyPlayed, addRecentGame, clearRecentGames } = useGameContext();

  return {
    recentGames: recentlyPlayed,
    addRecentGame,
    clearRecentGames,
  };
}

export default useRecentGames;
