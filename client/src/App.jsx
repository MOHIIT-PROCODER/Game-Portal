import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";
import InstallPWA from "./components/common/InstallPWA";
import PushNotificationPrompt from "./components/common/PushNotificationPrompt";

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GameProvider>
        <AppRoutes />
        <InstallPWA />
        <PushNotificationPrompt />
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
