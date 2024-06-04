import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import GameLayout from "./pages/game_layout/GameLayout.tsx";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./Themes.tsx";
import { CssBaseline, useMediaQuery } from "@mui/material";
import GameMenu from "./GameMenu.tsx";

window.addEventListener('resize', function(event) {
  console.log(`w: ${window.innerWidth}`)
  console.log(`h: ${window.innerHeight}`)
}, true);

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  const theme = React.useMemo(
    () =>
      prefersDarkMode ? darkTheme : lightTheme,
    [prefersDarkMode],
  );

  if (isPlaying) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GameLayout setIsPlaying={setIsPlaying} />
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GameMenu setIsPlaying={setIsPlaying} />
      </ThemeProvider>
    );
  }
}

export default App;
