import { Divider, Stack } from "@mui/material";
import Menu from "../components/Menu";
import VolumeSlider from "../components/VolumeSlider";
import PrefLine from "../components/PrefLine";
import { Theme } from "../Definitions";
import ThemeButtons from "../components/ThemeButtons";
import { invoke } from "@tauri-apps/api/core";

interface SettingsProps {
    onApply : () => void
    onThemeSelected : (theme: Theme) => void;
}

export default function Settings({onApply, onThemeSelected}: SettingsProps) {
    
    function applySettings() {
        //save stuff    
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
          <VolumeSlider onChange={(volume) => invoke('set_music_volume', {volume: volume})}/>
        </PrefLine>
        <PrefLine title="Sound Volume">
          <VolumeSlider onChange={(volume) => invoke('set_sound_volume', {volume: volume})}/>
        </PrefLine>
        <PrefLine title="Theme">
          <ThemeButtons onThemeChange={onThemeSelected}/>
        </PrefLine>
      <Divider/>
      </Stack>
    </Menu>
  );
}