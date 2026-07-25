import React from "react";

export function ToolbarButton({ 
  icon, 
  label, 
  onClick, 
  isActive = false, 
  disabled = false, 
  title, 
  style 
}) {
  return (
    <button
      className={`flex-1 md:flex-none flex items-center justify-center gap-2 p-0 md:py-2 md:px-3 w-11 h-11 md:w-auto md:h-auto rounded-full md:rounded-sm bg-white/5 hover:bg-white/10 hover:-translate-y-0.5 border border-white/10 text-text-inverse font-heading font-bold text-xs uppercase cursor-pointer transition-all active:scale-95 ${isActive ? "text-success border-success/30 bg-success/10" : ""}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={style}
    >
      <span className="w-5 h-5 flex items-center justify-center">
        {icon}
      </span>
      <span className="hidden md:inline">{label}</span>
    </button>
  );
}

export default ToolbarButton;
