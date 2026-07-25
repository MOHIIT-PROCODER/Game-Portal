import React, { useState } from "react";
import { useGameContext } from "../../context/GameContext";
import Logo from "../header/Logo";
import SearchBar from "../header/SearchBar";
import MobileSearch from "../header/MobileSearch";

export function Header() {
  const { toggleSidebar } = useGameContext();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-header bg-background/95 backdrop-blur-md border-b border-border z-[100] flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        {/* Hamburger/Toggle Menu for Sidebar */}
        <button
          className="p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
          onClick={toggleSidebar}
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
          className="md:hidden p-2 rounded-full text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
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
