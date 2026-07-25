import { searchService } from "../services/searchService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const searchController = {
  // GET /api/search
  searchGames: asyncHandler(async (req, res) => {
    const { q, limit = 24, offset = 0 } = req.query;

    if (!q || q.trim() === "") {
      return res.json({
        games: [],
        pagination: {
          total: 0,
          limit: parseInt(limit),
          offset: parseInt(offset),
          hasMore: false,
        },
      });
    }

    const result = await searchService.searchGames(
      decodeURIComponent(q),
      parseInt(limit),
      parseInt(offset),
    );

    res.json(result);
  }),

  // GET /api/search/suggestions
  getSuggestions: asyncHandler(async (req, res) => {
    const { q, limit = 6 } = req.query;

    if (!q || q.trim() === "") {
      return res.json({
        success: true,
        suggestions: [],
      });
    }

    const suggestions = await searchService.getSuggestions(
      decodeURIComponent(q),
      parseInt(limit),
    );

    res.json({
      success: true,
      suggestions,
    });
  }),
};
