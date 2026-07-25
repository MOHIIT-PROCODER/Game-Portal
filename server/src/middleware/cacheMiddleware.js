import { cacheService } from "../services/cacheService.js";

export const cacheMiddleware = (ttlSeconds = 300) => {
  return async (req, res, next) => {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next();
    }

    const key = `api_route:${req.originalUrl || req.url}`;

    try {
      const cachedResponse = await cacheService.get(key);
      if (cachedResponse) {
        // Return cached JSON content
        res.setHeader("X-Cache", "HIT");
        return res.json(cachedResponse);
      }

      // Intercept res.json to capture response body
      const originalJson = res.json;
      res.json = function (body) {
        // Only cache successful JSON payloads
        if (res.statusCode >= 200 && res.statusCode < 300) {
          cacheService
            .set(key, body, ttlSeconds)
            .catch((err) =>
              console.error(`Failed to write cache for key: ${key}`, err),
            );
        }
        res.json = originalJson;
        return res.json(body);
      };

      res.setHeader("X-Cache", "MISS");
      next();
    } catch (err) {
      console.error("Cache middleware error:", err);
      next();
    }
  };
};
