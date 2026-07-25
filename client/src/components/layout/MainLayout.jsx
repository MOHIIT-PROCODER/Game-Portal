import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import BackToTop from "../common/BackToTop";
import { useGameContext } from "../../context/GameContext";

export function MainLayout({ children }) {
  const { sidebarOpen } = useGameContext();

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary font-body">
      {/* Top Navbar */}
      <Header />

      {/* Drawer Sidebar */}
      <Sidebar />

      {/* Page Body Wrapper */}
      <div
        className={`flex flex-1 mt-header min-h-[calc(100vh-70px)] transition-[padding-left] duration-0 
          pl-0 md:pl-sidebar-collapsed 
          ${sidebarOpen ? "lg:pl-sidebar" : "lg:pl-sidebar-collapsed"}`}
      >
        <div className="flex-1 p-4 lg:p-6 w-full max-w-[1600px] mx-auto flex flex-col gap-7 pb-20">
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
