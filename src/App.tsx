import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import GameLayout from "./pages/game_layout/GameLayout.tsx";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./Themes.tsx";
import { CssBaseline, useMediaQuery } from "@mui/material";
import GameMenu from "./components/Menu.tsx";

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);

  const theme = React.useMemo(
    () =>
      prefersDarkMode ? darkTheme : lightTheme,
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      { isPlaying ? 
        <GameLayout setIsPlaying={setIsPlaying} /> 
        : 
        <GameMenu onSubmit={() => setIsPlaying(true)} title="Date The Map" buttonName="Start Game"/> }
    </ThemeProvider>
  );
}

export default App;
