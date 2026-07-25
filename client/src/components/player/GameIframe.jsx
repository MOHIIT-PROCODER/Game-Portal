import React, { useRef, useEffect } from "react";

export function GameIframe({ url, title, onLoad }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
  }, [url]);

  if (!url) return null;

  const handleLoad = (e) => {
    if (iframeRef.current) {
      iframeRef.current.focus();
    }
    if (onLoad) onLoad(e);
  };

  return (
    <iframe
      ref={iframeRef}
      src={url}
      title={title || "Game Player"}
      className="game-iframe"
      allowFullScreen
      scrolling="no"
      onLoad={handleLoad}
      // Permissions required for standard HTML5 browser game overlays
      allow="autoplay; keyboard-effects; fullscreen; gamepad; pointer-lock"
      sandbox="allow-scripts allow-same-origin allow-popups allow-pointer-lock allow-forms"
    />
  );
}

export default GameIframe;
