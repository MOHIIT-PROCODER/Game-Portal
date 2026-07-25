import { ApiCache } from "../models/ApiCache.js";

export const cacheService = {
  async get(key) {
    return ApiCache.get(key);
  },

  async set(key, value, ttlSeconds = 3600) {
    return ApiCache.set(key, value, ttlSeconds);
  },

  async delete(key) {
    return ApiCache.delete(key);
  },

  async cleanup() {
    return ApiCache.cleanup();
  },

  async clearAll() {
    return ApiCache.clearAll();
  },
};
