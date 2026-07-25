import { gameService } from "../services/gameService.js";
import { recommendationService } from "../services/recommendationService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const gameController = {
  // GET /api/games
  getGames: asyncHandler(async (req, res) => {
    const {
      category,
      search,
      limit = 24,
      offset = 0,
      sort = "newest",
    } = req.query;

    const result = await gameService.getGames({
      category: category ? decodeURIComponent(category) : undefined,
      search: search ? decodeURIComponent(search) : undefined,
      limit: Math.min(100, parseInt(limit)), // Cap limit to 100 for safety
      offset: parseInt(offset),
      sort,
    });

    res.json(result);
  }),

  // GET /api/games/featured
  getFeaturedGames: asyncHandler(async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const featured = await gameService.getFeaturedGames(limit);

    res.json({
      success: true,
      games: featured,
    });
  }),

  // GET /api/games/slug/:slug
  getGameBySlug: asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const game = await gameService.getGameBySlug(slug);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: `Game not found with slug: ${slug}`,
      });
    }

    res.json({
      success: true,
      game,
    });
  }),

  // GET /api/games/:id/related
  getRelatedGames: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    const games = await recommendationService.getRelatedGames(id, limit);

    res.json({
      success: true,
      games,
    });
  }),

  // POST /api/games/recommendations
  getPersonalizedRecommendations: asyncHandler(async (req, res) => {
    const { favoriteIds = [], recentIds = [], limit = 6 } = req.body;
    const games = await recommendationService.getPersonalizedRecommendations(
      favoriteIds,
      recentIds,
      limit,
    );

    res.json({
      success: true,
      games,
    });
  }),
};
