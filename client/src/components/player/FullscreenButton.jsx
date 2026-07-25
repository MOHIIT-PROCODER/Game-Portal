import React from "react";
import ToolbarButton from "./ToolbarButton";

export function FullscreenButton({ isFullscreen, onClick }) {
  const icon = isFullscreen ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  );

  return (
    <ToolbarButton
      icon={icon}
      label={isFullscreen ? "Minimize" : "Fullscreen"}
      onClick={onClick}
      title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
    />
  );
}

export default FullscreenButton;
