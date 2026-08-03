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

  const drawerOpen = isMobile() ? mobileDrawerOpen : sidebarOpen;
  const isCollapsed = isMobile() ? false : !sidebarOpen;

  const sidebarStyle = {
    position: "fixed",
    left: 0,
    bottom: 0,
    background: "var(--bg-secondary)",
    backgroundImage: "linear-gradient(to right, rgba(124, 58, 237, 0.04) 0%, transparent 100%)",
    borderRight: "1px solid var(--border-default)",
    display: "flex",
    flexDirection: "column",
    zIndex: isMobile() ? 300 : 90,
    overflowY: "auto",
    overflowX: "hidden",
    top: isMobile() ? 0 : "var(--header-height)",
    height: isMobile() ? "100vh" : "calc(100vh - var(--header-height))",
    width: isMobile() ? "288px" : (drawerOpen ? "var(--sidebar-width)" : "var(--sidebar-collapsed-width)"),
    transform: isMobile() ? (drawerOpen ? "translateX(0)" : "translateX(-100%)") : "none",
    transition: isMobile()
      ? "transform 0.28s cubic-bezier(0.4, 0, 0.2, 1)"
      : "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: isMobile() && drawerOpen
      ? "4px 0 40px rgba(0, 0, 0, 0.8), 0 0 60px rgba(124, 58, 237, 0.1)"
      : "none",
  };

  return (
    <>
      {/* Backdrop — only visible on mobile when drawer is open */}
      {mobileDrawerOpen && (
        <div
          onClick={closeMobileDrawer}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 110,
            background: "rgba(8, 9, 18, 0.75)",
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      <aside
        className={`sidebar ${drawerOpen ? "open" : "closed"} ${isMobile() ? "mobile-drawer" : ""} ${isMobile() && drawerOpen ? "open" : ""}`}
        style={sidebarStyle}
      >
        {/* Mobile Close Button */}
        {isMobile() && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 16px 8px" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "16px", background: "linear-gradient(135deg, #a78bfa, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              🎮 CrazyGames
            </span>
            <button
              onClick={closeMobileDrawer}
              style={{
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.2)",
                color: "var(--text-tertiary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                transition: "all 0.15s ease",
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
                style={{ width: "16px", height: "16px" }}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Navigation section */}
        <SidebarSection title="Feeds" collapsed={isCollapsed}>
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
        <SidebarSection title="Library" collapsed={isCollapsed}>
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
        <SidebarSection title="Categories" collapsed={isCollapsed}>
          <CategoryMenu collapsed={isCollapsed} />
        </SidebarSection>

        {/* Company / Info Section */}
        <SidebarSection title={!isCollapsed ? "Company" : ""} collapsed={isCollapsed}>
          {!isCollapsed ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <button
                className="sidebar-contact-btn"
                onClick={() => handleNavigation(ROUTES.CONTACT)}
              >
                ✉️ Contact us
              </button>
              <div className="sidebar-footer-links">
                <Link to={ROUTES.ABOUT} className="sidebar-footer-link">About</Link>
                <Link to={ROUTES.ABOUT} className="sidebar-footer-link">Developers</Link>
                <Link to={ROUTES.HOME} className="sidebar-footer-link">Kids site</Link>
                <Link to={ROUTES.ABOUT} className="sidebar-footer-link">Jobs</Link>
                <Link to={ROUTES.PRIVACY} className="sidebar-footer-link">Info for parents</Link>
                <Link to={ROUTES.TERMS} className="sidebar-footer-link">Terms &amp; conditions</Link>
                <Link to={ROUTES.PRIVACY} className="sidebar-footer-link">Privacy</Link>
                <Link to={ROUTES.ALL} className="sidebar-footer-link">All games</Link>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
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
