import express from "express";
import { statsController } from "../controllers/statsController.js";

const router = express.Router();

// Increments the views/play count of a game
router.post("/play/:gameId", statsController.incrementPlayCount);

// Likes or dislikes a game (requires body: { isLike: boolean })
router.post("/like/:gameId", statsController.incrementLikeCount);

// Returns statistics for a specific game
router.get("/:gameId", statsController.getStats);

export default router;
