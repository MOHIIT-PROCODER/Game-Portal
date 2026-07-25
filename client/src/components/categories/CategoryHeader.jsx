import React from "react";
import { CATEGORY_ICONS } from "../../utils/constants";

export function CategoryHeader({ categoryName, count }) {
  const icon = CATEGORY_ICONS[categoryName] || "🎈";

  return (
    <div
      className="section-header-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "8px",
      }}
    >
      <h1 className="section-title" style={{ fontSize: "32px" }}>
        <span>{icon}</span> {categoryName} Games
      </h1>
      <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
        Play the best free online {categoryName.toLowerCase()} games. Choose
        from {count || "many"} high-quality titles and start playing instantly!
      </p>
    </div>
  );
}

export default CategoryHeader;
