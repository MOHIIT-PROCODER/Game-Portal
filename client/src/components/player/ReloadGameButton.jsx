import React from "react";

export function ReloadGameButton({ onClick }) {
  return (
    <button
      className="toolbar-btn"
      onClick={onClick}
      title="Reload Game Stream"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
      </svg>
      <span className="btn-label">Reload</span>
    </button>
  );
}

export default ReloadGameButton;
