import React from "react";
import { useGameContext } from "../../context/GameContext";

export function SidebarToggle() {
  const { sidebarOpen, toggleSidebar } = useGameContext();

  return (
    <div
      className="sidebar-item"
      onClick={toggleSidebar}
      style={{
        marginTop: "auto",
        borderTop: "1px solid var(--border-color)",
        height: "52px",
      }}
      title={sidebarOpen ? "Collapse Menu" : "Expand Menu"}
    >
      <span className="sidebar-item-icon">
        {sidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "18px", height: "18px" }}
          >
            <polyline points="11 17 6 12 11 7" />
            <polyline points="18 17 13 12 18 7" />
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
            style={{ width: "18px", height: "18px" }}
          >
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
        )}
      </span>
      {sidebarOpen && <span className="sidebar-item-label">Collapse Menu</span>}
    </div>
  );
}

export default SidebarToggle;
