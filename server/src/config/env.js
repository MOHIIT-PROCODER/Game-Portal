import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env relative to server root
dotenv.config({ path: path.join(__dirname, "../../.env") });

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL: process.env.DATABASE_URL || "./db.sqlite",
  GAME_FEED_URL:
    process.env.GAME_FEED_URL ||
    "https://feed.gamemonetize.com/rssfeed/?format=json",
};
