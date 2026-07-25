import React from "react";
import SectionHeader from "../common/SectionHeader";
import GameRow from "../games/GameRow";
import { ROUTES } from "../../utils/constants";

export function NewGames({ games = [] }) {
  if (games.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <SectionHeader title="✨ New Games" linkTo={ROUTES.NEW} />
      <GameRow games={games} />
    </div>
  );
}

export default NewGames;
