import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const mountNode = document.getElementById("tenure-form-root");

if (mountNode) {
  ReactDOM.createRoot(mountNode).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
