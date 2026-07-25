import React from "react";
import MainLayout from "../components/layout/MainLayout";
import { SkeletonGrid } from "../components/games/GameSkeleton";
import ErrorMessage from "../components/common/ErrorMessage";
import GameGrid from "../components/games/GameGrid";
import SectionHeader from "../components/common/SectionHeader";
import InfiniteScrollLoader from "../components/common/InfiniteScrollLoader";
import SEO from "../components/common/SEO";
import useGames from "../hooks/useGames";

export function PopularPage() {
  const { games, loading, loadingMore, error, hasMore, loadMore, refetch } =
    useGames({
      sort: "popular",
      limit: 24,
    });

  return (
    <MainLayout>
      <SEO 
        title="Most Popular Games"
        description="Play the most popular free online games. Our top rated games played by millions."
      />
      <SectionHeader title="🔥 Most Popular Games" />

      {error ? (
        <ErrorMessage message={error} onRetry={refetch} />
      ) : (
        <>
          {loading && games.length === 0 ? (
            <SkeletonGrid count={24} />
          ) : (
            <GameGrid games={games} />
          )}

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

export default PopularPage;
