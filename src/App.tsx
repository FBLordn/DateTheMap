import React from "react";
import "./App.css";
import GameLayout from "./pages/game_layout/GameLayout.tsx";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./Themes.tsx";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { Page, Theme } from "./Definitions.ts";
import _default from "@emotion/styled";
import MainMenu from "./pages/MainMenu.tsx";
import Settings from "./pages/Settings.tsx";

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [currentPage, setCurrentPage] = React.useState<Page>(Page.MENU);

  const [theme, setTheme] = React.useState<Theme>(Theme.SYSTEM);

  function getThemeFromEnum(theme: Theme) {
    switch(theme) {
      case Theme.DARK:
        return darkTheme;
      case Theme.LIGHT:
        return lightTheme;
      case Theme.SYSTEM:
      default:
        return prefersDarkMode ? darkTheme : lightTheme;
    }
  }

  function getPageHtml(page: Page) {
    switch (page) {
      case Page.PLAYING:
        return <GameLayout onMainMenuSelect={() => setCurrentPage(Page.MENU)} /> 
      case Page.SETTINGS:
        return <Settings onApply={() => setCurrentPage(Page.MENU)} onThemeSelected={setTheme}/>
      case Page.MENU:
      default:
        return <MainMenu onPageSelect={setCurrentPage}/>
    }
  }

  return (
    <ThemeProvider theme={getThemeFromEnum(theme)}>
      <CssBaseline />
      {getPageHtml(currentPage)}
    </ThemeProvider>
  );
}

export default App;