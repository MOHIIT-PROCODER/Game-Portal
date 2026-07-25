import { dbQuery } from "../config/db.js";

export const ApiCache = {
  async get(key) {
    const sql = "SELECT value, expires_at FROM api_cache WHERE key = ?";
    try {
      const row = await dbQuery.get(sql, [key]);
      if (!row) return null;

      const now = Date.now();
      if (row.expires_at < now) {
        // Cache expired, delete asynchronously
        dbQuery
          .run("DELETE FROM api_cache WHERE key = ?", [key])
          .catch((err) => console.error("Error deleting expired cache:", err));
        return null;
      }

      return JSON.parse(row.value);
    } catch (err) {
      console.error("Error getting cache:", err);
      return null;
    }
  },

  async set(key, value, ttlSeconds = 3600) {
    const sql =
      "INSERT OR REPLACE INTO api_cache (key, value, expires_at) VALUES (?, ?, ?)";
    const expiresAt = Date.now() + ttlSeconds * 1000;
    try {
      const stringifiedValue = JSON.stringify(value);
      await dbQuery.run(sql, [key, stringifiedValue, expiresAt]);
      return true;
    } catch (err) {
      console.error("Error setting cache:", err);
      return false;
    }
  },

  async delete(key) {
    const sql = "DELETE FROM api_cache WHERE key = ?";
    try {
      await dbQuery.run(sql, [key]);
      return true;
    } catch (err) {
      console.error("Error deleting cache:", err);
      return false;
    }
  },

  async cleanup() {
    const sql = "DELETE FROM api_cache WHERE expires_at < ?";
    try {
      const now = Date.now();
      const result = await dbQuery.run(sql, [now]);
      return result.changes;
    } catch (err) {
      console.error("Error cleaning up cache:", err);
      return 0;
    }
  },

  async clearAll() {
    const sql = "DELETE FROM api_cache";
    try {
      await dbQuery.run(sql);
      return true;
    } catch (err) {
      console.error("Error clearing cache:", err);
      return false;
    }
  },
};
