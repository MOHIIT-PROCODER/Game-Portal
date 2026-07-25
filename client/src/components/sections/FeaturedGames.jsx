import React from "react";
import FeaturedGameCard from "../games/FeaturedGameCard";

export function FeaturedGames({ games = [] }) {
  if (games.length === 0) return null;

  // Display the first game in the featured feed list as the hero banner
  const heroGame = games[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <FeaturedGameCard game={heroGame} />
    </div>
  );
}

export default FeaturedGames;
