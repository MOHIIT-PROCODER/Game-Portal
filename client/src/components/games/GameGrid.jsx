import React from "react";
import GameCard from "./GameCard";

export function GameGrid({ games = [] }) {
  if (games.length === 0) return null;

  return (
    <div className="game-grid">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

export default GameGrid;
