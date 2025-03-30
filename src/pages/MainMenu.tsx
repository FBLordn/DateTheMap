import { Button, Stack } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

import GameMenu from "../components/Menu.tsx";
import { Page } from "../Definitions";

interface MainMenuProps {
  onPageSelect: (page: Page) => void;
}

export default function MainMenu({onPageSelect : setCurrentPage} : MainMenuProps) {
  return (
    <Stack
      sx={{p:2, minHeight:'100vh'}}
      spacing={3}
    >
      <Button
        sx={{alignSelf:'flex-end', margin:"1%"}}
        disableElevation
      >
        <SettingsIcon
          sx={{fontSize:'xxx-large'}} 
          onClick={() => setCurrentPage(Page.SETTINGS)}
        />
      </Button>
      <GameMenu 
        sx={{flexGrow:1, justifyContent:"center"}}
        onSubmit={() => setCurrentPage(Page.PLAYING)} 
        title="Date The Map" 
        buttonName="Start Game"
      /> 
    </Stack>
  )
}