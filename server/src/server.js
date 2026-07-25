// GamePix Integration Active - Race Condition Resolved
import app from "./app.js";
import { env } from "./config/env.js";
import { gameService } from "./services/gameService.js";
import db from "./config/db.js";

const PORT = env.PORT;

const server = app.listen(PORT, async () => {
  console.log(`Server is running in ${env.NODE_ENV} mode on port ${PORT}`);

  // Sync the database with the external games feed on startup
  try {
    await gameService.syncDatabaseWithFeed();
  } catch (error) {
    console.error(
      "Failed to sync games feed during server startup:",
      error.message,
    );
  }
});

// Gracefully handle port conflicts instead of crashing into a loop
server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `\n❌ Port ${PORT} is already in use.\n   Please kill the existing process and try again.\n   Run: npx kill-port ${PORT}\n`,
    );
    process.exit(1);
  } else {
    throw err;
  }
});

// Handle graceful shutdown
const gracefulShutdown = () => {
  console.log("Shutting down server gracefully...");
  server.close(() => {
    console.log("Http server closed.");
    db.close((err) => {
      if (err) {
        console.error("Error closing SQLite database:", err.message);
      } else {
        console.log("Database connection closed.");
      }
      process.exit(0);
    });
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
