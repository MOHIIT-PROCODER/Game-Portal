import api from "./api";

export const searchService = {
  async searchGames(query, limit = 24, offset = 0) {
    return api.get(
      `/search?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`,
    );
  },

  async getSuggestions(query, limit = 6) {
    return api.get(
      `/search/suggestions?q=${encodeURIComponent(query)}&limit=${limit}`,
    );
  },
};

export default searchService;
