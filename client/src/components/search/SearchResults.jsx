import React from "react";
import GameGrid from "../games/GameGrid";

export function SearchResults({ results = [] }) {
  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
          fontSize: "14px",
          color: "var(--text-secondary)",
        }}
      >
        Found {results.length} game{results.length !== 1 ? "s" : ""} matching
        your search.
      </div>
      <GameGrid games={results} />
    </div>
  );
}

export default SearchResults;
