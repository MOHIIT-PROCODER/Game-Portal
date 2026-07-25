import React from "react";
import GameGrid from "./GameGrid";

export function RecommendedGames({ games = [] }) {
  if (games.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div className="section-header-container">
        <h2 className="section-title">🔮 Recommended For You</h2>
      </div>
      <GameGrid games={games} />
    </div>
  );
}

export default RecommendedGames;
