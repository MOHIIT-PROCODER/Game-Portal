import React from "react";

export function SidebarSection({ title, children }) {
  return (
    <div className="sidebar-section">
      {title && <div className="sidebar-section-title">{title}</div>}
      <div className="sidebar-section-content">{children}</div>
    </div>
  );
}

export default SidebarSection;
