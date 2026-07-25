import React, { useState } from "react";
import FullscreenButton from "./FullscreenButton";
import FavoriteButton from "./FavoriteButton";
import ShareButton from "./ShareButton";
import ReloadGameButton from "./ReloadGameButton";
import { formatPlayCount } from "../../utils/gameMapper";

export function GameToolbar({
  game,
  stats,
  voteLike,
  isFav,
  toggleFavorite,
  isFullscreen,
  toggleFullscreen,
  onReload,
}) {
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = async (isLike) => {
    if (hasVoted) return;
    const success = await voteLike(isLike);
    if (success) {
      setHasVoted(true);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between p-3 md:p-0 gap-3 md:gap-4 bg-black md:bg-transparent rounded-lg md:rounded-none">
      {/* Plays statistics */}
      <div className="flex w-full md:w-auto justify-around md:justify-start gap-4 md:gap-6 border-b-2 border-border md:border-none pb-2 md:pb-0 text-text-muted text-sm font-semibold">
        <span title="Total plays">
          👁️ <strong className="text-white">{formatPlayCount(stats.play_count)}</strong> plays
        </span>
        <span title="Total likes">
          👍 <strong className="text-white">{formatPlayCount(stats.like_count)}</strong> likes
        </span>
      </div>

      {/* Toolbar actions */}
      <div className="flex w-full md:w-auto justify-between md:justify-end items-center gap-2 md:gap-3">
        {/* Simple Likes system */}
        <button
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 p-0 md:py-2 md:px-3 w-11 h-11 md:w-auto md:h-auto rounded-full md:rounded-sm bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 border border-white/10 text-text-inverse font-heading font-bold text-xs uppercase cursor-pointer transition-all active:scale-95 ${hasVoted ? "text-success border-success/30 bg-success/10" : ""}`}
          onClick={() => handleVote(true)}
          disabled={hasVoted}
          title="Like this game"
          style={{ opacity: hasVoted ? 0.7 : 1 }}
        >
          <span className="w-5 h-5 flex items-center justify-center">👍</span>
          <span className="hidden md:inline">Like</span>
        </button>

        <ReloadGameButton onClick={onReload} />
        <FavoriteButton isFav={isFav} onClick={() => toggleFavorite(game)} />
        <ShareButton />
        <FullscreenButton
          isFullscreen={isFullscreen}
          onClick={toggleFullscreen}
        />
      </div>
    </div>
  );
}

export default GameToolbar;
