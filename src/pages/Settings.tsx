import { Button, Divider, Stack, Switch, Typography } from "@mui/material";
import PrefLine from "../components/PrefLine";
import { useContext } from "react";
import { SettingsContext } from "../App";
import VolumeSlider from "../components/VolumeSlider";
import { invoke } from "@tauri-apps/api/core";
import ThemeButtons from "../components/ThemeButtons";
import React from "react";
import { Cache, Theme } from "../Definitions";
import { SettingsAPI } from "../ApiTypes";

interface SettingsProps {
    onApply : () => void
}

export default function Settings({onApply}: SettingsProps) {
  const [music, setMusic] = React.useState<number>(0.5);
  const [sound, setSound] = React.useState<number>(0.5);
  const [theme, setTheme] = React.useState<Theme>(Theme.System);
  const [cache, setCache] = React.useState<Cache>(Cache.On);
  const { setSettings } = useContext(SettingsContext);

  React.useEffect(() => {
    invoke('get_settings').then((setting) => {
      let sett = setting as SettingsAPI;
      setMusic(sett.music_volume);
      setSound(sett.sound_volume);
      setTheme(sett.theme);
      setCache(sett.cache);
      setSettings(sett);
    });
  }, []);

  function applySettings() {
    let settings = {music_volume:music, sound_volume:sound, theme, cache};
    setSettings(settings);
    invoke('set_settings', {settings});
    onApply();
  }

  return (
    <Stack height="100vh">
      <Typography variant='h1'>
        {"Settings"}
      </Typography>
      <Stack 
        spacing={3}
        margin={4}
        direction="column" sx={{ alignItems: 'center', mb: 1}}
        divider={<Divider flexItem orientation="horizontal"/>}
      >
        <PrefLine title="Music">
          <VolumeSlider sx={{width:1, paddingLeft:1}}  onChange={(volume) => invoke('set_music_volume', {volume: volume/100})} volume={music*100} setVolume={(volume: number) => setMusic(volume/100)}/>
        </PrefLine>
        <PrefLine title="Sound">
          <VolumeSlider sx={{width:1, paddingLeft:1}} onChange={(volume) => invoke('set_sound_volume', {volume: volume/100})} volume={sound*100} setVolume={(volume: number) => setSound(volume/100)}/>
        </PrefLine>
        <PrefLine title="Theme">
          <ThemeButtons sx={{width:1, paddingLeft:1}} theme={theme} setTheme={(new_theme) => {
              setTheme(new_theme);
              setSettings({music_volume:music, sound_volume:sound, theme:new_theme, cache})
            }}
          />
        </PrefLine>
        <PrefLine title="Cache">
          <Stack direction={"row"} sx={{width:1}} justifyContent="space-between">
              <Switch sx={{paddingLeft:1}} checked={cache == Cache.On} onChange={(event) => setCache(event.target.checked ? Cache.On : Cache.Off)}/>
              <Button sx={{minWidth:1/4}} color="warning" variant="contained" onClick={() => invoke('reset_cache')}>
                {"Reset Cache"}
              </Button>
          </Stack>
        </PrefLine>
      <Stack direction="row" display="flex" justifyContent="space-evenly" width="100vw">
        <Button onClick={() => invoke('close_game')} color="warning" variant="contained">
          {"Exit Game"}
        </Button>
        <Button onClick={() => {invoke('reset'); window.location.reload()}} color="info" variant="contained">
          {"Main Menu"}
        </Button>
        <Button onClick={applySettings} color="primary" variant="contained">
          {"Apply"}
        </Button>
      </Stack>
      </Stack>
    </Stack>
  );
}