import React from "react";
import MainLayout from "../components/layout/MainLayout";
import { SkeletonGrid } from "../components/games/GameSkeleton";
import ErrorMessage from "../components/common/ErrorMessage";
import GameGrid from "../components/games/GameGrid";
import SectionHeader from "../components/common/SectionHeader";
import InfiniteScrollLoader from "../components/common/InfiniteScrollLoader";
import SEO from "../components/common/SEO";
import useGames from "../hooks/useGames";

export function AllGamesPage() {
  const { games, loading, loadingMore, error, hasMore, loadMore, refetch } =
    useGames({
      limit: 24,
    });

  return (
    <MainLayout>
      <SEO 
        title="All Games"
        description="Browse our complete catalog of free online games. Play instantly in your browser."
      />
      <SectionHeader title="🕹️ All Games Catalog" />

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

export default AllGamesPage;
