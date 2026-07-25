import React, { useState, useRef, useEffect } from "react";
import GameIframe from "./GameIframe";
import GameToolbar from "./GameToolbar";
import GameLoading from "./GameLoading";
import PlayOverlay from "./PlayOverlay";
import { useFullscreen } from "../../hooks/useFullscreen";
import { useFavorites } from "../../hooks/useFavorites";

export function GamePlayer({ game, stats, voteLike }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeLoading, setIframeLoading] = useState(true);
  const playerWrapperRef = useRef(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen(playerWrapperRef);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Dynamic SEO & JSON-LD Schema Injection
  useEffect(() => {
    if (!game) return;

    // 1. Update Title and Metadata
    const originalTitle = document.title;
    document.title = `${game.title} - Play Free Online on CrazyGames`;

    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.content : "";
    if (metaDesc) {
      metaDesc.content =
        game.description ||
        `Play ${game.title} for free online on CrazyGames. No download required.`;
    }

    // 2. OpenGraph Meta Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = document.title;

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc)
      ogDesc.content = game.description || `Play ${game.title} on CrazyGames.`;

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.content = game.thumb || "";

    // 3. Inject VideoGame Schema Markup
    let schemaScript = document.getElementById("seo-schema");
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "seo-schema";
      schemaScript.type = "application/ld+json";
      document.head.appendChild(schemaScript);
    }
    schemaScript.innerText = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "VideoGame",
      name: game.title,
      description: game.description || `Play ${game.title} free online.`,
      image: game.thumb || "",
      genre: game.category || "Game",
      playMode: "SinglePlayer",
      applicationCategory: "Game",
      operatingSystem: "Web Browser",
    });

    // Cleanup function
    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.content = originalDesc;

      const scriptToRemove = document.getElementById("seo-schema");
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [game]);

  const handlePlay = () => {
    setIsPlaying(true);
    setIframeLoading(true);

    // Auto-fullscreen on mobile layout
    if (window.innerWidth <= 768) {
      if (!isFullscreen) {
        toggleFullscreen();
      }
    }
  };

  const handleReload = () => {
    if (!isPlaying) return;
    setIframeLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleIframeLoad = () => {
    setIframeLoading(false);
  };

  if (!game) return null;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Player Wrapper Container */}
      <div
        ref={playerWrapperRef}
        className={`relative w-full rounded-xs bg-black border-2 border-border aspect-[4/3] min-h-[280px] md:aspect-video overflow-hidden
          ${isFullscreen ? "fixed !inset-0 z-[100] !border-none !rounded-none !aspect-auto !h-screen !w-screen" : ""}`}
      >
        {!isPlaying ? (
          <PlayOverlay game={game} onPlay={handlePlay} />
        ) : (
          <>
            {iframeLoading && <GameLoading />}
            <GameIframe
              key={iframeKey}
              url={game.url}
              title={game.title}
              onLoad={handleIframeLoad}
            />
            {isFullscreen && (
              <button 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer z-[110] hover:bg-black/70 hover:scale-110 transition-all shadow-lg" 
                onClick={toggleFullscreen}
                title="Exit Fullscreen"
              >
                ✕
              </button>
            )}
          </>
        )}
      </div>

      {/* Controller Actions Panel */}
      <GameToolbar
        game={game}
        stats={stats}
        voteLike={voteLike}
        isFav={isFavorite(game.id)}
        toggleFavorite={toggleFavorite}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        onReload={handleReload}
      />
    </div>
  );
}

export default GamePlayer;
