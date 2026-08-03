import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export function Logo() {
  const navigate = useNavigate();

  return (
    <div className="logo-container" onClick={() => navigate(ROUTES.HOME)}>
      <span className="logo-icon">🎮</span>
      <span className="logo-text">CrazyGames</span>
    </div>
  );
}

export default Logo;
