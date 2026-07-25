import { dbQuery } from "../config/db.js";

export const searchService = {
  async searchGames(query, limit = 20, offset = 0) {
    const formattedQuery = `%${query}%`;
    const sql = `
      SELECT g.*, COALESCE(s.play_count, 0) as play_count, COALESCE(s.like_count, 0) as like_count
      FROM games g
      LEFT JOIN game_stats s ON g.id = s.game_id
      WHERE g.title LIKE ? OR g.description LIKE ? OR g.tags LIKE ? OR g.category LIKE ?
      ORDER BY (COALESCE(s.play_count, 0) + (COALESCE(s.like_count, 0) * 3)) DESC
      LIMIT ? OFFSET ?
    `;
    const countSql = `
      SELECT COUNT(*) as total 
      FROM games
      WHERE title LIKE ? OR description LIKE ? OR tags LIKE ? OR category LIKE ?
    `;

    const games = await dbQuery.all(sql, [
      formattedQuery,
      formattedQuery,
      formattedQuery,
      formattedQuery,
      parseInt(limit),
      parseInt(offset),
    ]);
    const countRow = await dbQuery.get(countSql, [
      formattedQuery,
      formattedQuery,
      formattedQuery,
      formattedQuery,
    ]);
    const total = countRow ? countRow.total : 0;

    return {
      games,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    };
  },

  async getSuggestions(query, limit = 5) {
    if (!query || query.trim() === "") return [];

    const formattedQuery = `%${query}%`;
    const sql = `
      SELECT id, title, slug, category, thumb
      FROM games
      WHERE title LIKE ? OR category LIKE ? OR tags LIKE ?
      ORDER BY title ASC
      LIMIT ?
    `;
    return dbQuery.all(sql, [
      formattedQuery,
      formattedQuery,
      formattedQuery,
      parseInt(limit),
    ]);
  },
};
