import React from "react";
import { useGameContext } from "../../context/GameContext";

export function SidebarToggle() {
  const { sidebarOpen, toggleSidebar } = useGameContext();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: sidebarOpen ? "12px var(--space-2)" : "12px",
        justifyContent: sidebarOpen ? "flex-start" : "center",
        gap: "10px",
        cursor: "pointer",
        borderTop: "1px solid var(--border-subtle)",
        color: "var(--text-muted)",
        marginTop: "auto",
        transition: "all 0.15s ease",
        minHeight: "50px",
      }}
      onClick={toggleSidebar}
      title={sidebarOpen ? "Collapse Menu" : "Expand Menu"}
      onMouseEnter={e => {
        e.currentTarget.style.color = "var(--accent-light)";
        e.currentTarget.style.background = "rgba(124,58,237,0.06)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = "var(--text-muted)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {sidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "18px", height: "18px" }}
          >
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
        )}
      </span>
      {sidebarOpen && (
        <span
          style={{
            fontSize: "var(--font-size-xs)",
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          Collapse
        </span>
      )}
    </div>
  );
}

export default SidebarToggle;
