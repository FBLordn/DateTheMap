import React from "react";
import "./App.css";
import GameLayout from "./pages/game_layout/GameLayout.tsx";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./Themes.tsx";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { Page, Theme } from "./Definitions.ts";
import { SettingsAPI } from "./ApiTypes.ts";
import _default from "@emotion/styled";
import MainMenu from "./pages/MainMenu.tsx";
import Settings from "./pages/Settings.tsx";
import { invoke } from "@tauri-apps/api/core";
import ThemeButtons from "./components/ThemeButtons.tsx";
import VolumeSlider from "./components/VolumeSlider.tsx";

function App() {

  const [settings, setSettings] = React.useState({music_volume: 0.5, sound_volume:0.5, theme:Theme.System} as SettingsAPI);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [currentPage, setCurrentPage] = React.useState<Page>(Page.MENU);

  React.useEffect(() => {
    invoke('get_settings').then((setting) => {
      setSettings(setting as SettingsAPI);
    });
  }, []);

  function getPageHtml(page: Page) {
    switch (page) {
      case Page.PLAYING:
        return <GameLayout onMainMenuSelect={() => setCurrentPage(Page.MENU)} settings={settings} setSettings={setSettings}/>
      case Page.SETTINGS:
        return <Settings 
            onApply={() => {
              setCurrentPage(Page.MENU);
              invoke('set_settings', {settings: settings})}}
            children={
              [["Music", <VolumeSlider onChange={(volume) => invoke('set_music_volume', {volume: volume/100})} volume={settings.music_volume*100} setVolume={(volume) => setSettings({music_volume:volume/100, sound_volume:settings.sound_volume, theme:settings.theme})}/>],
              ["Sound", <VolumeSlider onChange={(volume) => invoke('set_sound_volume', {volume: volume/100})} volume={settings.sound_volume*100} setVolume={(volume) => setSettings({music_volume:settings.music_volume, sound_volume:volume/100, theme:settings.theme})}/>],
              ["Theme", <ThemeButtons theme={settings.theme} setTheme={(theme) => setSettings({music_volume:settings.music_volume, sound_volume:settings.sound_volume, theme:theme})}/>]]}/>
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
    <ThemeProvider theme={getThemeFromEnum(settings.theme)}>
      <CssBaseline />
      {getPageHtml(currentPage)}
    </ThemeProvider>
  );
}

export default App;