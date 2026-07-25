import React from "react";

export function Loader({ size = "medium", message = "" }) {
  return (
    <div className="loader-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div className="spinner" />
        {message && (
          <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            {message}
          </span>
        )}
      </div>
    </div>
  );
}

export default Loader;
