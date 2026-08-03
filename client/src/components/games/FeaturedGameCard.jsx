import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function FeaturedGameCard({ game }) {
  const navigate = useNavigate();
  const [isBroken, setIsBroken] = useState(false);

  if (isBroken || !game) return null;

  const handlePlayClick = () => {
    navigate(`/game/${game.slug}`);
  };

  return (
    <div className="featured-game-banner" onClick={handlePlayClick}>
      {/* Background Cover Image */}
      <img
        src={game.thumb}
        alt={game.title}
        className="featured-game-background"
        onError={() => setIsBroken(true)}
      />
      <div className="featured-game-gradient" />

      {/* Foreground Content */}
      <div className="featured-game-content">
        <div className="featured-meta">
          <span className="game-badge featured">⭐ Featured</span>
          {game.category && (
            <span className="pill-tag cyan">{game.category}</span>
          )}
        </div>

        <h2 className="featured-title">{game.title}</h2>

        <p className="featured-description">
          {game.description ||
            "Embark on a gaming adventure. Play now directly in your browser for free."}
        </p>

        <div style={{ marginTop: "8px" }}>
          <button className="play-button">
            <span>▶</span> Play Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeaturedGameCard;
