import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import MainLayout from "../components/layout/MainLayout";
import { HomePageSkeleton } from "../components/games/GameSkeleton";
import Loader from "../components/common/Loader";

// Eagerly loaded (critical path)
import HomePage from "../pages/HomePage";

// Lazy-loaded pages (code-split)
const GamePage = lazy(() => import("../pages/GamePage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const PopularPage = lazy(() => import("../pages/PopularPage"));
const NewGamesPage = lazy(() => import("../pages/NewGamesPage"));
const TrendingPage = lazy(() => import("../pages/TrendingPage"));
const RecentPage = lazy(() => import("../pages/RecentPage"));
const FavoritesPage = lazy(() => import("../pages/FavoritesPage"));
const AllGamesPage = lazy(() => import("../pages/AllGamesPage"));
const AboutPage = lazy(() => import("../pages/AboutPage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const PrivacyPage = lazy(() => import("../pages/PrivacyPage"));
const TermsPage = lazy(() => import("../pages/TermsPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

/* Fallback shown while lazy chunks load */
function RouteFallback() {
  return (
    <MainLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "40vh",
        }}
      >
        <Loader message="Loading page..." />
      </div>
    </MainLayout>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.GAME} element={<GamePage />} />
        <Route path={ROUTES.CATEGORY} element={<CategoryPage />} />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        <Route path={ROUTES.POPULAR} element={<PopularPage />} />
        <Route path={ROUTES.NEW} element={<NewGamesPage />} />
        <Route path={ROUTES.TRENDING} element={<TrendingPage />} />
        <Route path={ROUTES.RECENT} element={<RecentPage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route path={ROUTES.ALL} element={<AllGamesPage />} />

        {/* Informational Pages */}
        <Route path={ROUTES.ABOUT} element={<AboutPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path={ROUTES.PRIVACY} element={<PrivacyPage />} />
        <Route path={ROUTES.TERMS} element={<TermsPage />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
