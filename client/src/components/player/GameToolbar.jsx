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
    <div className="player-toolbar">
      {/* Plays statistics */}
      <div className="toolbar-stats">
        <span title="Total plays">
          👁️ <strong style={{ color: "var(--text-primary)" }}>{formatPlayCount(stats.play_count)}</strong> plays
        </span>
        <span title="Total likes">
          👍 <strong style={{ color: "var(--text-primary)" }}>{formatPlayCount(stats.like_count)}</strong> likes
        </span>
      </div>

      {/* Toolbar actions */}
      <div className="toolbar-buttons">
        {/* Like button */}
        <button
          className={`toolbar-btn ${hasVoted ? "active" : ""}`}
          onClick={() => handleVote(true)}
          disabled={hasVoted}
          title="Like this game"
          style={hasVoted ? {
            color: "var(--success)",
            borderColor: "rgba(16,185,129,0.3)",
            background: "rgba(16,185,129,0.1)",
          } : {}}
        >
          <span>👍</span>
          <span className="btn-label">Like</span>
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
