import React from "react";

export function SidebarSection({ title, children, collapsed }) {
  return (
    <div className="sidebar-section">
      {title && !collapsed && (
        <div className="sidebar-section-title">{title}</div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {children}
      </div>
    </div>
  );
}

export default SidebarSection;
