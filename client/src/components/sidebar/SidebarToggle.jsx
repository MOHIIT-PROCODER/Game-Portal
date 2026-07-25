import React from "react";
import { useGameContext } from "../../context/GameContext";

export function SidebarToggle() {
  const { sidebarOpen, toggleSidebar } = useGameContext();

  return (
    <div
      className={`flex items-center py-3 cursor-pointer transition-colors border-t border-border text-text-muted hover:text-text-primary hover:bg-white/5 mt-auto h-[52px] ${!sidebarOpen ? "justify-center px-0" : "justify-start px-6"}`}
      onClick={toggleSidebar}
      title={sidebarOpen ? "Collapse Menu" : "Expand Menu"}
    >
      <span className={`flex items-center justify-center text-lg ${!sidebarOpen ? "" : "mr-4 w-6"}`}>
        {sidebarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[18px] h-[18px]"
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
            className="w-[18px] h-[18px]"
          >
            <polyline points="13 17 18 12 13 7" />
            <polyline points="6 17 11 12 6 7" />
          </svg>
        )}
      </span>
      {sidebarOpen && <span className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">Collapse Menu</span>}
    </div>
  );
}

export default SidebarToggle;
