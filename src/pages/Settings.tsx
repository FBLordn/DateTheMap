import { Divider, Stack } from "@mui/material";
import Menu from "../components/Menu";
import PrefLine from "../components/PrefLine";
import { useContext } from "react";
import { SettingsContext } from "../App";
import VolumeSlider from "../components/VolumeSlider";
import { invoke } from "@tauri-apps/api/core";
import ThemeButtons from "../components/ThemeButtons";
import React from "react";
import { Theme } from "../Definitions";
import { SettingsAPI } from "../ApiTypes";

interface SettingsProps {
    onApply : () => void
}

export default function Settings({onApply}: SettingsProps) {
  const [music, setMusic] = React.useState<number>(0.5);
  const [sound, setSound] = React.useState<number>(0.5);
  const [theme, setTheme] = React.useState<Theme>(Theme.System);
  const { setSettings } = useContext(SettingsContext);

  React.useEffect(() => {
    invoke('get_settings').then((setting) => {
      let sett = setting as SettingsAPI;
      setMusic(sett.music_volume);
      setSound(sett.sound_volume);
      setTheme(sett.theme);
      setSettings(sett);
    });
  }, []);

  function applySettings() {
    let settings = {music_volume:music, sound_volume:sound, theme};
    setSettings(settings);
    invoke('set_settings', {settings});
    onApply();
  }

  return (
    <Menu
      onSubmit={applySettings}
      title="Settings"
      buttonName="Apply"
      sx={{height:'100vh'}}
    >
      <Stack 
        spacing={2}
        margin={5} 
        direction="column" sx={{ alignItems: 'center', mb: 1 }}
        divider={<Divider flexItem orientation="horizontal"/>}
      >
        <PrefLine title="Music">
          <VolumeSlider onChange={(volume) => invoke('set_music_volume', {volume: volume/100})} volume={music*100} setVolume={(volume: number) => setMusic(volume/100)}/>
        </PrefLine>
        <PrefLine title="Sound">
          <VolumeSlider onChange={(volume) => invoke('set_sound_volume', {volume: volume/100})} volume={sound*100} setVolume={(volume: number) => setSound(volume/100)}/>
        </PrefLine>
        <PrefLine title="Theme">
          <ThemeButtons theme={theme} setTheme={(new_theme) => {
              setTheme(new_theme);
              setSettings({music_volume:music, sound_volume:sound, theme:new_theme})
            }}
          />
        </PrefLine>
      <Divider/>
      </Stack>
    </Menu>
  );
}