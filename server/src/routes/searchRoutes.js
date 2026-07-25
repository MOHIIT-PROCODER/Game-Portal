import express from "express";
import { searchController } from "../controllers/searchController.js";
import { cacheMiddleware } from "../middleware/cacheMiddleware.js";

const router = express.Router();

// Cache search queries for 1 minute
router.get("/", cacheMiddleware(60), searchController.searchGames);

// Cache auto-complete suggestions for 2 minutes
router.get(
  "/suggestions",
  cacheMiddleware(120),
  searchController.getSuggestions,
);

export default router;
