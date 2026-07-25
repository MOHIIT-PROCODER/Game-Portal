import React from "react";
import GameTitle from "./GameTitle";
import GameDescription from "./GameDescription";
import GameInstructions from "./GameInstructions";
import GameTags from "./GameTags";
import GameDetails from "./GameDetails";

export function GameInfo({ game }) {
  if (!game) return null;

  return (
    <div className="bg-surface rounded-sm p-6 md:p-8 flex flex-col gap-6">
      <GameTitle title={game.title} category={game.category} />
      <GameDescription description={game.description} />
      <GameInstructions instructions={game.instructions} />
      <GameTags tags={game.tags} />
      <GameDetails game={game} />
    </div>
  );
}

export default GameInfo;
