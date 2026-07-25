import React from "react";
import SectionHeader from "../common/SectionHeader";
import GameGrid from "../games/GameGrid";

export function RecommendedSection({ games = [] }) {
  if (games.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <SectionHeader title="🔮 Recommended For You" />
      <GameGrid games={games} />
    </div>
  );
}

export default RecommendedSection;
