import express from "express";
import cors from "cors";
import { rateLimitMiddleware } from "./middleware/rateLimitMiddleware.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { notFoundMiddleware } from "./middleware/notFoundMiddleware.js";

import gameRoutes from "./routes/gameRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";
import sitemapRoutes from "./routes/sitemapRoutes.js";

const app = express();

// Standard middlewares
const allowedOrigins = [
  "https://game-portal-client.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error("CORS policy violation"), false);
    }
    return callback(null, true);
  }
}));
app.use(express.json());

// API rate limiter
app.use("/api/", rateLimitMiddleware);

// API Route Mounts
app.use("/api/games", gameRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/stats", statsRoutes);

// Root level routes (sitemap)
app.use("/", sitemapRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Game Portal API is running! Visit the client URL to use the app.");
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Fallback middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
