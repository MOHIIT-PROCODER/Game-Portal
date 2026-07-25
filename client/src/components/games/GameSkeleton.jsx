import React from "react";

/* ── Individual card skeleton ── */
function SkeletonCard({ style }) {
  return (
    <div className="skeleton-card" style={style}>
      <div className="skeleton-thumb skeleton-shimmer" />
      <div className="skeleton-info">
        <div
          className="skeleton-line skeleton-shimmer"
          style={{ width: "75%" }}
        />
        <div className="skeleton-meta-row">
          <div
            className="skeleton-line skeleton-shimmer"
            style={{ width: "40%", height: "10px" }}
          />
          <div
            className="skeleton-line skeleton-shimmer"
            style={{ width: "25%", height: "10px" }}
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
      <SkeletonFeatured />
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
