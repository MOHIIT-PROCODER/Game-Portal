import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export function MobileNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="mobile-navbar">
      <div
        className={`mobile-nav-item ${isActive(ROUTES.HOME) ? "active" : ""}`}
        onClick={() => handleNavigation(ROUTES.HOME)}
      >
        <span style={{ fontSize: "18px" }}>🏠</span>
        <span>Home</span>
      </div>

      <div
        className={`mobile-nav-item ${isActive(ROUTES.SEARCH) ? "active" : ""}`}
        onClick={() => handleNavigation(ROUTES.SEARCH)}
      >
        <span style={{ fontSize: "18px" }}>🔍</span>
        <span>Search</span>
      </div>

      <div
        className={`mobile-nav-item ${isActive(ROUTES.FAVORITES) ? "active" : ""}`}
        onClick={() => handleNavigation(ROUTES.FAVORITES)}
      >
        <span style={{ fontSize: "18px" }}>❤️</span>
        <span>Favorites</span>
      </div>

      <div
        className={`mobile-nav-item ${isActive(ROUTES.RECENT) ? "active" : ""}`}
        onClick={() => handleNavigation(ROUTES.RECENT)}
      >
        <span style={{ fontSize: "18px" }}>⏱️</span>
        <span>Recent</span>
      </div>
    </nav>
  );
}

export default MobileNavbar;
