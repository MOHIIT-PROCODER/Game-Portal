import { slugify } from "./slugify.js";

export function mapRawGame(raw) {
  const title = (raw.title || "").trim();
  const slug =
    slugify(title) ||
    `game-${raw.id || Math.random().toString(36).substr(2, 9)}`;

  // Categorization extraction
  let category = "Casual";
  if (raw.category) {
    category = Array.isArray(raw.category) ? raw.category[0] : raw.category;
  } else if (raw.categories) {
    category = Array.isArray(raw.categories)
      ? raw.categories[0]
      : raw.categories;
  }

  // Tag handling (join categories list as tags)
  let tags = "";
  if (raw.categories && Array.isArray(raw.categories)) {
    tags = raw.categories.join(", ");
  } else if (raw.tags) {
    tags = Array.isArray(raw.tags) ? raw.tags.join(", ") : raw.tags.toString();
  }

  // Thumbnail mapping (GamePix uses thumbnailUrl)
  let thumb = "";
  if (raw.imageUrl) {
    thumb = raw.imageUrl;
  } else if (raw.thumbnailUrl) {
    thumb = raw.thumbnailUrl;
  } else if (raw.thumb) {
    thumb = raw.thumb;
  } else if (raw.thumb_url) {
    thumb = raw.thumb_url;
  } else if (raw.image) {
    thumb = raw.image;
  }

  // URL (play iframe embed link)
  const url =
    raw.iframeUrl ||
    raw.embedUrl ||
    raw.url ||
    raw.iframe_url ||
    raw.embed_url ||
    "";

  // Width & height setup
  const width = parseInt(raw.width) || 800;
  const height = parseInt(raw.height) || 600;

  // Let's decide if this game is featured. GamePix has a featured boolean flag.
  // We fall back to 8% random choice if not defined.
  const isFeatured =
    raw.featured !== undefined
      ? raw.featured
        ? 1
        : 0
      : Math.random() < 0.08
        ? 1
        : 0;

  return {
    id: raw.id ? raw.id.toString() : slug,
    title,
    slug,
    description: raw.description || raw.desc_en || "",
    instructions:
      raw.instructions ||
      "Use touch or mouse controls to interact with the game elements.",
    category,
    tags,
    thumb,
    url,
    width,
    height,
    is_featured: isFeatured,
  };
}

export function mapRawGamesList(rawList) {
  if (!Array.isArray(rawList)) return [];
  return rawList
    .filter((g) => g && g.title && (g.url || g.iframe_url))
    .map(mapRawGame);
}
