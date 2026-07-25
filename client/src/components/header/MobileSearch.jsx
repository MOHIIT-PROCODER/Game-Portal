import React from "react";
import { useNavigate } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import SearchSuggestions from "./SearchSuggestions";

export function MobileSearch({ onClose }) {
  const navigate = useNavigate();
  const { query, setQuery, suggestions, suggestionsLoading, clearSearch } =
    useSearch();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      onClose();
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionSelect = () => {
    onClose();
  };

  return (
    <div className="mobile-search-overlay">
      <div className="mobile-search-header">
        <div className="mobile-search-input-wrapper">
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
            className="mobile-search-input"
            placeholder="Search games..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {query && (
            <button className="clear-search-btn" onClick={clearSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "12px", height: "12px" }}
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <button className="close-search-overlay-btn" onClick={onClose}>
          Cancel
        </button>
      </div>

      {query.trim().length >= 2 && (
        <div style={{ position: "relative", width: "100%", marginTop: "10px" }}>
          <SearchSuggestions
            suggestions={suggestions}
            loading={suggestionsLoading}
            onSelectSuggestion={handleSuggestionSelect}
          />
        </div>
      )}
    </div>
  );
}

export default MobileSearch;
