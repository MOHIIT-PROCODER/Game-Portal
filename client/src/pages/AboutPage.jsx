import React from "react";
import MainLayout from "../components/layout/MainLayout";

export function AboutPage() {
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
        }}
      >
        <h1 className="section-title" style={{ fontSize: "32px" }}>
          About GamePortal
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Welcome to <strong>GamePortal</strong>, a modern browser game
          aggregator designed for instant casual gameplay. Our platform brings
          thousands of free, lightweight HTML5 games to desktop and mobile
          devices without requiring any installations, logins, or payments.
        </p>

        <h3 className="info-section-title" style={{ marginTop: "16px" }}>
          Our Mission
        </h3>
        <p style={{ color: "var(--text-secondary)" }}>
          We believe gaming should be accessible, instantaneous, and fun. By
          building on modern HTML5 standards, we compile free games from
          distribution feeds and configure them in a fast, ad-supported
          environment. Whether you have five minutes or five hours, we have a
          game for you.
        </p>

        <h3 className="info-section-title" style={{ marginTop: "16px" }}>
          Technology and Feeds
        </h3>
        <p style={{ color: "var(--text-secondary)" }}>
          This portal leverages an Express API gateway connected to major
          open-source game networks. By caching game parameters, titles,
          instructions, and resolution layouts, we ensure swift content loads.
          Games run in secure, sandboxed iframes to guarantee safe browsing.
        </p>
      </div>
    </MainLayout>
  );
}

export default AboutPage;
