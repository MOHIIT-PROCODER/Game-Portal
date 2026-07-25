import express from "express";
import { GameCache } from "../models/GameCache.js";
import { env } from "../config/env.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res, next) => {
  try {
    const baseUrl = env.FRONTEND_URL || "http://localhost:5173";
    
    // Fetch all game slugs for dynamic pages
    const games = await GameCache.getAllSlugs();

    // Define static routes
    const staticRoutes = [
      "",
      "/games/popular",
      "/games/new",
      "/games/trending",
      "/games/recent",
      "/games/favorites",
      "/games/all",
      "/about",
      "/contact",
      "/privacy",
      "/terms",
    ];

    // Build the XML response
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static routes
    for (const route of staticRoutes) {
      sitemap += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === "" ? "1.0" : "0.8"}</priority>
  </url>`;
    }

    // Add dynamic game routes
    for (const game of games) {
      // Use game's created_at or default to current date
      const date = game.created_at ? new Date(game.created_at).toISOString() : new Date().toISOString();
      sitemap += `
  <url>
    <loc>${baseUrl}/game/${game.slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }

    sitemap += `\n</urlset>`;

    res.header("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (error) {
    next(error);
  }
});

export default router;
