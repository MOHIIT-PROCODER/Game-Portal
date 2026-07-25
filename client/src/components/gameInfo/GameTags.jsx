import React from "react";

export function GameTags({ tags }) {
  if (!tags) return null;

  // Split tags by comma
  const tagsList = tags
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  if (tagsList.length === 0) return null;

  return (
    <div>
      <h4
        className="info-section-title"
        style={{ fontSize: "14px", color: "var(--text-secondary)" }}
      >
        Tags
      </h4>
      <div className="game-tags-list">
        {tagsList.map((tag) => (
          <span key={tag} className="game-tag-item">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default GameTags;
