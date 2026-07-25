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
          👁️ <strong>{formatPlayCount(stats.play_count)}</strong> plays
        </span>
        <span title="Total likes">
          👍 <strong>{formatPlayCount(stats.like_count)}</strong> likes
        </span>
      </div>

      {/* Toolbar actions */}
      <div className="toolbar-buttons">
        {/* Simple Likes system */}
        <button
          className={`toolbar-btn ${hasVoted ? "active" : ""}`}
          onClick={() => handleVote(true)}
          disabled={hasVoted}
          title="Like this game"
          style={{ opacity: hasVoted ? 0.7 : 1 }}
        >
          <span className="btn-icon">👍</span>
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
