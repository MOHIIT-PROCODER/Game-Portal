import React from "react";

export function PlayOverlay({ game, onPlay }) {
  if (!game) return null;

  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(game.title)}&background=0c2016&color=00ffaa&size=140`;

  return (
    <div className="click-overlay-container" onClick={onPlay}>
      <div
        className="click-overlay-bg"
        style={{ backgroundImage: `url(${game.thumb || fallbackImage})` }}
      />
      <div className="click-overlay-content">
        <img
          className="click-overlay-thumb"
          src={game.thumb || fallbackImage}
          alt={game.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = fallbackImage;
          }}
        />
        <h2 className="click-overlay-title">{game.title}</h2>
        <button className="click-overlay-btn">
          <i className="fa-solid fa-circle-play"></i> OK, PLAY NOW!
        </button>
      </div>
    </div>
  );
}

export default PlayOverlay;
