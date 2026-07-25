import React from "react";
import MainLayout from "../components/layout/MainLayout";
import GameGrid from "../components/games/GameGrid";
import EmptyState from "../components/common/EmptyState";
import { useGameContext } from "../context/GameContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

export function FavoritesPage() {
  const { favorites } = useGameContext();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <MainLayout>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div className="section-header-container">
          <h2 className="section-title">❤️ My Favorite Games</h2>
        </div>

        {(!favorites || !Array.isArray(favorites) || favorites.length === 0) ? (
          <EmptyState
            title="No favorites yet"
            text="Keep track of your favorite games by clicking the heart button on the game toolbar."
            actionLabel="Discover Games"
            onAction={handleGoHome}
          />
        ) : (
          <GameGrid games={favorites} />
        )}
      </div>
    </MainLayout>
  );
}

export default FavoritesPage;
