import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import SearchSuggestions from "./SearchSuggestions";

export function SearchBar() {
  const navigate = useNavigate();
  const searchContainerRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { query, setQuery, suggestions, suggestionsLoading, clearSearch } =
    useSearch();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setDropdownVisible(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      setDropdownVisible(false);
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    clearSearch();
    setDropdownVisible(false);
  };

  return (
    <div className="header-center" ref={searchContainerRef}>
      <div className="search-bar-wrapper">
        {/* SVG search icon inline */}
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
          placeholder="Search games, categories, tags..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setDropdownVisible(true)}
        />

        {query && (
          <button className="clear-search-btn" onClick={handleClear}>
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

      {dropdownVisible && query.trim().length >= 2 && (
        <SearchSuggestions
          suggestions={suggestions}
          loading={suggestionsLoading}
          onSelectSuggestion={() => setDropdownVisible(false)}
        />
      )}
    </div>
  );
}

export default SearchBar;
