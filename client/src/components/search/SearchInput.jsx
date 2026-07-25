import React, { useState, useEffect } from "react";

export function SearchInput({ initialValue = "", onSearch }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}
    >
      <div className="search-bar-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="search-icon"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search for games..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="play-button"
          style={{
            padding: "0 16px",
            height: "32px",
            borderRadius: "var(--radius-full)",
            fontSize: "13px",
          }}
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchInput;
