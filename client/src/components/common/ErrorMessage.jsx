import React from "react";

export function ErrorMessage({
  message = "An unexpected error occurred. Please try again.",
  onRetry,
}) {
  return (
    <div className="error-message">
      <p style={{ marginBottom: onRetry ? "12px" : "0" }}>⚠️ {message}</p>
      {onRetry && (
        <button
          className="toolbar-btn"
          onClick={onRetry}
          style={{
            display: "inline-block",
            margin: "0 auto",
            padding: "6px 16px",
            fontSize: "12px",
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
