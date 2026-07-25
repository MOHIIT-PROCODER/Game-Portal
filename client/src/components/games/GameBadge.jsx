import React from "react";

export function GameBadge({ game }) {
  if (!game) return null;

  if (game.is_featured) {
    return <span className="game-badge featured">Featured</span>;
  }

  // Play count > 50 means it is trending/hot in this mock/real feed context
  if (game.play_count > 50) {
    return <span className="game-badge hot">Hot</span>;
  }

  // Fallback check: if it's one of the first few games, make it "New"
  if (
    game.id &&
    (game.id.includes("moto") ||
      game.id.includes("bloxd") ||
      Math.random() < 0.05)
  ) {
    return <span className="game-badge new">New</span>;
  }

  return null;
}

export default GameBadge;
