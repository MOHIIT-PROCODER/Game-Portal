import React, { createContext, useContext, useState, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    "portal_sidebar_open",
    true,
  );
  const [favorites, setFavorites] = useLocalStorage("portal_favorites", []); // Array of game objects
  const [recentlyPlayed, setRecentlyPlayed] = useLocalStorage(
    "portal_recently_played",
    [],
  ); // Array of game objects
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const toggleSidebar = useCallback(() => {
    // On mobile, toggle the drawer independently
    if (window.innerWidth <= 768) {
      setMobileDrawerOpen((prev) => !prev);
    } else {
      setSidebarOpen((prev) => !prev);
    }
  }, [setSidebarOpen]);

  const closeMobileDrawer = useCallback(() => {
    setMobileDrawerOpen(false);
  }, []);

  const isFavorite = useCallback(
    (gameId) => {
      return favorites.some((g) => g.id === gameId);
    },
    [favorites],
  );

  const toggleFavorite = useCallback(
    (game) => {
      if (!game || !game.id) return;

      setFavorites((prev) => {
        const exists = prev.some((g) => g.id === game.id);
        if (exists) {
          return prev.filter((g) => g.id !== game.id);
        } else {
          return [game, ...prev].slice(0, 100); // limit to 100 favorites
        }
      });
    },
    [setFavorites],
  );

  const addRecentGame = useCallback(
    (game) => {
      if (!game || !game.id) return;

      setRecentlyPlayed((prev) => {
        // Remove duplicates
        const filtered = prev.filter((g) => g.id !== game.id);
        // Put at start, limit history to 30 items
        return [game, ...filtered].slice(0, 30);
      });
    },
    [setRecentlyPlayed],
  );

  const clearRecentGames = useCallback(() => {
    setRecentlyPlayed([]);
  }, [setRecentlyPlayed]);

  return (
    <GameContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        toggleSidebar,
        mobileDrawerOpen,
        closeMobileDrawer,
        favorites,
        toggleFavorite,
        isFavorite,
        recentlyPlayed,
        addRecentGame,
        clearRecentGames,
        activeCategory,
        setActiveCategory,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
