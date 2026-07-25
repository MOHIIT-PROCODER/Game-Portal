import { useState, useEffect, useCallback } from "react";

export function useFullscreen(ref) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sync state with native fullscreen event
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNative = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      );

      // If we exit native fullscreen, ensure we reflect that in the state
      setIsFullscreen(isNative);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange,
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange,
      );
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    const element = ref.current;
    if (!element) return;

    const requestMethod =
      element.requestFullscreen ||
      element.webkitRequestFullscreen ||
      element.mozRequestFullScreen ||
      element.msRequestFullscreen;

    const exitMethod =
      document.exitFullscreen ||
      document.webkitExitFullscreen ||
      document.mozCancelFullScreen ||
      document.msExitFullscreen;

    const currentFullscreenEl =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    if (currentFullscreenEl) {
      if (exitMethod) {
        exitMethod.call(document);
      } else {
        setIsFullscreen(false);
      }
    } else {
      if (requestMethod) {
        requestMethod
          .call(element)
          .then(() => setIsFullscreen(true))
          .catch((err) => {
            console.warn(
              "Native fullscreen request blocked, falling back to CSS class toggle:",
              err,
            );
            setIsFullscreen((prev) => !prev);
          });
      } else {
        // Fallback: simple CSS toggle state
        setIsFullscreen((prev) => !prev);
      }
    }
  }, [ref]);

  return { isFullscreen, toggleFullscreen, setIsFullscreen };
}

export default useFullscreen;
