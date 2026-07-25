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

  // Whitelist of primary categories to display in the sidebar
  const whitelist = [
    "Adventure",
    "Arcade",
    "Board",
    "Classics",
    "Junior",
    "Sports",
    "Strategy",
  ];

  const filteredCategories = categories
    .filter(
      (cat) =>
        cat &&
        cat.category &&
        whitelist
          .map((w) => w.toLowerCase())
          .includes(cat.category.toLowerCase().trim()),
    )
    .sort((a, b) => a.category.localeCompare(b.category));

  return (
    <div className="category-sidebar-list">
      {filteredCategories.map((cat) => {
        const catName = cat.category.trim();
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
