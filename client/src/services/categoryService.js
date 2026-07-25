import api from "./api";

export const categoryService = {
  async getCategories() {
    return api.get("/categories");
  },
};

export default categoryService;
