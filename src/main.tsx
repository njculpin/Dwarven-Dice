import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import GameProvider from "./hooks/useGameProvider.tsx";
import { insertCoin } from "playroomkit";

insertCoin({
  streamMode: false,
}).then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <GameProvider>
        <App />
      </GameProvider>
    </React.StrictMode>
  );
});
