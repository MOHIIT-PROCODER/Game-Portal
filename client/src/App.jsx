import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <GameProvider>
        <AppRoutes />
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
