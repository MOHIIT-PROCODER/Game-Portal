import React from "react";
import SectionHeader from "../common/SectionHeader";
import CategoryGrid from "../categories/CategoryGrid";
import useCategories from "../../hooks/useCategories";

export function CategorySection() {
  const { categories, loading } = useCategories();

  if (loading || categories.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <SectionHeader title="🧩 Browse Categories" />
      <CategoryGrid categories={categories.slice(0, 10)} />
    </div>
  );
}

export default CategorySection;
