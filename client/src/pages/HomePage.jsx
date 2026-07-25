import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import Loader from "../components/common/Loader";
import ErrorMessage from "../components/common/ErrorMessage";

// Sections
import FeaturedGames from "../components/sections/FeaturedGames";
import PopularGames from "../components/sections/PopularGames";
import NewGames from "../components/sections/NewGames";
import TrendingGames from "../components/sections/TrendingGames";
import RecentlyPlayed from "../components/sections/RecentlyPlayed";
import CategorySection from "../components/sections/CategorySection";
import RecommendedSection from "../components/sections/RecommendedSection";

import { HomePageSkeleton } from "../components/games/GameSkeleton";
import SEO from "../components/common/SEO";
import { useGameContext } from "../context/GameContext";
import gameService from "../services/gameService";
import { CATEGORY_ICONS } from "../utils/constants";

import GameRow from "../components/games/GameRow";
import SectionHeader from "../components/common/SectionHeader";

export function HomePage() {
  const { recentlyPlayed, favorites } = useGameContext();
  const [featuredGames, setFeaturedGames] = useState([]);
  const [popularGames, setPopularGames] = useState([]);
  const [newGames, setNewGames] = useState([]);
  const [trendingGames, setTrendingGames] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [categoryFeeds, setCategoryFeeds] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHomeData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch featured banner games
      const featuredResponse = await gameService.getFeaturedGames(6);
      setFeaturedGames(featuredResponse.games || []);

      // Fetch popular games
      const popularResponse = await gameService.getGames({
        sort: "popular",
        limit: 12,
      });
      setPopularGames(popularResponse.games || []);

      // Fetch new games
      const newResponse = await gameService.getGames({
        sort: "newest",
        limit: 12,
      });
      setNewGames(newResponse.games || []);

      // Fetch trending games
      const trendingResponse = await gameService.getGames({
        sort: "trending",
        limit: 12,
      });
      setTrendingGames(trendingResponse.games || []);

      // Fetch personalized recommendations
      const favoriteIds = favorites.map((g) => g.id);
      const recentIds = recentlyPlayed.map((g) => g.id);
      const recsResponse = await gameService.getRecommendations(
        favoriteIds,
        recentIds,
        12,
      );
      setRecommendations(recsResponse.games || []);

      // Fetch category shelves for core whitelisted categories
      const categoryWhitelist = [
        "Adventure",
        "Arcade",
        "Board",
        "Classics",
        "Junior",
        "Puzzles",
        "Sports",
        "Strategy",
      ];
      const categoryPromises = categoryWhitelist.map(async (catName) => {
        const response = await gameService.getGames({
          category: catName,
          limit: 12,
        });
        return {
          name: catName,
          games: response.games || [],
        };
      });
      const categoryFeedsRes = await Promise.all(categoryPromises);
      setCategoryFeeds(categoryFeedsRes.filter((f) => f.games.length > 0));
    } catch (err) {
      console.error("Error loading homepage feeds:", err);
      setError(
        "Could not connect to the API server. Please check that the server is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <HomePageSkeleton />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <ErrorMessage message={error} onRetry={fetchHomeData} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <SEO />

      {/* Featured Wide Banner Hero Section */}
      <FeaturedGames games={featuredGames} />

      {/* Recently Played Section (shown only if play history exists) */}
      <RecentlyPlayed games={recentlyPlayed} />

      {/* Popular Horizontal Grid Section */}
      <PopularGames games={popularGames} />

      {/* New Releases Section */}
      <NewGames games={newGames} />

      {/* Categories block grid */}
      <CategorySection />

      {/* Trending Games Section */}
      <TrendingGames games={trendingGames} />

      {/* Recommendations block grid */}
      <RecommendedSection games={recommendations} />

      {/* Category Shelf Rows */}
      {categoryFeeds.map((feed) => (
        <div
          key={feed.name}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            marginTop: "32px",
          }}
        >
          <SectionHeader
            title={`${CATEGORY_ICONS[feed.name] || "🎈"} ${feed.name} Games`}
            linkTo={`/category/${encodeURIComponent(feed.name.toLowerCase())}`}
          />
          <GameRow games={feed.games} />
        </div>
      ))}
    </MainLayout>
  );
}

export default HomePage;
