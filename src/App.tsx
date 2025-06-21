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

  const [settings, setSettings] = React.useState({music_volume: 50, sound_volume:50, theme:Theme.System} as SettingsAPI);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [currentPage, setCurrentPage] = React.useState<Page>(Page.MENU);
  const [music, setMusic] = React.useState<number>(settings.music_volume);
  const [sound, setSound] = React.useState<number>(settings.sound_volume);
  const [theme, setTheme] = React.useState<Theme>(settings.theme);

  React.useEffect(() => {
    invoke('get_settings').then((setting) => {
      let sett = setting as SettingsAPI;
      setSettings(sett); 
      setMusic(sett.music_volume*100);
      setSound(sett.sound_volume*100);
      setTheme(sett.theme);
    });
  }, []);

  function getPageHtml(page: Page) {
    switch (page) {
      case Page.PLAYING:
        return <GameLayout onMainMenuSelect={() => setCurrentPage(Page.MENU)} /> 
      case Page.SETTINGS:
        return <Settings 
            onApply={() => {
              setCurrentPage(Page.MENU);
              let sett = {music_volume:music/100, sound_volume:sound/100, theme} as SettingsAPI;
              setSettings(sett);
              invoke('set_settings', {settings: sett})}}
            children={
              [["Music", <VolumeSlider onChange={(volume) => invoke('set_music_volume', {volume: volume})} volume={music} setVolume={setMusic}/>],
              ["Sound", <VolumeSlider onChange={(volume) => invoke('set_sound_volume', {volume: volume})} volume={sound} setVolume={setSound}/>],
              ["Theme", <ThemeButtons theme={theme} setTheme={setTheme}/>]]}/>
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
    <ThemeProvider theme={getThemeFromEnum(theme)}>
      <CssBaseline />
      {getPageHtml(currentPage)}
    </ThemeProvider>
  );
}

export default App;