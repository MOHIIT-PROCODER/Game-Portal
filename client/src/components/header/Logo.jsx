import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export function Logo() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="logo-container" onClick={handleLogoClick}>
      <span className="logo-icon">🎮</span>
      <span>GAMEPORTAL</span>
    </div>
  );
}

export default Logo;
