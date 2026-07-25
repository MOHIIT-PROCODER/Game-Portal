import React from "react";

export function SidebarSection({ title, children, collapsed }) {
  return (
    <div className="mb-6">
      {title && !collapsed && <div className="px-6 mb-2 text-xs font-bold text-text-tertiary uppercase tracking-wider">{title}</div>}
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

export default SidebarSection;
