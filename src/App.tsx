import React from "react";
import "./App.css";
import GameLayout from "./pages/game_layout/GameLayout.tsx";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./Themes.tsx";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { Page, SettingType, Theme } from "./Definitions.ts";
import { SettingsAPI } from "./ApiTypes.ts";
import _default from "@emotion/styled";
import MainMenu from "./pages/MainMenu.tsx";
import Settings from "./pages/Settings.tsx";
import { invoke } from "@tauri-apps/api/core";

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [currentPage, setCurrentPage] = React.useState<Page>(Page.MENU);

  const [settings, setSettings] = React.useState<SettingsAPI>({music_volume:0.5, sound_volume:0.5, theme:Theme.System} as SettingsAPI);

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

  function changeSetting(new_val: number | Theme, type: SettingType) {
    switch (type) {
      case SettingType.SOUND:
        setSettings({music_volume:settings.music_volume, sound_volume:new_val, theme:settings.theme} as SettingsAPI);
        break;
      case SettingType.MUSIC:
        setSettings({music_volume:new_val, sound_volume:settings.sound_volume, theme:settings.theme} as SettingsAPI);
        break;
      case SettingType.THEME:
        setSettings({music_volume:settings.music_volume, sound_volume:settings.sound_volume, theme:new_val} as SettingsAPI);
        break;
    }
  }

  function getPageHtml(page: Page) {
    switch (page) {
      case Page.PLAYING:
        return <GameLayout onMainMenuSelect={() => setCurrentPage(Page.MENU)} /> 
      case Page.SETTINGS:
        return <Settings onApply={() => {setCurrentPage(Page.MENU)
                                        invoke('set_settings', {settings})}} onSettingsChanged={changeSetting}/>
      case Page.MENU:
      default:
        return <MainMenu onPageSelect={setCurrentPage}/>
    }
  }

  return (
    <ThemeProvider theme={getThemeFromEnum(settings.theme)}>
      <CssBaseline />
      {getPageHtml(currentPage)}
    </ThemeProvider>
  );
}

export default App;