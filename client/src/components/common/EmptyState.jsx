import React from "react";

export function EmptyState({
  title = "No results found",
  text = "We couldn't find what you were looking for.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="empty-state">
      <span style={{ fontSize: "48px" }}>🔍</span>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-text">{text}</p>
      {actionLabel && onAction && (
        <button
          className="play-button"
          onClick={onAction}
          style={{ padding: "8px 24px", fontSize: "14px", marginTop: "8px" }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
