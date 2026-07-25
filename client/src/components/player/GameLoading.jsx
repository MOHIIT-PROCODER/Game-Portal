import React from "react";
import Loader from "../common/Loader";

export function GameLoading() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(9, 9, 11, 0.9)",
        backdropFilter: "blur(8px)",
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader message="Loading game stream..." />
    </div>
  );
}

export default GameLoading;
