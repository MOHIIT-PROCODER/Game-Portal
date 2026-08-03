import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import BackToTop from "../common/BackToTop";
import MobileNavbar from "./MobileNavbar";
import { useGameContext } from "../../context/GameContext";

export function MainLayout({ children }) {
  const { sidebarOpen } = useGameContext();

  return (
    <div
      className="app-container"
      style={{
        background: "var(--bg-primary)",
        backgroundImage:
          "radial-gradient(ellipse at 20% 10%, rgba(124, 58, 237, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)",
        minHeight: "100vh",
      }}
    >
      {/* Top Navbar */}
      <Header />

      {/* Drawer Sidebar */}
      <Sidebar />

      {/* Page Body Wrapper */}
      <div
        className={`main-wrapper ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <div className="content-container">
          {children}
          <Footer />
        </div>
      </div>

      {/* Mobile bottom nav */}
      <MobileNavbar />

      {/* Scroll back to top float */}
      <BackToTop />
    </div>
  );
}

export default MainLayout;
