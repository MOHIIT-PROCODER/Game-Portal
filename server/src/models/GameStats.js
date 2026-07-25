import { dbQuery } from "../config/db.js";

export const GameStats = {
  async incrementPlayCount(gameId) {
    const checkSql = "SELECT game_id FROM game_stats WHERE game_id = ?";
    const row = await dbQuery.get(checkSql, [gameId]);

    if (row) {
      const updateSql =
        "UPDATE game_stats SET play_count = play_count + 1 WHERE game_id = ?";
      return dbQuery.run(updateSql, [gameId]);
    } else {
      const insertSql =
        "INSERT INTO game_stats (game_id, play_count, like_count) VALUES (?, 1, 0)";
      return dbQuery.run(insertSql, [gameId]);
    }
  },

  async incrementLikeCount(gameId, isLike = true) {
    const value = isLike ? 1 : -1;
    const checkSql = "SELECT game_id FROM game_stats WHERE game_id = ?";
    const row = await dbQuery.get(checkSql, [gameId]);

    if (row) {
      const updateSql =
        "UPDATE game_stats SET like_count = MAX(0, like_count + ?) WHERE game_id = ?";
      return dbQuery.run(updateSql, [value, gameId]);
    } else {
      const insertSql =
        "INSERT INTO game_stats (game_id, play_count, like_count) VALUES (?, 0, ?)";
      return dbQuery.run(insertSql, [gameId, Math.max(0, value)]);
    }
  },

  async getStats(gameId) {
    const sql =
      "SELECT play_count, like_count FROM game_stats WHERE game_id = ?";
    const row = await dbQuery.get(sql, [gameId]);
    return row || { play_count: 0, like_count: 0 };
  },

  async getPopular(limit = 10) {
    const sql = `
      SELECT g.*, COALESCE(s.play_count, 0) as play_count, COALESCE(s.like_count, 0) as like_count
      FROM games g
      JOIN game_stats s ON g.id = s.game_id
      ORDER BY s.play_count DESC
      LIMIT ?
    `;
    return dbQuery.all(sql, [parseInt(limit)]);
  },
};
