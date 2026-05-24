import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import App from "./App";
import { AppProviders } from "./context/AppProviders";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProviders>
        <App />
        <Toaster position="top-right" />
      </AppProviders>
    </BrowserRouter>
  </React.StrictMode>
);
