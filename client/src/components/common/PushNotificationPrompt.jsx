import React, { useState, useEffect } from "react";
import pushService from "../../services/pushService";

export function PushNotificationPrompt() {
  const [permission, setPermission] = useState("default");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!pushService.isSupported()) return;

    const state = pushService.getPermissionState();
    setPermission(state);

    pushService.getSubscription().then((sub) => {
      if (sub) {
        setIsSubscribed(true);
      } else if (state === "default") {
        // Show prompt if user hasn't made a choice yet and hasn't dismissed in this session
        const dismissed = sessionStorage.getItem("push_prompt_dismissed");
        if (!dismissed) {
          // Delay prompt slightly so it's not intrusive on load
          const timer = setTimeout(() => setShowPrompt(true), 3000);
          return () => clearTimeout(timer);
        }
      }
    });
  }, []);

  const handleSubscribe = async () => {
    setLoading(true);
    setStatusMessage("");
    try {
      await pushService.subscribe();
      setIsSubscribed(true);
      setPermission("granted");
      setShowPrompt(false);
      setStatusMessage("Push notifications enabled! 🎮");
      setTimeout(() => setStatusMessage(""), 4000);
    } catch (err) {
      console.error("Push subscription failed:", err);
      if (Notification.permission === "denied") {
        setPermission("denied");
        setStatusMessage("Notifications blocked in browser settings.");
      } else {
        setStatusMessage("Could not enable notifications. Try again.");
      }
      setTimeout(() => setStatusMessage(""), 4000);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setLoading(true);
    try {
      await pushService.unsubscribe();
      setIsSubscribed(false);
      setStatusMessage("Notifications turned off.");
      setTimeout(() => setStatusMessage(""), 4000);
    } catch (err) {
      console.error("Unsubscribe error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("push_prompt_dismissed", "true");
  };

  // 1. Toast status message
  if (statusMessage) {
    return (
      <div className="fixed bottom-5 left-5 z-[9999] bg-zinc-900 border border-cyan-500/40 text-cyan-300 text-xs px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 flex items-center gap-2">
        <span>🔔</span>
        <span>{statusMessage}</span>
      </div>
    );
  }

  // 2. Initial Opt-in prompt banner
  if (showPrompt && !isSubscribed && permission === "default") {
    return (
      <div className="fixed top-5 right-5 z-[9999] max-w-sm w-[calc(100%-2.5rem)] bg-zinc-900/95 backdrop-blur-md border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 rounded-2xl p-4 animate-in fade-in slide-in-from-top-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 flex-shrink-0 flex items-center justify-center shadow-md shadow-cyan-500/20 text-lg">
            🔔
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Never miss new games!
            </h4>
            <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
              Get instant push notifications when trending & new games launch.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-xs rounded-lg shadow-md shadow-cyan-500/20 active:scale-95 transition-all duration-150 flex items-center gap-1.5 disabled:opacity-50"
              >
                {loading ? (
                  <span>Enabling...</span>
                ) : (
                  <>
                    <span>Enable Alerts</span>
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                    </svg>
                  </>
                )}
              </button>
              <button
                onClick={handleDismiss}
                className="px-2.5 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
              >
                Maybe later
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-zinc-500 hover:text-zinc-300 p-1 rounded-md transition-colors"
            aria-label="Close push prompt"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  // 3. Compact Header Bell Button trigger (renderable anywhere or integrated)
  return (
    <div className="fixed bottom-5 left-5 z-[9000]">
      <button
        onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
        disabled={loading}
        title={isSubscribed ? "Push notifications enabled (Click to disable)" : "Enable Push notifications"}
        className={`group relative p-2.5 rounded-full border shadow-xl backdrop-blur-md transition-all duration-200 active:scale-95 flex items-center justify-center ${
          isSubscribed
            ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/30"
            : "bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
        }`}
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
        </svg>

        {isSubscribed && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-2 ring-zinc-900 animate-pulse" />
        )}
      </button>
    </div>
  );
}

export default PushNotificationPrompt;
