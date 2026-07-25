export function formatPlayCount(count) {
  if (!count) return "0";
  const num = parseInt(count);
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function sanitizeGame(game) {
  return {
    id: game.id || "",
    title: game.title || "Untitled Game",
    slug: game.slug || "",
    description: game.description || "No description available for this game.",
    instructions:
      game.instructions || "Use keyboard or mouse controls to play.",
    category: game.category || "Casual",
    tags: game.tags || "",
    thumb: game.thumb || "https://via.placeholder.com/283x177?text=No+Image",
    url: game.url || "",
    width: game.width || 800,
    height: game.height || 600,
    is_featured: !!game.is_featured,
    play_count: game.play_count || 0,
    like_count: game.like_count || 0,
  };
}
