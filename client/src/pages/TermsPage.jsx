import React from "react";
import MainLayout from "../components/layout/MainLayout";

export function TermsPage() {
  return (
    <MainLayout>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          lineHeight: "1.6",
          color: "var(--text-secondary)",
        }}
      >
        <h1
          className="section-title"
          style={{ fontSize: "32px", color: "var(--text-primary)" }}
        >
          Terms of Service
        </h1>
        <p>Last updated: July 25, 2026</p>
        <p>
          By using GamePortal, you agree to comply with our usage guidelines.
        </p>

        <h3
          className="info-section-title"
          style={{ color: "var(--text-primary)" }}
        >
          1. Permitted Use
        </h3>
        <p>
          This website serves aggregated HTML5 games for personal,
          non-commercial entertainment. You may not crawl or copy the site
          pages.
        </p>

        <h3
          className="info-section-title"
          style={{ color: "var(--text-primary)" }}
        >
          2. Embedded Content Disclaimer
        </h3>
        <p>
          We do not write or host the games displayed on our portal. Games are
          embed links provided by partners like GameMonetize or
          GameDistribution. We are not liable for any content bugs, security
          risks, or ads served within those frames.
        </p>
      </div>
    </MainLayout>
  );
}

export default TermsPage;
