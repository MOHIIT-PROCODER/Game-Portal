import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useCategories from "../../hooks/useCategories";
import SidebarItem from "./SidebarItem";
import { CATEGORY_ICONS } from "../../utils/constants";

export function CategoryMenu({ collapsed = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { categories, loading } = useCategories();

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  if (loading && !collapsed) {
    return (
      <div
        style={{
          padding: "0 24px",
          fontSize: "12px",
          color: "var(--text-muted)",
        }}
      >
        Loading categories...
      </div>
    );
  }

  // Hardcoded list of categories the user explicitly requested to always show
  const requestedCategories = [
    "Adventure",
    "Arcade",
    "Board",
    "Classics",
    "Junior",
    "Sports",
    "Strategy",
  ];

  return (
    <div className="category-sidebar-list">
      {requestedCategories.map((catName) => {
        const icon = CATEGORY_ICONS[catName] || "🎈";
        const isActive =
          location.pathname === `/category/${catName.toLowerCase()}`;

        return (
          <SidebarItem
            key={catName}
            icon={icon}
            label={catName}
            active={isActive}
            onClick={() => handleCategoryClick(catName)}
            collapsed={collapsed}
          />
        );
      })}
    </div>
  );
}

export default CategoryMenu;
