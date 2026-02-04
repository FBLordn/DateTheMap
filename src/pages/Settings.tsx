import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import PrefLine from "../components/PrefLine";
import { useContext } from "react";
import { SettingsContext } from "../App";
import VolumeSlider from "../components/VolumeSlider";
import { invoke } from "@tauri-apps/api/core";
import ThemeButtons from "../components/ThemeButtons";
import React from "react";
import { DEFAULTSETTINGS, Theme } from "../Definitions";
import { SettingsAPI } from "../ApiTypes";
import NumberField from "../components/NumberField";
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SettingsProps {
  onApply : () => void,
  roundAmount: number,
  setRoundAmount: (value: React.SetStateAction<number>) => void,
}

const KB_MULT = 1_000;
const MB_MULT = 1_000_000;
const GB_MULT = 1_000_000_000;

export default function Settings({onApply, roundAmount, setRoundAmount}: SettingsProps) {
  const [music, setMusic] = React.useState<number>(DEFAULTSETTINGS.music_volume);
  const [sound, setSound] = React.useState<number>(DEFAULTSETTINGS.sound_volume);
  const [theme, setTheme] = React.useState<Theme>(DEFAULTSETTINGS.theme);
  const [cacheMult, setCacheMult] = React.useState<number>(MB_MULT);
  const [cacheSize, setCacheSize] = React.useState<number>(DEFAULTSETTINGS.cache_size);
  const { setSettings } = useContext(SettingsContext);

  React.useEffect(() => {
    invoke('get_settings').then((setting) => {
      let sett = setting as SettingsAPI;
      setMusic(sett.music_volume);
      setSound(sett.sound_volume);
      setTheme(sett.theme);
      setCacheSize(sett.cache_size / cacheMult);
      //console.log(setRoundAmount);
      setRoundAmount(sett.round_amount);
      setSettings(sett);
    });
  }, []);

  function cacheSizeChange(value: number) {
    if(value * cacheMult < 1) {
      value = 0;
    }
    setCacheSize(value);
  }

  function applySettings() {
    let settings = {music_volume:music, sound_volume:sound, theme, cache_size:cacheSize*cacheMult, round_amount:roundAmount};
    setSettings(settings);
    invoke('set_settings', {settings});
    onApply();
  }

  const onCacheMultChange = (event: SelectChangeEvent<number>) => {
    const newCacheMult = event.target.value as unknown as number;
    setCacheSize((cacheSize * cacheMult) / newCacheMult);
    setCacheMult(newCacheMult);
  }

  return (
    <Stack sx={{height:'100vh'}}>
      <Typography variant='h1' sx={{height:"15%"}}>
        {"Settings"}
      </Typography>
      <Box
        overflow={'auto'}
        sx={{height:"75%"}}
      >
        <Stack 
          spacing={3}
          padding={3}
          paddingTop={5}
          direction="column" 
          sx={{ alignItems: 'center'}}
          divider={<Divider flexItem orientation="horizontal"/>}
        >
          <PrefLine title="Music" sx={{width:1, paddingRight:5}}>
            <VolumeSlider sx={{width:1}}  onChange={(volume) => invoke('set_music_volume', {volume: volume/100})} volume={music*100} setVolume={(volume: number) => setMusic(volume/100)}/>
          </PrefLine>
          <PrefLine title="Sound" sx={{width:1, paddingRight:5}}>
            <VolumeSlider sx={{width:1}} onChange={(volume) => invoke('set_sound_volume', {volume: volume/100})} volume={sound*100} setVolume={(volume: number) => setSound(volume/100)}/>
          </PrefLine>
          <PrefLine title="Theme" sx={{width:1, paddingRight:5}}>
            <ThemeButtons 
              sx={{width:1}} 
              theme={theme} 
              setTheme={(new_theme) => {
                setTheme(new_theme);
                setSettings({music_volume:music, sound_volume:sound, theme:new_theme, cache_size:cacheSize})
              }}
            />
          </PrefLine>
          <PrefLine title="Rounds" sx={{width:1, paddingRight:5}}>
              <NumberField 
                label="Amount of rounds per game"
                value={roundAmount}
                onValueCommitted={(value) => setRoundAmount(value==null ? roundAmount : value)}
                min={1}
                max={255}
              />
          </PrefLine>
          <PrefLine title="Cache" sx={{width:1, paddingRight:5}}>
            <Stack direction={"row"} sx={{width:1}} justifyContent="space-between">
                <NumberField
                  label="Max Cache Size" 
                  value={cacheSize} 
                  onValueCommitted={(value) => cacheSizeChange( value==null ? cacheSize : value)}
                  min={0}
                />
                <Select
                  label="Unit"
                  value={cacheMult}
                  onChange={onCacheMultChange}
                >
                  <MenuItem value={KB_MULT}>KB</MenuItem>
                  <MenuItem value={MB_MULT}>MB</MenuItem>
                  <MenuItem value={GB_MULT}>GB</MenuItem>
                </Select>
                <Button sx={{minWidth:1/4}} color="warning" variant="contained" onClick={() => invoke('reset_cache')}>
                  {"Reset Cache"}
                </Button>
            </Stack>
          </PrefLine>
        </Stack>
      </Box>
      <Stack direction="row" display="flex" height={"10%"} justifyContent="space-evenly" paddingTop={1} paddingBottom={1}>
        <Button onClick={() => invoke('close_game')} color="warning" variant="contained" sx={{height:"50%"}}>
          {"Exit Game"}
        </Button>
        <Button onClick={() => {invoke('reset'); window.location.reload()}} color="info" variant="contained" sx={{height:"50%"}}>
          {"Main Menu"}
        </Button>
        <Button onClick={applySettings} color="primary" variant="contained" sx={{height:"50%"}}>
          {"Apply"}
        </Button>
      </Stack>
    </Stack>
  );
}