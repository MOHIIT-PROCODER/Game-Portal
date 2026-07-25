import React from "react";

export function GameDetails({ game }) {
  if (!game) return null;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        fontSize: "13px",
        borderTop: "1px solid var(--border-color)",
        paddingTop: "16px",
        color: "var(--text-secondary)",
      }}
    >
      <div>
        <strong>Platform:</strong> Web Browser (desktop, mobile, tablet)
      </div>
      <div>
        <strong>Technology:</strong> HTML5 (Canvas)
      </div>
      <div>
        <strong>Aspect Ratio:</strong> {game.width}x{game.height}
      </div>
      <div>
        <strong>Developer:</strong> Third-party Distribution
      </div>
    </div>
  );
}

export default GameDetails;
