import { dbQuery } from "../config/db.js";

export const GameCache = {
  async saveGames(games) {
    if (!games || games.length === 0) return;

    // Use a transaction for fast inserts
    await dbQuery.run("BEGIN TRANSACTION");

    try {
      const insertSql = `
        INSERT OR REPLACE INTO games (id, title, slug, description, instructions, category, tags, thumb, url, width, height, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const insertStatSql = `
        INSERT OR IGNORE INTO game_stats (game_id, play_count, like_count)
        VALUES (?, ?, ?)
      `;

      for (const game of games) {
        await dbQuery.run(insertSql, [
          game.id,
          game.title,
          game.slug,
          game.description || "",
          game.instructions || "",
          game.category || "Casual",
          game.tags || "",
          game.thumb || "",
          game.url,
          game.width || 800,
          game.height || 600,
          game.is_featured ? 1 : 0,
        ]);

        // Seed realistic random stats so trending / popular sorts have variety
        const seedPlays = Math.floor(Math.random() * 500) + 10;
        const seedLikes = Math.floor(Math.random() * 80) + 1;
        await dbQuery.run(insertStatSql, [game.id, seedPlays, seedLikes]);
      }

      await dbQuery.run("COMMIT");
      console.log(`Saved/Updated ${games.length} games in database cache.`);
    } catch (err) {
      await dbQuery.run("ROLLBACK");
      console.error("Error bulk saving games to DB:", err);
      throw err;
    }
  },

  async getAll({ category, search, limit = 20, offset = 0, sort = "newest" }) {
    let sql = `
      SELECT g.*, COALESCE(s.play_count, 0) as play_count, COALESCE(s.like_count, 0) as like_count
      FROM games g
      LEFT JOIN game_stats s ON g.id = s.game_id
      WHERE 1=1
    `;
    const params = [];

    if (category) {
      sql += " AND LOWER(g.category) = LOWER(?)";
      params.push(category);
    }

    if (search) {
      sql += " AND (g.title LIKE ? OR g.description LIKE ? OR g.tags LIKE ?)";
      const queryParam = `%${search}%`;
      params.push(queryParam, queryParam, queryParam);
    }

    // Sorting options
    if (sort === "popular") {
      sql += " ORDER BY s.play_count DESC, g.title ASC";
    } else if (sort === "likes") {
      sql += " ORDER BY s.like_count DESC, g.title ASC";
    } else if (sort === "featured") {
      sql += " ORDER BY g.is_featured DESC, g.created_at DESC";
    } else if (sort === "trending") {
      // Combined score logic (e.g. play_count + 5 * like_count)
      sql +=
        " ORDER BY (COALESCE(s.play_count, 0) + (COALESCE(s.like_count, 0) * 5)) DESC, g.created_at DESC";
    } else {
      // Default: newest
      sql += " ORDER BY g.created_at DESC, g.title ASC";
    }

    sql += " LIMIT ? OFFSET ?";
    params.push(parseInt(limit), parseInt(offset));

    return dbQuery.all(sql, params);
  },

  async getAllSlugs() {
    const sql = `
      SELECT slug, created_at 
      FROM games 
      ORDER BY created_at DESC
    `;
    return dbQuery.all(sql);
  },

  async count({ category, search }) {
    let sql = "SELECT COUNT(*) as total FROM games WHERE 1=1";
    const params = [];

    if (category) {
      sql += " AND LOWER(category) = LOWER(?)";
      params.push(category);
    }

    if (search) {
      sql += " AND (title LIKE ? OR description LIKE ? OR tags LIKE ?)";
      const queryParam = `%${search}%`;
      params.push(queryParam, queryParam, queryParam);
    }

    const row = await dbQuery.get(sql, params);
    return row ? row.total : 0;
  },

  async getById(id) {
    const sql = `
      SELECT g.*, COALESCE(s.play_count, 0) as play_count, COALESCE(s.like_count, 0) as like_count
      FROM games g
      LEFT JOIN game_stats s ON g.id = s.game_id
      WHERE g.id = ?
    `;
    return dbQuery.get(sql, [id]);
  },

  async getBySlug(slug) {
    const sql = `
      SELECT g.*, COALESCE(s.play_count, 0) as play_count, COALESCE(s.like_count, 0) as like_count
      FROM games g
      LEFT JOIN game_stats s ON g.id = s.game_id
      WHERE g.slug = ?
    `;
    return dbQuery.get(sql, [slug]);
  },

  async getFeatured(limit = 6) {
    const sql = `
      SELECT g.*, COALESCE(s.play_count, 0) as play_count, COALESCE(s.like_count, 0) as like_count
      FROM games g
      LEFT JOIN game_stats s ON g.id = s.game_id
      WHERE g.is_featured = 1
      ORDER BY g.created_at DESC
      LIMIT ?
    `;
    return dbQuery.all(sql, [parseInt(limit)]);
  },

  async getCategories() {
    const sql = `
      SELECT category, COUNT(*) as count 
      FROM games 
      WHERE category IS NOT NULL AND category != ''
      GROUP BY category 
      ORDER BY count DESC
    `;
    return dbQuery.all(sql);
  },
};
