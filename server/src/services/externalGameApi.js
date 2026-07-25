import axios from "axios";
import { env } from "../config/env.js";
import { mapRawGamesList } from "../utils/gameMapper.js";
import { CUSTOM_GAMES } from "./customGamesCatalog.js";

const GAMEPIX_BASE = "https://games.gamepix.com/games";
const GP_SID = "1";
const GP_BATCH = 250;
const GP_BATCHES = 4; // Fetch up to 1000 games in parallel batches
const GP_EXTRA_CATEGORIES = [
  "strategy",
  "puzzle",
  "sports",
  "arcade",
  "adventure",
  "board",
  "classics",
  "junior",
];

export const externalGameApi = {
  async fetchGamesFromFeed() {
    let apiGames = [];
    let gamePixSuccess = false;

    // 1. Try GamePix API with multi-batch and category queries in parallel
    try {
      console.log("Trying GamePix API (multi-batch + categories)...");

      const requests = [];

      // Add batch offsets
      for (let i = 0; i < GP_BATCHES; i++) {
        const offset = i * GP_BATCH;
        requests.push(
          axios.get(GAMEPIX_BASE, {
            params: { sid: GP_SID, order: "q", limit: GP_BATCH, offset },
            timeout: 8000,
            headers: {
              Accept: "application/json",
              "User-Agent": "GamePortal/1.0",
            },
          }),
        );
      }

      // Add extra categories
      for (const cat of GP_EXTRA_CATEGORIES) {
        requests.push(
          axios.get(GAMEPIX_BASE, {
            params: { sid: GP_SID, order: "q", limit: 100, category: cat },
            timeout: 8000,
            headers: {
              Accept: "application/json",
              "User-Agent": "GamePortal/1.0",
            },
          }),
        );
      }

      const settled = await Promise.allSettled(requests);

      settled.forEach((r, idx) => {
        if (r.status === "fulfilled" && r.value.data && r.value.data.data) {
          apiGames = apiGames.concat(r.value.data.data);
          gamePixSuccess = true;
        }
      });

      if (gamePixSuccess && apiGames.length > 0) {
        console.log(`✅ GamePix: Fetched ${apiGames.length} raw games.`);
      }
    } catch (err) {
      console.warn(`❌ GamePix fetch error: ${err.message}`);
    }

    // 2. Try FreeToGame API as fallback/supplement
    try {
      console.log("Trying FreeToGame API...");
      const response = await axios.get(
        "https://www.freetogame.com/api/games?platform=browser",
        {
          timeout: 8000,
          headers: {
            Accept: "application/json",
            "User-Agent": "GamePortal/1.0",
          },
        },
      );
      if (response.data && Array.isArray(response.data)) {
        const freeToGames = response.data.map((g) => ({
          id: String(g.id),
          title: g.title,
          description: g.short_description || "",
          category: g.genre || "Casual",
          categories: [g.genre || "Casual"],
          thumbnailUrl: g.thumbnail,
          url: g.game_url,
          featured: false,
          rkScore: 0.5,
        }));
        apiGames = apiGames.concat(freeToGames);
        console.log(`✅ FreeToGame: Added ${freeToGames.length} games.`);
      }
    } catch (err) {
      console.warn(`❌ FreeToGame failed: ${err.message}`);
    }

    // Deduplicate by ID
    const seen = new Set();
    const uniqueRawGames = [];
    apiGames.forEach((g) => {
      if (!g || !g.id) return;
      const idStr = String(g.id);
      if (!seen.has(idStr)) {
        seen.add(idStr);
        uniqueRawGames.push(g);
      }
    });

    // Map raw list to standardized schema
    const mapped = mapRawGamesList(uniqueRawGames);

    // 3. Always merge custom games catalog into DB cache (ensuring offline availability)
    const existingIds = new Set(mapped.map((g) => g.id));
    const customMapped = mapRawGamesList(CUSTOM_GAMES);

    let mergeCount = 0;
    for (const customGame of customMapped) {
      if (!existingIds.has(customGame.id)) {
        mapped.unshift(customGame);
        mergeCount++;
      }
    }

    console.log(
      `✅ Synced catalog: ${mapped.length} games (including ${mergeCount} custom offline/fallback games).`,
    );
    return mapped;
  },
};
