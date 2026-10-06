import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import FeatureDetails from "./FeatureDetails";
import Demo from "./Demo";

import "./styles/App.css";

const path = window.location.pathname;

const isFeaturePage = path.startsWith("/features/");
const isDemoPage = path === "/demo";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isFeaturePage ? (
      <FeatureDetails />
    ) : isDemoPage ? (
      <Demo />
    ) : (
      <App />
    )}
  </React.StrictMode>
);