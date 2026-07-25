import { useEffect, useRef, useCallback } from "react";

export function useInfiniteScroll(callback, hasMore, loading) {
  const observerRef = useRef(null);

  const loaderRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [callback, hasMore, loading],
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  return loaderRef;
}

export default useInfiniteScroll;
