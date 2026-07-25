import React from "react";
import MainLayout from "../components/layout/MainLayout";

export function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p>Last updated: July 25, 2026</p>
        <p>
          At GamePortal, we respect your privacy. This policy outlines what data
          we store, how local storage is utilized, and third-party advertising
          cookies.
        </p>

        <h3
          className="info-section-title"
          style={{ color: "var(--text-primary)" }}
        >
          1. Local Storage
        </h3>
        <p>
          We store your game bookmarks (Favorites) and recently played history
          in your local browser storage. This data remains on your physical
          machine and is never sent to our servers or shared with any
          advertising networks.
        </p>

        <h3
          className="info-section-title"
          style={{ color: "var(--text-primary)" }}
        >
          2. Cookies and Ads
        </h3>
        <p>
          This portal uses third-party game distribution links. These
          distribution frames may contain ads that store persistent tracking
          cookies to customize ads. By playing these games, you agree to their
          respective privacy terms.
        </p>
      </div>
    </MainLayout>
  );
}

export default PrivacyPage;
