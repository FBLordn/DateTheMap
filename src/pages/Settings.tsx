import { Divider, Stack } from "@mui/material";
import Menu from "../components/Menu";
import VolumeSlider from "../components/VolumeSlider";
import PrefLine from "../components/PrefLine";
import ThemeButtons from "../components/ThemeButtons";
import { invoke } from "@tauri-apps/api/core";
import { SettingType, Theme } from "../Definitions";

interface SettingsProps {
    onApply : () => void
    onSettingsChanged : (new_val: number | Theme, type: SettingType) => void;
}

export default function Settings({onApply, onSettingsChanged}: SettingsProps) {

  function applySettings() {
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
        <PrefLine title="Music Volume">
          <VolumeSlider onChange={(volume) => {invoke('set_music_volume', {volume: volume}); onSettingsChanged(volume, SettingType.MUSIC)}}/>
        </PrefLine>
        <PrefLine title="Sound Volume">
          <VolumeSlider onChange={(volume) => {invoke('set_sound_volume', {volume: volume}); onSettingsChanged(volume, SettingType.SOUND)}}/>
        </PrefLine>
        <PrefLine title="Theme">
          <ThemeButtons onThemeChange={(theme) => {onSettingsChanged(theme, SettingType.THEME)}}/>
        </PrefLine>
      <Divider/>
      </Stack>
    </Menu>
  );
}