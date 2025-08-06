import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./theme.css";

// PUBLIC_INTERFACE
// Entry point: Mount React application to #app
ReactDOM.createRoot(document.getElementById("app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
