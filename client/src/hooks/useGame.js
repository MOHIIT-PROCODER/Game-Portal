import { useState, useEffect, useCallback } from "react";
import gameService from "../services/gameService";
import { useGameContext } from "../context/GameContext";

export function useGame(slug) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedGames, setRelatedGames] = useState([]);
  const [stats, setStats] = useState({ play_count: 0, like_count: 0 });
  const { addRecentGame } = useGameContext();

  const fetchGameDetails = useCallback(async () => {
    if (!slug) return;

    try {
      setLoading(true);
      setError(null);

      const response = await gameService.getGameBySlug(slug);
      const gameData = response.game;

      if (!gameData) {
        throw new Error("Game not found.");
      }

      setGame(gameData);
      setStats({
        play_count: gameData.play_count,
        like_count: gameData.like_count,
      });

      // Increment play count on backend
      gameService
        .incrementPlay(gameData.id)
        .then((res) => {
          if (res.success && res.stats) {
            setStats(res.stats);
          }
        })
        .catch((err) => console.error("Error logging play count:", err));

      // Append to local play history
      addRecentGame(gameData);

      // Fetch related games
      const relatedResponse = await gameService.getRelatedGames(gameData.id, 6);
      setRelatedGames(relatedResponse.games || []);
    } catch (err) {
      console.error("Error fetching game details:", err);
      setError(err.message || "Failed to load game details.");
    } finally {
      setLoading(false);
    }
  }, [slug, addRecentGame]);

  useEffect(() => {
    fetchGameDetails();
  }, [fetchGameDetails]);

  // Vote like / dislike action handler
  const voteLike = async (isLike) => {
    if (!game) return;
    try {
      const res = await gameService.toggleLike(game.id, isLike);
      if (res.success && res.stats) {
        setStats(res.stats);
      }
      return true;
    } catch (err) {
      console.error("Error updating game rating:", err);
      return false;
    }
  };

  return {
    game,
    loading,
    error,
    relatedGames,
    stats,
    voteLike,
    refetch: fetchGameDetails,
  };
}

export default useGame;
