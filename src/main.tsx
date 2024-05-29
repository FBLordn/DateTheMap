import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./Themes";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <React.StrictMode>
        <App />
    </React.StrictMode>,
  </ThemeProvider>
);
