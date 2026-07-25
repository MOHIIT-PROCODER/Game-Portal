import React from "react";

export function GameInstructions({ instructions }) {
  if (!instructions) return null;

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        padding: "16px",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-color)",
      }}
    >
      <h3 className="info-section-title">🕹️ How to Play / Instructions</h3>
      <p className="info-text" style={{ fontStyle: "italic" }}>
        {instructions}
      </p>
    </div>
  );
}

export default GameInstructions;
