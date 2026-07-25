import React from "react";

function SkeletonCard({ style }) {
  return (
    <div
      className="skeleton-card"
      style={{
        ...style,
        position: "relative",
        aspectRatio: "16/12",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      {/* Background acts as the thumb */}
      <div
        className="skeleton-shimmer"
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 255, 255, 0.04)",
        }}
      />
      {/* Overlay area */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          background: "linear-gradient(to top, rgba(12, 13, 20, 0.9) 0%, rgba(12, 13, 20, 0) 100%)",
        }}
      >
        <div
          className="skeleton-line skeleton-shimmer"
          style={{ width: "75%", backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        />
        <div className="skeleton-meta-row" style={{ display: "flex", gap: "10px" }}>
          <div
            className="skeleton-line skeleton-shimmer"
            style={{ width: "40%", height: "10px", backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          />
          <div
            className="skeleton-line skeleton-shimmer"
            style={{ width: "25%", height: "10px", backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Row of cards (horizontal scroll skeleton) ── */
export function SkeletonRow({ count = 6 }) {
  return (
    <div className="skeleton-row">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard
          key={i}
          style={{ minWidth: "200px", flex: "0 0 200px" }}
        />
      ))}
    </div>
  );
}

/* ── Grid of cards ── */
export function SkeletonGrid({ count = 12 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

/* ── Featured hero banner skeleton ── */
export function SkeletonFeatured() {
  return (
    <div className="skeleton-featured">
      <div className="skeleton-featured-bg skeleton-shimmer" />
      <div className="skeleton-featured-content">
        <div
          className="skeleton-line skeleton-shimmer"
          style={{ width: "50%", height: "28px", borderRadius: "6px" }}
        />
        <div
          className="skeleton-line skeleton-shimmer"
          style={{ width: "70%", height: "14px", marginTop: "12px" }}
        />
        <div
          className="skeleton-line skeleton-shimmer"
          style={{
            width: "120px",
            height: "36px",
            borderRadius: "8px",
            marginTop: "16px",
          }}
        />
      </div>
    </div>
  );
}

/* ── Section skeleton (header + row) ── */
export function SkeletonSection() {
  return (
    <div className="skeleton-section">
      <div className="skeleton-section-header">
        <div
          className="skeleton-line skeleton-shimmer"
          style={{ width: "180px", height: "20px" }}
        />
        <div
          className="skeleton-line skeleton-shimmer"
          style={{ width: "60px", height: "14px" }}
        />
      </div>
      <SkeletonRow />
    </div>
  );
}

/* ── Category grid skeleton ── */
export function SkeletonCategoryGrid({ count = 10 }) {
  return (
    <div className="skeleton-section">
      <div className="skeleton-section-header">
        <div
          className="skeleton-line skeleton-shimmer"
          style={{ width: "200px", height: "20px" }}
        />
      </div>
      <div className="skeleton-category-grid">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="skeleton-category-chip skeleton-shimmer" />
        ))}
      </div>
    </div>
  );
}

/* ── Full page skeleton (replicates homepage structure) ── */
export function HomePageSkeleton() {
  return (
    <div className="skeleton-page" aria-label="Loading content">
      <SkeletonSection />
      <SkeletonSection />
      <SkeletonCategoryGrid />
      <SkeletonSection />
      <SkeletonSection />
    </div>
  );
}

/* ── Original simple skeleton (backward compat) ── */
export function GameSkeleton({ count = 8 }) {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default GameSkeleton;
