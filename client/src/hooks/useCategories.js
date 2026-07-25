import { useState, useEffect } from "react";
import categoryService from "../services/categoryService";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCategories() {
      try {
        setLoading(true);
        const response = await categoryService.getCategories();
        if (isMounted) {
          setCategories(response.categories || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error in useCategories hook:", err);
          setError(err.message || "Failed to fetch categories.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  return { categories, loading, error };
}

export default useCategories;
