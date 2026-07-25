import React from "react";

export function CategoryFilter({ activeSort = "newest", onSortChange }) {
  const options = [
    { value: "newest", label: "✨ Newest" },
    { value: "popular", label: "🔥 Popular" },
    { value: "likes", label: "👍 High Rated" },
    { value: "trending", label: "📈 Trending" },
  ];

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginBottom: "8px",
      }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          className={`toolbar-btn ${activeSort === opt.value ? "active" : ""}`}
          onClick={() => onSortChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
