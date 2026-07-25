import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { SkeletonGrid } from "../components/games/GameSkeleton";
import ErrorMessage from "../components/common/ErrorMessage";
import SearchInput from "../components/search/SearchInput";
import SearchResults from "../components/search/SearchResults";
import NoSearchResults from "../components/search/NoSearchResults";
import InfiniteScrollLoader from "../components/common/InfiniteScrollLoader";
import SEO from "../components/common/SEO";
import useSearch from "../hooks/useSearch";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const {
    query,
    setQuery,
    results,
    loading,
    error,
    hasMore,
    executeSearch,
    loadMore,
    clearSearch,
  } = useSearch(queryParam);

  useEffect(() => {
    if (queryParam) {
      executeSearch(queryParam, 0, false);
    }
  }, [queryParam, executeSearch]);

  const handleSearchSubmit = (newQuery) => {
    setSearchParams({ q: newQuery });
  };

  const handleClear = () => {
    setSearchParams({});
    clearSearch();
  };

  return (
    <MainLayout>
      <SEO 
        title={queryParam ? `Search results for "${queryParam}"` : "Search Games"}
        description="Search our huge catalog of free online HTML5 games."
      />
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <h1 className="section-title" style={{ fontSize: "30px" }}>
          🔍 Search Games
        </h1>

        {/* Full-width search bar adjustment */}
        <SearchInput initialValue={queryParam} onSearch={handleSearchSubmit} />

        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => executeSearch(queryParam, 0, false)}
          />
        )}

        {!error && (
          <>
            {loading && results.length === 0 ? (
              <SkeletonGrid count={12} />
            ) : (
              <>
                {queryParam && results.length === 0 ? (
                  <NoSearchResults query={queryParam} onClear={handleClear} />
                ) : (
                  <>
                    {results.length > 0 && <SearchResults results={results} />}
                  </>
                )}
              </>
            )}

            {queryParam && results.length > 0 && (
              <InfiniteScrollLoader
                loadMore={loadMore}
                hasMore={hasMore}
                loading={loading}
              />
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

export default SearchPage;
