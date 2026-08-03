import db from "../config/db.js";

/**
 * Initialize the push_subscriptions table if it doesn't exist.
 * Called once at startup.
 */
export const createTable = () => {
  return new Promise((resolve, reject) => {
    db.run(
      `CREATE TABLE IF NOT EXISTS push_subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        endpoint TEXT UNIQUE NOT NULL,
        p256dh TEXT NOT NULL,
        auth TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) reject(err);
        else resolve();
      },
    );
  });
};

/**
 * Insert or update a push subscription.
 */
export const upsert = (subscription) => {
  const { endpoint, keys } = subscription;
  const { p256dh, auth } = keys;
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO push_subscriptions (endpoint, p256dh, auth)
       VALUES (?, ?, ?)
       ON CONFLICT(endpoint) DO UPDATE SET p256dh = excluded.p256dh, auth = excluded.auth`,
      [endpoint, p256dh, auth],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      },
    );
  });
};

/**
 * Delete a push subscription by endpoint.
 */
export const remove = (endpoint) => {
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM push_subscriptions WHERE endpoint = ?`,
      [endpoint],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      },
    );
  });
};

/**
 * Get all stored push subscriptions.
 */
export const getAll = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM push_subscriptions`, [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
