import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameThumbnail from "./GameThumbnail";
import GameBadge from "./GameBadge";
import { formatPlayCount } from "../../utils/gameMapper";

export function GameCard({ game, isRowItem = false }) {
  const navigate = useNavigate();
  const [isBroken, setIsBroken] = useState(false);

  if (isBroken || !game) return null;

  const handleClick = () => {
    navigate(`/game/${game.slug}`);
  };

  // Determine border glow color based on category
  const isSpecialCategory = ["puzzle", "trending", "strategy"].includes(
    game.category?.toLowerCase(),
  );

  const cardContent = (
    <div
      className={`group relative bg-background-card border-2 border-border rounded-[10px] overflow-hidden flex flex-col aspect-[16/12] cursor-pointer transition-all duration-150 hover:-translate-y-1 hover:shadow-md ${isSpecialCategory ? "hover:border-accent-secondary hover:shadow-[0_0_10px_#00d2fc]" : "hover:border-text-secondary hover:shadow-[0_0_10px_#a48eff]"}`}
      onClick={handleClick}
    >
      <GameBadge game={game} />

      <div className="w-full h-full relative overflow-hidden">
        <GameThumbnail
          src={game.thumb}
          alt={game.title}
          onError={() => setIsBroken(true)}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(12,13,20,0.98)] from-0% via-[rgba(12,13,20,0.8)] via-60% to-transparent to-100% p-2 flex flex-col gap-[2px]">
        <span className="font-heading text-sm font-extrabold text-text-primary whitespace-nowrap overflow-hidden text-ellipsis">{game.title}</span>
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold text-text-secondary uppercase">
            {game.category || "Casual"}
          </span>
          <span className="text-[11px] text-text-tertiary flex items-center gap-1">
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
