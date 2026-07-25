import React, { useState } from "react";
import ToolbarButton from "./ToolbarButton";

export function ReloadGameButton({ onClick }) {
  const [isReloading, setIsReloading] = useState(false);

  const handleReload = () => {
    setIsReloading(true);
    onClick();
    setTimeout(() => setIsReloading(false), 1000);
  };

  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isReloading ? "animate-spin" : ""}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );

  return (
    <ToolbarButton
      icon={icon}
      label="Reload"
      onClick={handleReload}
      title="Reload Game"
    />
  );
}

export default ReloadGameButton;
