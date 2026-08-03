import React, { useState } from "react";
import { useGameContext } from "../../context/GameContext";
import Logo from "../header/Logo";
import SearchBar from "../header/SearchBar";
import MobileSearch from "../header/MobileSearch";

export function Header() {
  const { toggleSidebar } = useGameContext();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleAppInstallClick = () => {
    if (window.triggerPwaInstall) {
      window.triggerPwaInstall();
    } else {
      window.dispatchEvent(new CustomEvent("open-install-pwa-modal"));
    }
  };

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
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(124,58,237,0.12)";
            e.currentTarget.style.color = "var(--accent-light)";
            e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
          }}
          onMouseLeave={(e) => {
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

      {/* Right Action Controls (Install App & Search Toggle) */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Mobile & Desktop Install App Button */}
        <button
          onClick={handleAppInstallClick}
          title="Install CrazyGames Mobile App / APK"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #ec4899, #f97316)",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            padding: "7px 12px",
            fontSize: "12px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(124, 58, 237, 0.4)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.04)";
            e.currentTarget.style.boxShadow = "0 6px 20px rgba(236, 72, 153, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 14px rgba(124, 58, 237, 0.4)";
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ width: "15px", height: "15px" }}
          >
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
          </svg>
          <span className="hidden sm:inline">Install App</span>
          <span className="sm:hidden">App</span>
        </button>

        {/* Mobile Search Toggle */}
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
