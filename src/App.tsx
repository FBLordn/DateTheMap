import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import GameLayout from "./GameLayout.tsx";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./Themes.tsx";
import { CssBaseline, useMediaQuery } from "@mui/material";

window.addEventListener('resize', function(event) {
  console.log(`w: ${window.innerWidth}`)
  console.log(`h: ${window.innerHeight}`)
}, true);

function App() {

const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

const theme = React.useMemo(
  () =>
    prefersDarkMode ? darkTheme : lightTheme,
  [prefersDarkMode],
);

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GameLayout />
  </ThemeProvider>
  );
}

export default App;
