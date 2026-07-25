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
      className={`flex items-center py-3 cursor-pointer transition-colors border-l-4 ${
        active 
          ? "border-accent text-accent bg-accent/10" 
          : "border-transparent text-text-muted hover:text-text-primary hover:bg-white/5"
      } ${collapsed ? "justify-center px-0" : "justify-start px-6"}`}
      onClick={onClick}
      title={collapsed ? label : undefined}
    >
      <span className={`flex items-center justify-center text-lg ${collapsed ? "" : "mr-4 w-6"}`}>
        {icon}
      </span>
      {!collapsed && <span className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis">{label}</span>}
    </div>
  );
}

export default SidebarItem;
