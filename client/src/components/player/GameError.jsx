import React from "react";

export function GameError({
  message = "Unable to connect to game host.",
  onRetry,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(9, 9, 11, 0.95)",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
        gap: "16px",
      }}
    >
      <span style={{ fontSize: "48px" }}>⚠️</span>
      <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
        Game Loading Error
      </h3>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "14px",
          maxWidth: "300px",
        }}
      >
        {message}
      </p>
      {onRetry && (
        <button
          className="play-button"
          onClick={onRetry}
          style={{ padding: "8px 24px", fontSize: "13px" }}
        >
          Reload Frame
        </button>
      )}
    </div>
  );
}

export default GameError;
