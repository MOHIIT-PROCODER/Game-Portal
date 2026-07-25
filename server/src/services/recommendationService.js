import { dbQuery } from "../config/db.js";
import { GameCache } from "../models/GameCache.js";

export const recommendationService = {
  async getRelatedGames(gameId, limit = 6) {
    const game = await GameCache.getById(gameId);
    if (!game) {
      // Fallback: return featured games
      return GameCache.getFeatured(limit);
    }

    const category = game.category;

    // Attempt to match games in the same category, excluding itself, sorted by play count / likes
    const sql = `
      SELECT g.*, COALESCE(s.play_count, 0) as play_count, COALESCE(s.like_count, 0) as like_count
      FROM games g
      LEFT JOIN game_stats s ON g.id = s.game_id
      WHERE g.id != ? AND LOWER(g.category) = LOWER(?)
      ORDER BY s.play_count DESC, s.like_count DESC, g.created_at DESC
      LIMIT ?
    `;

    let related = await dbQuery.all(sql, [gameId, category, parseInt(limit)]);

    // If we don't have enough related games in the same category, fill it up with featured/popular games
    if (related.length < limit) {
      const needed = limit - related.length;
      const excludeIds = [gameId, ...related.map((r) => r.id)];
      const placeHolders = excludeIds.map(() => "?").join(",");

      const fillSql = `
        SELECT g.*, COALESCE(s.play_count, 0) as play_count, COALESCE(s.like_count, 0) as like_count
        FROM games g
        LEFT JOIN game_stats s ON g.id = s.game_id
        WHERE g.id NOT IN (${placeHolders})
        ORDER BY g.is_featured DESC, s.play_count DESC
        LIMIT ?
      `;

      const fallbackGames = await dbQuery.all(fillSql, [...excludeIds, needed]);
      related = [...related, ...fallbackGames];
    }

    return related;
  },

  async getPersonalizedRecommendations(
    favoriteIds = [],
    recentIds = [],
    limit = 6,
  ) {
    // If no history, return featured/popular games
    if (favoriteIds.length === 0 && recentIds.length === 0) {
      const sql = `
        SELECT g.*, COALESCE(s.play_count, 0) as play_count, COALESCE(s.like_count, 0) as like_count
        FROM games g
        LEFT JOIN game_stats s ON g.id = s.game_id
        ORDER BY (COALESCE(s.play_count, 0) + COALESCE(s.like_count, 0) * 4) DESC
        LIMIT ?
      `;
      return dbQuery.all(sql, [parseInt(limit)]);
    }

    // Get categories of recent and favorite games
    const allIds = [...new Set([...favoriteIds, ...recentIds])];
    if (allIds.length === 0) return GameCache.getFeatured(limit);

    const placeholders = allIds.map(() => "?").join(",");

    // Find dominant categories
    const categorySql = `
      SELECT category, COUNT(*) as count 
      FROM games 
      WHERE id IN (${placeholders})
      GROUP BY category
      ORDER BY count DESC
    `;

    try {
      const categoriesRow = await dbQuery.all(categorySql, allIds);
      const userCategories = categoriesRow.map((c) => c.category);

      let gamesSql = `
        SELECT g.*, COALESCE(s.play_count, 0) as play_count, COALESCE(s.like_count, 0) as like_count
        FROM games g
        LEFT JOIN game_stats s ON g.id = s.game_id
        WHERE g.id NOT IN (${placeholders})
      `;

      const params = [...allIds];

      if (userCategories.length > 0) {
        const catPlaceholders = userCategories.map(() => "?").join(",");
        gamesSql += ` AND g.category IN (${catPlaceholders})`;
        params.push(...userCategories);
      }

      gamesSql += `
        ORDER BY s.play_count DESC, g.created_at DESC
        LIMIT ?
      `;
      params.push(parseInt(limit));

      let recommendations = await dbQuery.all(gamesSql, params);

      // If we don't have enough, fill with featured
      if (recommendations.length < limit) {
        const needed = limit - recommendations.length;
        const currentExclude = [...allIds, ...recommendations.map((r) => r.id)];
        const fillPlaceholders = currentExclude.map(() => "?").join(",");

        const fillSql = `
          SELECT g.*, COALESCE(s.play_count, 0) as play_count, COALESCE(s.like_count, 0) as like_count
          FROM games g
          LEFT JOIN game_stats s ON g.id = s.game_id
          WHERE g.id NOT IN (${fillPlaceholders})
          ORDER BY g.is_featured DESC, s.play_count DESC
          LIMIT ?
        `;
        const fill = await dbQuery.all(fillSql, [...currentExclude, needed]);
        recommendations = [...recommendations, ...fill];
      }

      return recommendations;
    } catch (e) {
      console.error("Personalized recommendation error:", e);
      return GameCache.getFeatured(limit);
    }
  },
};
