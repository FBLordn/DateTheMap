import { Divider, Stack } from "@mui/material";
import Menu from "../components/Menu";
import VolumeSlider from "../components/VolumeSlider";
import PrefLine from "../components/PrefLine";
import { SpaceBar } from "@mui/icons-material";

interface SettingsProps {
    onApply : () => void
}

export default function Settings({onApply}: SettingsProps) {
    
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
          <VolumeSlider/>
        </PrefLine>
        <PrefLine title="Sound Volume">
          <VolumeSlider/>
        </PrefLine>
      <Divider/>
      </Stack>
    </Menu>
  );
}