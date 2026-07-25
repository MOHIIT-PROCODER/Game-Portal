import { useState, useEffect, useCallback } from "react";
import gameService from "../services/gameService";

export function useGames({
  category = null,
  sort = "newest",
  limit = 24,
} = {}) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Reset when filters change
  useEffect(() => {
    setGames([]);
    setOffset(0);
    setHasMore(true);
    setError(null);
    setLoading(true);
  }, [category, sort]);

  // Main fetch runner
  const fetchGames = useCallback(
    async (currentOffset, isLoadMore = false) => {
      try {
        if (isLoadMore) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const response = await gameService.getGames({
          category,
          sort,
          limit,
          offset: currentOffset,
        });

        const fetchedGames = response.games || [];
        const pagination = response.pagination || {};

        setGames((prev) => {
          if (isLoadMore) {
            // Exclude duplicates if any
            const existingIds = new Set(prev.map((g) => g.id));
            const filteredNew = fetchedGames.filter(
              (g) => !existingIds.has(g.id),
            );
            return [...prev, ...filteredNew];
          }
          return fetchedGames;
        });

        setHasMore(pagination.hasMore ?? fetchedGames.length === limit);
        setError(null);
      } catch (err) {
        console.error("Error fetching games in hook:", err);
        setError(err.message || "Failed to load games.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [category, sort, limit],
  );

  // Trigger initial fetch
  useEffect(() => {
    fetchGames(0, false);
  }, [fetchGames]);

  // Load more runner
  const loadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) return;
    const nextOffset = offset + limit;
    setOffset(nextOffset);
    fetchGames(nextOffset, true);
  }, [loading, loadingMore, hasMore, offset, limit, fetchGames]);

  return {
    games,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    refetch: () => fetchGames(0, false),
  };
}

export default useGames;
