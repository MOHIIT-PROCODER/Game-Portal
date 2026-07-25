import api from "./api";

export const gameService = {
  async getGames({
    category,
    search,
    limit = 24,
    offset = 0,
    sort = "newest",
  }) {
    let queryParams = `?limit=${limit}&offset=${offset}&sort=${sort}`;
    if (category) queryParams += `&category=${encodeURIComponent(category)}`;
    if (search) queryParams += `&search=${encodeURIComponent(search)}`;

    return api.get(`/games${queryParams}`);
  },

  async getGameBySlug(slug) {
    return api.get(`/games/slug/${encodeURIComponent(slug)}`);
  },

  async getFeaturedGames(limit = 6) {
    return api.get(`/games/featured?limit=${limit}`);
  },

  async getRelatedGames(id, limit = 6) {
    return api.get(`/games/${id}/related?limit=${limit}`);
  },

  async getRecommendations(favoriteIds = [], recentIds = [], limit = 6) {
    return api.post("/games/recommendations", {
      favoriteIds,
      recentIds,
      limit,
    });
  },

  async incrementPlay(id) {
    return api.post(`/stats/play/${id}`);
  },

  async toggleLike(id, isLike) {
    return api.post(`/stats/like/${id}`, { isLike });
  },

  async getStats(id) {
    return api.get(`/stats/${id}`);
  },
};

export default gameService;
