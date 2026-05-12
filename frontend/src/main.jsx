import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Note: i18n is initialised inside App.jsx via import "./i18n/index.js"
// Do NOT import it here again or it double-initialises

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
