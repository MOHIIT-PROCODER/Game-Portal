import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameThumbnail from "./GameThumbnail";
import GameBadge from "./GameBadge";
import { formatPlayCount } from "../../utils/gameMapper";

export function GameCard({ game, isRowItem = false }) {
  const navigate = useNavigate();
  if (!game) return null;

  const handleClick = () => {
    navigate(`/game/${game.slug}`);
  };

  // Determine border glow color based on category
  const isSpecialCategory = ["puzzle", "trending", "strategy"].includes(
    game.category?.toLowerCase(),
  );

  const cardContent = (
    <div
      className={`game-card-wrapper ${isSpecialCategory ? "cyan-accent" : ""}`}
      onClick={handleClick}
    >
      <GameBadge game={game} />

      <div className="game-card-thumbnail-container">
        <GameThumbnail
          src={game.thumb}
          alt={game.title}
        />
      </div>

      <div className="game-card-overlay">
        <span className="game-card-title">{game.title}</span>
        <div className="game-card-meta">
          <span className="game-card-category">
            {game.category || "Casual"}
          </span>
          <span className="game-card-plays">
            👁️ {formatPlayCount(game.play_count)}
          </span>
        </div>
      </div>
    </div>
  );

  if (isRowItem) {
    return (
      <div style={{ minWidth: "200px", flex: "0 0 200px" }}>{cardContent}</div>
    );
  }

  return cardContent;
}

export default GameCard;
