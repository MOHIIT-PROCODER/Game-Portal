import React from "react";
import { useNavigate } from "react-router-dom";

export function SearchSuggestions({
  suggestions = [],
  loading = false,
  onSelectSuggestion,
}) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div
        className="search-suggestions-dropdown"
        style={{
          padding: "16px",
          textAlign: "center",
          color: "var(--text-muted)",
        }}
      >
        Loading suggestions...
      </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  const handleItemClick = (slug) => {
    navigate(`/game/${slug}`);
    if (onSelectSuggestion) {
      onSelectSuggestion();
    }
  };

  return (
    <div className="search-suggestions-dropdown">
      {suggestions.map((game) => (
        <div
          key={game.id}
          className="suggestion-item"
          onClick={() => handleItemClick(game.slug)}
        >
          {game.thumb && (
            <img
              src={game.thumb}
              alt={game.title}
              className="suggestion-thumb"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
          <div className="suggestion-info">
            <span className="suggestion-title">{game.title}</span>
            <span className="suggestion-category">{game.category}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchSuggestions;
