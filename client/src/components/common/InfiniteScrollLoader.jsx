import React from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import Loader from "./Loader";

export function InfiniteScrollLoader({ loadMore, hasMore, loading }) {
  const loaderRef = useInfiniteScroll(loadMore, hasMore, loading);

  return (
    <div
      ref={loaderRef}
      style={{
        width: "100%",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      {loading && <Loader size="small" />}
      {!loading && hasMore && (
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          Scroll down to load more games...
        </span>
      )}
      {!hasMore && !loading && (
        <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
          You've reached the end of the line.
        </span>
      )}
    </div>
  );
}

export default InfiniteScrollLoader;
