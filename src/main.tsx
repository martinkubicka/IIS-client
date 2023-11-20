import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CssVarsProvider } from "@mui/joy";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SnackbarProvider>
    <CssVarsProvider defaultMode="light">
      <App />
    </CssVarsProvider>
  </SnackbarProvider>
);
