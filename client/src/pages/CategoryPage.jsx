import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { SkeletonGrid } from "../components/games/GameSkeleton";
import ErrorMessage from "../components/common/ErrorMessage";
import GameGrid from "../components/games/GameGrid";
import CategoryHeader from "../components/categories/CategoryHeader";
import CategoryFilter from "../components/categories/CategoryFilter";
import InfiniteScrollLoader from "../components/common/InfiniteScrollLoader";
import SEO from "../components/common/SEO";
import useGames from "../hooks/useGames";

export function CategoryPage() {
  const { category } = useParams();
  const decodedCategory = decodeURIComponent(category);
  // Capitalize first letter for display
  const categoryTitle =
    decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1);
  const [sort, setSort] = useState("newest");

  const { games, loading, loadingMore, error, hasMore, loadMore, refetch } =
    useGames({
      category: categoryTitle,
      sort,
      limit: 24,
    });

  return (
    <MainLayout>
      <SEO 
        title={`${categoryTitle} Games`}
        description={`Play the best free online ${categoryTitle} games. Enjoy instant gameplay in your browser.`}
      />
      <CategoryHeader categoryName={categoryTitle} count={games.length} />

      <CategoryFilter activeSort={sort} onSortChange={setSort} />

      {error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          {loading && games.length === 0 ? (
            <SkeletonGrid count={24} />
          ) : (
            <>
              {games.length === 0 ? (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "var(--text-secondary)",
                  }}
                >
                  No games found in this category yet.
                </div>
              ) : (
                <GameGrid games={games} />
              )}
            </>
          )}

          {/* Infinite Scroll trigger node */}
          <InfiniteScrollLoader
            loadMore={loadMore}
            hasMore={hasMore}
            loading={loadingMore}
          />
        </>
      )}
    </MainLayout>
  );
}

export default CategoryPage;
