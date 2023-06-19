import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { GhostPen } from "./GhostPen";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CssBaseline />
    <GhostPen />
  </BrowserRouter>
);

reportWebVitals();
