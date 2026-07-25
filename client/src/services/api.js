const PROD_URL = "https://game-portal-server.onrender.com/api";
const DEV_URL = "http://localhost:5000/api";
const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? PROD_URL : DEV_URL);

export const api = {
  async get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(
        `API GET request failed on: ${endpoint}. Status: ${response.status}`,
      );
    }
    return response.json();
  },

  async post(endpoint, bodyData = {}) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error(
        `API POST request failed on: ${endpoint}. Status: ${response.status}`,
      );
    }
    return response.json();
  },
};

export default api;
