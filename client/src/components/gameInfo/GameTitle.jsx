import React from "react";

export function GameTitle({ title, category }) {
  return (
    <div className="game-info-title-row">
      <h1 className="game-info-title">{title}</h1>
      {category && <span className="game-info-category">{category}</span>}
    </div>
  );
}

export default GameTitle;
