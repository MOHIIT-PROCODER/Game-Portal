export const storage = {
  get(key, defaultValue = null) {
    try {
      const value = window.localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (e) {
      console.warn("Error reading from localStorage:", e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn("Error writing to localStorage:", e);
      return false;
    }
  },

  remove(key) {
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.warn("Error removing from localStorage:", e);
      return false;
    }
  },
};
export default storage;
