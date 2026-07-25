import { gameService } from "../services/gameService.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const categoryController = {
  // GET /api/categories
  getCategories: asyncHandler(async (req, res) => {
    const categories = await gameService.getCategories();

    res.json({
      success: true,
      categories,
    });
  }),
};
