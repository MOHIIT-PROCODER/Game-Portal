import React from "react";
import SectionHeader from "../common/SectionHeader";
import GameRow from "../games/GameRow";
import { ROUTES } from "../../utils/constants";

export function PopularGames({ games = [] }) {
  if (games.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <SectionHeader title="🔥 Popular Games" linkTo={ROUTES.POPULAR} />
      <GameRow games={games} />
    </div>
  );
}

export default PopularGames;
