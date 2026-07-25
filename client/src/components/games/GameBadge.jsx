import React from "react";

export function GameBadge({ game }) {
  if (!game) return null;

  const baseClass = "absolute top-2 left-2 px-2 py-1 rounded-[10px] text-[10px] font-black uppercase z-10 shadow-sm border-[1.5px] border-border";

  if (game.is_featured) {
    return <span className={`${baseClass} bg-text-secondary text-bg-surface`}>Featured</span>;
  }

  // Play count > 50 means it is trending/hot in this mock/real feed context
  if (game.play_count > 50) {
    return <span className={`${baseClass} bg-danger text-white`}>Hot</span>;
  }

  // Fallback check: if it's one of the first few games, make it "New"
  if (
    game.id &&
    (game.id.includes("moto") ||
      game.id.includes("bloxd") ||
      Math.random() < 0.05)
  ) {
    return <span className={`${baseClass} bg-success text-white`}>New</span>;
  }

  return null;
}

export default GameBadge;
