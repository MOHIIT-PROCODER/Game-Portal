import React from "react";
import MainLayout from "../components/layout/MainLayout";
import GameGrid from "../components/games/GameGrid";
import EmptyState from "../components/common/EmptyState";
import { useGameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

export function RecentPage() {
  const { recentlyPlayed, clearRecentGames } = useGameContext();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <MainLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          className="section-header-container"
          style={{ alignItems: "center" }}
        >
          <h2 className="section-title">⏱️ Recently Played Games</h2>
          {recentlyPlayed && Array.isArray(recentlyPlayed) && recentlyPlayed.length > 0 && (
            <button
              className="toolbar-btn"
              onClick={clearRecentGames}
              style={{ borderColor: "var(--danger)", color: "var(--danger)" }}
            >
              Clear History
            </button>
          )}
        </div>

        {(!recentlyPlayed || !Array.isArray(recentlyPlayed) || recentlyPlayed.length === 0) ? (
          <EmptyState
            title="No recently played games"
            text="You haven't played any games on this browser yet. Browse our selection and play your first game!"
            actionLabel="Discover Games"
            onAction={handleGoHome}
          />
        ) : (
          <GameGrid games={recentlyPlayed} />
        )}
      </div>
    </MainLayout>
  );
}

export default RecentPage;
