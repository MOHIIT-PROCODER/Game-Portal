import React from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORY_ICONS } from "../../utils/constants";

export function CategoryCard({ category, count }) {
  const navigate = useNavigate();
  const icon = CATEGORY_ICONS[category] || "🎈";

  const handleClick = () => {
    navigate(`/category/${encodeURIComponent(category.toLowerCase())}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      <span style={{ fontSize: "32px", marginBottom: "8px" }}>{icon}</span>
      <span className="category-card-name">{category}</span>
      <span className="category-card-count">{count} Games</span>
    </div>
  );
}

export default CategoryCard;
