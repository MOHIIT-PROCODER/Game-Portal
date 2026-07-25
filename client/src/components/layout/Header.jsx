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
          className="toolbar-btn"
          onClick={toggleSidebar}
          style={{
            padding: "8px",
            borderRadius: "50%",
            border: "none",
            background: "none",
          }}
          title="Toggle Sidebar"
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
