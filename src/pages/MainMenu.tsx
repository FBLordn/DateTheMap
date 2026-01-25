import { Button, Stack } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import logo from '../assets/idea_logo.png';
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
      <Stack direction={"row"} justifyContent="space-between">
        <Button
          sx={{alignSelf:'flex-start', margin:"1%"}}
          disableElevation
        >
          <InfoOutlineIcon 
            sx={{fontSize:'xxx-large'}} 
            onClick={() => setCurrentPage(Page.INFO)}
          />
        </Button>
        <Button
          sx={{alignSelf:'flex-end', margin:"1%"}}
          disableElevation
        >
          <SettingsIcon
            sx={{fontSize:'xxx-large'}} 
            onClick={() => setCurrentPage(Page.SETTINGS)}
          />
        </Button>

      </Stack>
      <GameMenu 
        sx={{flexGrow:1, justifyContent:'center', display:'flex', alignItems:'center'}}
        onSubmit={() => setCurrentPage(Page.PLAYING)} 
        //title="Date The Map"
        children={
          <div style={{margin:10, alignItems:'center'}}>
            <img src={logo} alt="Logo"/>
          </div>
      
        }
        buttonName="Start Game"
      /> 
    </Stack>
  )
}