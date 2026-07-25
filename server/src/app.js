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
app.use(cors());
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

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Fallback middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
