import React, { Dispatch } from "react";
import "./App.css";
import GameLayout from "./pages/game_layout/GameLayout.tsx";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./Themes.tsx";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { DEFAULTSETTINGS, Page, Theme} from "./Definitions.ts";
import { SettingsAPI } from "./ApiTypes.ts";
import _default from "@emotion/styled";
import MainMenu from "./pages/MainMenu.tsx";
import Settings from "./pages/Settings.tsx";
import Information from "./pages/Information.tsx"

interface ISettingsContext {
  settings: SettingsAPI,
  setSettings: Dispatch<any>,
}

export const SettingsContext = React.createContext<ISettingsContext>({
  settings: DEFAULTSETTINGS,
  setSettings: () => {}
});

function App() {

  const [settings, setSettings] = React.useState(DEFAULTSETTINGS as SettingsAPI);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [currentPage, setCurrentPage] = React.useState<Page>(Page.MENU);

  const [roundAmount, setRoundAmount] = React.useState<number>(DEFAULTSETTINGS.round_amount);

  function getPageHtml(page: Page) {
    switch (page) {
      case Page.PLAYING:
        return <GameLayout onMainMenuSelect={() => setCurrentPage(Page.MENU)} roundAmount={roundAmount} setRoundAmount={setRoundAmount}/>
      case Page.SETTINGS:
        return <Settings onApply={() => setCurrentPage(Page.MENU)} roundAmount={roundAmount} setRoundAmount={setRoundAmount}/>
      case Page.INFO:
        return <Information onApply={() => setCurrentPage(Page.MENU)}/>
      case Page.MENU:
      default:
        return <MainMenu onPageSelect={setCurrentPage}/>
    }
  }

  function getThemeFromEnum(theme: Theme) {
    switch(theme) {
      case Theme.Dark:
        return darkTheme;
      case Theme.Light:
        return lightTheme;
      case Theme.System:
      default:
        return prefersDarkMode ? darkTheme : lightTheme;
    }
  }

  return (
    <SettingsContext.Provider value={{settings, setSettings}}>
      <ThemeProvider theme={getThemeFromEnum(settings.theme)}>
        <CssBaseline />
        {getPageHtml(currentPage)}
      </ThemeProvider>
    </SettingsContext.Provider>
  );
}

export default App;