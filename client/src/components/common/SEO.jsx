import React from "react";
import { Helmet } from "react-helmet-async";

export function SEO({ title, description, url, image }) {
  const siteTitle = "GamePortal | Play Free HTML5 Browser Games Online";
  const defaultDesc =
    "Play thousands of free full-screen HTML5 games directly in your browser. Play action, driving, shooter, puzzle, multiplayer, and classic arcade games instantly with no downloads required.";

  const fullTitle = title ? `${title} | GamePortal` : siteTitle;
  const metaDesc = description || defaultDesc;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}

export default SEO;
