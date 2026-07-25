import React, { useState, useEffect, useRef, useCallback } from "react";

export function GameThumbnail({ src, alt, onError }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // IntersectionObserver to trigger load only when visible
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { rootMargin: "200px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Set the real src once visible
  useEffect(() => {
    if (isVisible && src) {
      setImgSrc(src);
    }
  }, [isVisible, src]);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleError = useCallback(() => {
    if (onError) {
      onError();
    } else {
      setImgSrc(
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=283&h=177&fit=crop",
      );
    }
  }, [onError]);

  return (
    <div
      ref={containerRef}
      className="lazy-thumb-container"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16/12",
        overflow: "hidden",
        backgroundColor: "rgba(255,255,255,0.03)",
      }}
    >
      {/* Shimmer placeholder while loading */}
      {!isLoaded && (
        <div
          className="skeleton-shimmer"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
          }}
        />
      )}

      {/* Actual image (rendered only when in viewport) */}
      {imgSrc && (
        <img
          src={imgSrc}
          alt={alt || "Game cover"}
          className={`game-card-image ${isLoaded ? "lazy-img-loaded" : ""}`}
          style={{ opacity: isLoaded ? 1 : 0 }}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
        />
      )}
    </div>
  );
}

export default GameThumbnail;
