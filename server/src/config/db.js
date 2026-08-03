import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import { env } from "./env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the db path is resolved relative to server directory if it's a relative path
const dbPath = path.isAbsolute(env.DATABASE_URL)
  ? env.DATABASE_URL
  : path.resolve(__dirname, "../../", env.DATABASE_URL);

console.log(`Connecting to SQLite database at: ${dbPath}`);

const db = new (sqlite3.verbose().Database)(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Database connected successfully.");
    initializeDatabase();
  }
});

// Helper wrapper functions using Promises
export const dbQuery = {
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  },
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },
};

function initializeDatabase() {
  db.serialize(() => {
    // 1. Create games table
    db.run(
      `
      CREATE TABLE IF NOT EXISTS games (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        instructions TEXT,
        category TEXT,
        tags TEXT,
        thumb TEXT,
        url TEXT NOT NULL,
        width INTEGER DEFAULT 800,
        height INTEGER DEFAULT 600,
        is_featured INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `,
      (err) => {
        if (err) console.error("Error creating games table:", err.message);
      },
    );

    // 2. Create game_stats table
    db.run(
      `
      CREATE TABLE IF NOT EXISTS game_stats (
        game_id TEXT PRIMARY KEY,
        play_count INTEGER DEFAULT 0,
        like_count INTEGER DEFAULT 0,
        FOREIGN KEY (game_id) REFERENCES games (id) ON DELETE CASCADE
      )
    `,
      (err) => {
        if (err) console.error("Error creating game_stats table:", err.message);
      },
    );

    // 3. Create api_cache table
    db.run(
      `
      CREATE TABLE IF NOT EXISTS api_cache (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        expires_at INTEGER NOT NULL
      )
    `,
      (err) => {
        if (err) console.error("Error creating api_cache table:", err.message);
      },
    );

    // 4. Create push_subscriptions table (Web Push / PWA)
    db.run(
      `
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        endpoint TEXT UNIQUE NOT NULL,
        p256dh TEXT NOT NULL,
        auth TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `,
      (err) => {
        if (err)
          console.error(
            "Error creating push_subscriptions table:",
            err.message,
          );
      },
    );

    console.log("Database tables initialized.");
  });
}

export default db;
