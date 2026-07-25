import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useGameContext } from "../../context/GameContext";
import { ROUTES } from "../../utils/constants";

// Sidebar Components
import SidebarSection from "../sidebar/SidebarSection";
import SidebarItem from "../sidebar/SidebarItem";
import CategoryMenu from "../sidebar/CategoryMenu";
import SidebarToggle from "../sidebar/SidebarToggle";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen, mobileDrawerOpen, closeMobileDrawer } =
    useGameContext();

  const isMobile = () => window.innerWidth <= 768;

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile()) {
      closeMobileDrawer();
    }
  };

  const isActive = (path) => location.pathname === path;

  // On mobile: use mobileDrawerOpen; on desktop: use sidebarOpen
  const drawerOpen = isMobile() ? mobileDrawerOpen : sidebarOpen;
  // On mobile the sidebar is always fully expanded (not collapsed)
  const isCollapsed = isMobile() ? false : !sidebarOpen;

  return (
    <>
      {/* Backdrop — only visible on mobile when drawer is open */}
      {mobileDrawerOpen && (
        <div
          onClick={closeMobileDrawer}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 299,
            background: "rgba(0,0,0,0.6)",
          }}
        />
      )}

      <aside className={`sidebar ${drawerOpen ? "open" : "closed"} ${isMobile() ? "mobile-drawer" : ""}`}>
        {/* Mobile Close Button */}
        {isMobile() && (
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "12px 16px" }}>
            <button
              onClick={closeMobileDrawer}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-default)",
                color: "var(--text-primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
              }}
              title="Close Menu"
            >
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Navigation section */}
        <SidebarSection title="Feeds">
          <SidebarItem
            icon="🏠"
            label="Home"
            active={isActive(ROUTES.HOME)}
            onClick={() => handleNavigation(ROUTES.HOME)}
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon="🔥"
            label="Popular"
            active={isActive(ROUTES.POPULAR)}
            onClick={() => handleNavigation(ROUTES.POPULAR)}
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon="✨"
            label="New Games"
            active={isActive(ROUTES.NEW)}
            onClick={() => handleNavigation(ROUTES.NEW)}
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon="📈"
            label="Trending"
            active={isActive(ROUTES.TRENDING)}
            onClick={() => handleNavigation(ROUTES.TRENDING)}
            collapsed={isCollapsed}
          />
        </SidebarSection>

        {/* Library section */}
        <SidebarSection title="Library">
          <SidebarItem
            icon="❤️"
            label="Favorites"
            active={isActive(ROUTES.FAVORITES)}
            onClick={() => handleNavigation(ROUTES.FAVORITES)}
            collapsed={isCollapsed}
          />
          <SidebarItem
            icon="⏱️"
            label="Recently Played"
            active={isActive(ROUTES.RECENT)}
            onClick={() => handleNavigation(ROUTES.RECENT)}
            collapsed={isCollapsed}
          />
        </SidebarSection>

        {/* Categories section */}
        <SidebarSection title="Categories">
          <CategoryMenu collapsed={isCollapsed} />
        </SidebarSection>

        {/* Company / Info Section */}
        <SidebarSection title={!isCollapsed ? "Company" : ""}>
          {!isCollapsed ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                className="sidebar-contact-btn"
                onClick={() => handleNavigation(ROUTES.CONTACT)}
              >
                ✉️ Contact us
              </button>
              <div className="sidebar-footer-links">
                <Link to={ROUTES.ABOUT} className="sidebar-footer-link">
                  About
                </Link>
                <Link to={ROUTES.ABOUT} className="sidebar-footer-link">
                  Developers
                </Link>
                <Link to={ROUTES.HOME} className="sidebar-footer-link">
                  Kids site
                </Link>
                <Link to={ROUTES.ABOUT} className="sidebar-footer-link">
                  Jobs
                </Link>
                <Link to={ROUTES.PRIVACY} className="sidebar-footer-link">
                  Info for parents
                </Link>
                <Link to={ROUTES.TERMS} className="sidebar-footer-link">
                  Terms &amp; conditions
                </Link>
                <Link to={ROUTES.PRIVACY} className="sidebar-footer-link">
                  Privacy
                </Link>
                <Link to={ROUTES.ALL} className="sidebar-footer-link">
                  All games
                </Link>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "8px 0",
              }}
            >
              <button
                className="sidebar-contact-btn collapsed"
                onClick={() => handleNavigation(ROUTES.CONTACT)}
                title="Contact us"
              >
                ✉️
              </button>
            </div>
          )}
        </SidebarSection>

        {/* Bottom Toggle — hidden on mobile drawer */}
        {!isMobile() && <SidebarToggle />}
      </aside>
    </>
  );
}

export default Sidebar;
