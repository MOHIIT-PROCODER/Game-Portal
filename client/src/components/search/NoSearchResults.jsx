import React from "react";
import EmptyState from "../common/EmptyState";

export function NoSearchResults({ query, onClear }) {
  return (
    <EmptyState
      title="No search results"
      text={`We couldn't find any games matching "${query}". Try checking your spelling or using different keywords.`}
      actionLabel="Clear Search"
      onAction={onClear}
    />
  );
}

export default NoSearchResults;
