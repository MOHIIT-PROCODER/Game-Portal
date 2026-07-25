import React from "react";
import CategoryCard from "./CategoryCard";

export function CategoryGrid({ categories = [] }) {
  if (categories.length === 0) {
    return (
      <div style={{ color: "var(--text-muted)" }}>No categories found.</div>
    );
  }

  return (
    <div className="category-grid">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.category}
          category={cat.category}
          count={cat.count}
        />
      ))}
    </div>
  );
}

export default CategoryGrid;
