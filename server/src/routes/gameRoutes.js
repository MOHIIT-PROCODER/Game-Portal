import express from "express";
import { gameController } from "../controllers/gameController.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";

const router = express.Router();

// Apply a 5-minute cache to catalog listings
router.get("/", cacheMiddleware(300), gameController.getGames);

// Apply a 5-minute cache to featured games list
router.get("/featured", cacheMiddleware(300), gameController.getFeaturedGames);

// Apply a 10-minute cache to individual game details by slug
router.get("/slug/:slug", cacheMiddleware(600), gameController.getGameBySlug);

// Apply a 10-minute cache to related games matching this ID
router.get(
  "/:id/related",
  cacheMiddleware(600),
  gameController.getRelatedGames,
);

// POST requests are not cached
router.post("/recommendations", gameController.getPersonalizedRecommendations);

export default router;
