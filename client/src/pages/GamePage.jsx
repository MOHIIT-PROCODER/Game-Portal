import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ErrorMessage from "../components/common/ErrorMessage";

// Player & Metadata
import GamePlayer from "../components/player/GamePlayer";
import GameInfo from "../components/gameInfo/GameInfo";
import RelatedGames from "../components/games/RelatedGames";
import SEO from "../components/common/SEO";

import useGame from "../hooks/useGame";

/* Skeleton that mimics the game player layout */
function GamePageSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 w-full">
      <div className="flex flex-col gap-5 w-full min-w-0">
        {/* Player iframe skeleton */}
        <div
          className="skeleton-shimmer"
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "var(--radius-xs, 10px)",
            backgroundColor: "rgba(255,255,255,0.03)",
          }}
        />
        {/* Toolbar skeleton */}
        <div
          style={{ display: "flex", gap: "12px", justifyContent: "center" }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="skeleton-shimmer"
              style={{
                width: "80px",
                height: "36px",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            />
          ))}
        </div>
        {/* Info block skeleton */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            className="skeleton-line skeleton-shimmer"
            style={{ width: "60%", height: "24px" }}
          />
          <div
            className="skeleton-line skeleton-shimmer"
            style={{ width: "90%", height: "14px" }}
          />
          <div
            className="skeleton-line skeleton-shimmer"
            style={{ width: "75%", height: "14px" }}
          />
        </div>
      </div>
      {/* Related games sidebar skeleton */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div
          className="skeleton-line skeleton-shimmer"
          style={{ width: "140px", height: "18px" }}
        />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="skeleton-card"
            style={{ width: "100%" }}
          >
            <div className="skeleton-thumb skeleton-shimmer" />
            <div className="skeleton-info">
              <div
                className="skeleton-line skeleton-shimmer"
                style={{ width: "70%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GamePage() {
  const { slug } = useParams();
  const { game, loading, error, relatedGames, stats, voteLike, refetch } =
    useGame(slug);

  if (loading) {
    return (
      <MainLayout>
        <GamePageSkeleton />
      </MainLayout>
    );
  }

  if (error || !game) {
    return (
      <MainLayout>
        <ErrorMessage
          message={error || "The requested game could not be found."}
          onRetry={refetch}
        />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SEO 
        title={`Play ${game.title} Free`}
        description={game.description || `Play ${game.title} online for free. Explore more action, adventure, and puzzle games on GamePortal.`}
        image={game.thumb}
      />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 w-full">
        {/* Main Left Column (Iframe player and information detail card) */}
        <div className="flex flex-col gap-5 w-full min-w-0">
          <GamePlayer game={game} stats={stats} voteLike={voteLike} />
          <GameInfo game={game} />
        </div>

        {/* Right Column (Related games side grid) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <RelatedGames games={relatedGames} loading={loading} />
        </div>
      </div>
    </MainLayout>
  );
}

export default GamePage;
