import { GameCache } from "../models/GameCache.js";
import { externalGameApi } from "./externalGameApi.js";
import { cacheService } from "./cacheService.js";

export const gameService = {
  async syncDatabaseWithFeed() {
    console.log("Initiating database sync with external game feed...");
    try {
      const games = await externalGameApi.fetchGamesFromFeed();
      if (games && games.length > 0) {
        await GameCache.saveGames(games);
        await cacheService.clearAll();
        console.log("Database sync complete. API Cache cleared.");
      } else {
        console.warn("Sync returned no games.");
      }
    } catch (err) {
      console.error("Error syncing database with external feed:", err);
    }
  },

  async getGames({ category, search, limit, offset, sort }) {
    const games = await GameCache.getAll({
      category,
      search,
      limit,
      offset,
      sort,
    });
    const total = await GameCache.count({ category, search });

    return {
      games,
      pagination: {
        total,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: offset + limit < total,
      },
    };
  },

  async getGameBySlug(slug) {
    return GameCache.getBySlug(slug);
  },

  async getGameById(id) {
    return GameCache.getById(id);
  },

  async getFeaturedGames(limit) {
    return GameCache.getFeatured(limit);
  },

  async getCategories() {
    return GameCache.getCategories();
  },
};
