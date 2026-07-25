import React from "react";

export function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        marginTop: "24px",
      }}
    >
      <button
        className="toolbar-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        style={{
          opacity: currentPage === 1 ? 0.5 : 1,
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        &larr; Prev
      </button>

      <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="toolbar-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          opacity: currentPage === totalPages ? 0.5 : 1,
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next &rarr;
      </button>
    </div>
  );
}

export default Pagination;
