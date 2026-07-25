import React from "react";
import GameCard from "./GameCard";

export function RelatedGames({ games = [], loading = false }) {
  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <h3 className="info-section-title">Related Games</h3>
        <div style={{ color: "var(--text-muted)" }}>Loading suggestions...</div>
      </div>
    );
  }

  if (games.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h3 className="info-section-title">🎮 Related Games</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {games.map((game) => (
          <div key={game.id} style={{ width: "100%" }}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelatedGames;
