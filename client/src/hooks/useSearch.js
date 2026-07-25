import { useState, useEffect, useCallback } from "react";
import searchService from "../services/searchService";

export function useSearch(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // Debounced suggestions fetching
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setSuggestionsLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await searchService.getSuggestions(query, 5);
        setSuggestions(response.suggestions || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      } finally {
        setSuggestionsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Execute full search
  const executeSearch = useCallback(
    async (searchQuery, currentOffset = 0, isLoadMore = false) => {
      if (!searchQuery || searchQuery.trim() === "") return;

      try {
        setLoading(true);
        setError(null);

        const response = await searchService.searchGames(
          searchQuery,
          24,
          currentOffset,
        );
        const fetchedGames = response.games || [];
        const pagination = response.pagination || {};

        setResults((prev) => {
          if (isLoadMore) {
            const ids = new Set(prev.map((g) => g.id));
            const filtered = fetchedGames.filter((g) => !ids.has(g.id));
            return [...prev, ...filtered];
          }
          return fetchedGames;
        });

        setHasMore(pagination.hasMore ?? false);
        setOffset(currentOffset);
      } catch (err) {
        console.error("Search execution failed:", err);
        setError(err.message || "Search failed to load results.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    executeSearch(query, offset + 24, true);
  }, [loading, hasMore, query, offset, executeSearch]);

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setSuggestions([]);
    setHasMore(false);
    setOffset(0);
  };

  return {
    query,
    setQuery,
    results,
    suggestions,
    loading,
    suggestionsLoading,
    error,
    hasMore,
    executeSearch,
    loadMore,
    clearSearch,
  };
}

export default useSearch;
