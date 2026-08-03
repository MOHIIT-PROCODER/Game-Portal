import React from "react";

export function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
  collapsed = false,
}) {
  return (
    <div
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
      title={collapsed ? label : undefined}
      style={{
        justifyContent: collapsed ? "center" : "flex-start",
        padding: collapsed ? "0" : "0 var(--space-2)",
      }}
    >
      <span className="sidebar-item-icon">{icon}</span>
      {!collapsed && (
        <span className="sidebar-item-label">{label}</span>
      )}
    </div>
  );
}

export default SidebarItem;
