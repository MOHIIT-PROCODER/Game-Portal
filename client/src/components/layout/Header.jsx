import React, { useState } from "react";
import { useGameContext } from "../../context/GameContext";
import Logo from "../header/Logo";
import SearchBar from "../header/SearchBar";
import MobileSearch from "../header/MobileSearch";

export function Header() {
  const { toggleSidebar } = useGameContext();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-left">
        {/* Hamburger/Toggle Menu for Sidebar */}
        <button
          style={{
            padding: "8px",
            borderRadius: "10px",
            color: "var(--text-tertiary)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.15s ease",
          }}
          onClick={toggleSidebar}
          title="Toggle Sidebar"
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(124,58,237,0.12)";
            e.currentTarget.style.color = "var(--accent-light)";
            e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            e.currentTarget.style.color = "var(--text-tertiary)";
            e.currentTarget.style.borderColor = "var(--border-subtle)";
          }}
        >
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
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <Logo />
      </div>

      {/* Desktop Search Bar */}
      <SearchBar />

      {/* Mobile Right Controls */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          className="mobile-search-toggle-btn"
          onClick={() => setMobileSearchOpen(true)}
          title="Search Games"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "20px", height: "20px" }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      {/* Mobile Search Screen Overlay */}
      {mobileSearchOpen && (
        <MobileSearch onClose={() => setMobileSearchOpen(false)} />
      )}
    </header>
  );
}

export default Header;
