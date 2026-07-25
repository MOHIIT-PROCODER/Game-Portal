import React from "react";

export function GameDescription({ description }) {
  if (!description) return null;

  return (
    <div>
      <h3 className="info-section-title">Description</h3>
      <p className="info-text">{description}</p>
    </div>
  );
}

export default GameDescription;
