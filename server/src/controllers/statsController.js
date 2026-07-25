import { GameStats } from "../models/GameStats.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const statsController = {
  // POST /api/stats/play/:gameId
  incrementPlayCount: asyncHandler(async (req, res) => {
    const { gameId } = req.params;
    await GameStats.incrementPlayCount(gameId);

    const stats = await GameStats.getStats(gameId);

    res.json({
      success: true,
      message: "Play count updated successfully",
      stats,
    });
  }),

  // POST /api/stats/like/:gameId
  incrementLikeCount: asyncHandler(async (req, res) => {
    const { gameId } = req.params;
    const { isLike = true } = req.body;

    await GameStats.incrementLikeCount(gameId, isLike);
    const stats = await GameStats.getStats(gameId);

    res.json({
      success: true,
      message: isLike ? "Game liked" : "Game disliked",
      stats,
    });
  }),

  // GET /api/stats/:gameId
  getStats: asyncHandler(async (req, res) => {
    const { gameId } = req.params;
    const stats = await GameStats.getStats(gameId);

    res.json({
      success: true,
      stats,
    });
  }),
};
