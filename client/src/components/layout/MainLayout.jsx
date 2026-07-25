import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import BackToTop from "../common/BackToTop";
import { useGameContext } from "../../context/GameContext";

export function MainLayout({ children }) {
  const { sidebarOpen } = useGameContext();

  return (
    <div className="app-container">
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

      {/* Scroll back to top float */}
      <BackToTop />
    </div>
  );
}

export default MainLayout;
