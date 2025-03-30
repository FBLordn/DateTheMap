import React from "react";
import "./App.css";
import GameLayout from "./pages/game_layout/GameLayout.tsx";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./Themes.tsx";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { Page } from "./Definitions.ts";
import _default from "@emotion/styled";
import MainMenu from "./pages/MainMenu.tsx";
import Settings from "./pages/Settings.tsx";

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [currentPage, setCurrentPage] = React.useState<Page>(Page.MENU);

  const theme = React.useMemo(
    () =>
      prefersDarkMode ? darkTheme : lightTheme,
    [prefersDarkMode],
  );

  function getPageHtml(page: Page) {
    switch (page) {
      case Page.PLAYING:
        return <GameLayout onMainMenuSelect={() => setCurrentPage(Page.MENU)} /> 
      case Page.SETTINGS:
        return <Settings onApply={() => setCurrentPage(Page.MENU)}/>
      case Page.MENU:
      default:
        return <MainMenu onPageSelect={setCurrentPage}/>
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {getPageHtml(currentPage)}
    </ThemeProvider>
  );
}

export default App;