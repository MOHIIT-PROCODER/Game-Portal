import React from "react";
import GameCard from "./GameCard";

export function GameRow({ games = [] }) {
  if (games.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: "16px",
        overflowX: "auto",
        paddingBottom: "12px",
        scrollBehavior: "smooth",
        scrollbarWidth: "thin",
      }}
    >
      {games.map((game) => (
        <GameCard key={game.id} game={game} isRowItem={true} />
      ))}
    </div>
  );
}

export default GameRow;
