import React, { useState, useEffect } from "react";

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activeTab, setActiveTab] = useState("android");

  useEffect(() => {
    // Check if app is already running as standalone PWA
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = sessionStorage.getItem("pwa_install_dismissed");
      if (!dismissed) {
        setShowBanner(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowBanner(false);
      setShowModal(false);
      setDeferredPrompt(null);
    };

    const handleOpenModal = () => {
      setShowModal(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("open-install-pwa-modal", handleOpenModal);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("open-install-pwa-modal", handleOpenModal);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShowBanner(false);
        setShowModal(false);
      }
      setDeferredPrompt(null);
    } else {
      // If native prompt isn't directly triggerable, open modal with mobile installation guide
      setShowModal(true);
    }
  };

  const handleDismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem("pwa_install_dismissed", "true");
  };

  // Helper function for external triggers
  window.triggerPwaInstall = handleInstallClick;

  return (
    <>
      {/* 1. Mobile Floating Bottom Banner (non-intrusive) */}
      {showBanner && !isInstalled && !showModal && (
        <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-sm z-[9995] bg-zinc-900/95 backdrop-blur-xl border border-violet-500/40 shadow-2xl shadow-violet-900/40 rounded-2xl p-3.5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-600 via-pink-600 to-orange-500 p-0.5 flex-shrink-0 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <img
                src="/logo.svg"
                alt="CrazyGames App Logo"
                className="w-full h-full object-contain rounded-[10px]"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                  CrazyGames App
                </h4>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] px-1.5 py-0.2 rounded-full font-semibold">
                  APK / PWA
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 truncate">
                Fast full-screen mobile gameplay & offline access
              </p>
            </div>
            <button
              onClick={handleDismissBanner}
              className="text-zinc-400 hover:text-white p-1 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-zinc-800/80">
            <button
              onClick={handleInstallClick}
              className="flex-1 py-2 px-3 bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500 hover:from-violet-500 hover:to-orange-400 text-white font-bold text-xs rounded-xl shadow-lg shadow-violet-600/30 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              <span>{deferredPrompt ? "Install App (APK)" : "Download App"}</span>
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="py-2 px-3 bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-300 font-medium text-xs rounded-xl border border-zinc-700 transition-colors"
            >
              How to Install
            </button>
          </div>
        </div>
      )}

      {/* 2. Detailed Mobile Responsive Installation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-zinc-900 border border-violet-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-violet-900/50 max-h-[90vh] overflow-y-auto">
            {/* Close Modal */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-800/60 hover:bg-zinc-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 via-pink-600 to-orange-500 p-0.5 flex-shrink-0 flex items-center justify-center shadow-lg shadow-violet-500/30">
                <img src="/logo.svg" alt="App Logo" className="w-full h-full object-contain rounded-[12px]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Install CrazyGames App
                  <span className="text-[10px] bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Mobile APK
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">Play full screen with zero lag & instant startup</p>
              </div>
            </div>

            {/* Direct Native Action if prompt available */}
            {deferredPrompt && (
              <div className="mb-5 p-3.5 bg-violet-950/40 border border-violet-500/30 rounded-2xl">
                <p className="text-xs text-violet-200 mb-2.5">
                  ✨ Your browser supports 1-click automatic app installation!
                </p>
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 via-pink-600 to-orange-500 hover:brightness-110 text-white font-bold text-sm rounded-xl shadow-lg shadow-violet-600/40 active:scale-98 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                  </svg>
                  <span>Install App Now</span>
                </button>
              </div>
            )}

            {/* OS Tabs for Instructions */}
            <div className="flex bg-zinc-800/80 p-1 rounded-xl mb-4 border border-zinc-700/60">
              <button
                onClick={() => setActiveTab("android")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "android"
                    ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>🤖 Android (Chrome)</span>
              </button>
              <button
                onClick={() => setActiveTab("ios")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === "ios"
                    ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-md"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>🍎 iOS (Safari)</span>
              </button>
            </div>

            {/* Instructions Content */}
            {activeTab === "android" ? (
              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
                  <span className="w-6 h-6 rounded-full bg-violet-600/30 text-violet-400 border border-violet-500/40 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="text-white">Open Browser Menu</strong>
                    <p className="text-zinc-400 mt-0.5">
                      Tap the <strong>three dots (⋮)</strong> at the top right of your Chrome browser.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
                  <span className="w-6 h-6 rounded-full bg-pink-600/30 text-pink-400 border border-pink-500/40 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="text-white">Tap "Install app" / "Add to Home screen"</strong>
                    <p className="text-zinc-400 mt-0.5">
                      Select <strong>Install app</strong> or <strong>Add to Home screen</strong> from the list.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
                  <span className="w-6 h-6 rounded-full bg-orange-500/30 text-orange-400 border border-orange-500/40 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="text-white">Launch & Play Offline</strong>
                    <p className="text-zinc-400 mt-0.5">
                      CrazyGames icon will appear on your mobile home screen like a native APK app!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-zinc-300">
                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
                  <span className="w-6 h-6 rounded-full bg-violet-600/30 text-violet-400 border border-violet-500/40 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="text-white">Tap Share Button</strong>
                    <p className="text-zinc-400 mt-0.5">
                      Tap the <strong>Share icon (⎋)</strong> at the bottom bar of Safari.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
                  <span className="w-6 h-6 rounded-full bg-pink-600/30 text-pink-400 border border-pink-500/40 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="text-white">Select "Add to Home Screen"</strong>
                    <p className="text-zinc-400 mt-0.5">
                      Scroll down in options and tap <strong>Add to Home Screen (+)</strong>.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
                  <span className="w-6 h-6 rounded-full bg-orange-500/30 text-orange-400 border border-orange-500/40 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="text-white">Tap "Add"</strong>
                    <p className="text-zinc-400 mt-0.5">
                      Confirm by tapping <strong>Add</strong> in top right. Enjoy full-screen mobile app!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="w-full sm:w-auto px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs rounded-xl transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InstallPWA;
