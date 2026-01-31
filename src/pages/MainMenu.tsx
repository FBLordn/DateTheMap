import { Button, Stack } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import logo from '../../src-tauri/icons/icon.png';
import GameMenu from "../components/Menu.tsx";
import { Page } from "../Definitions";

interface MainMenuProps {
  onPageSelect: (page: Page) => void;
}

export default function MainMenu({onPageSelect : setCurrentPage} : MainMenuProps) {

  return (
    <Stack
      sx={{height:'100vh', display:"flex", width:"100vw"}}
    >
      <Stack sx={{height:"15%", padding:1}} direction={"row"} justifyContent="space-between">
        <div style={{height:"100%"}}>
          <Button
            sx={{alignSelf:'flex-start', height:"100%", width:"100%"}}
            disableElevation
          >
            <InfoOutlineIcon 
              sx={{fontSize:'xxx-large', height:"100%", width:"100%"}} 
              onClick={() => setCurrentPage(Page.INFO)}
            />
          </Button>
        </div>
        <div style={{height:"100%"}}>
        <Button
          sx={{alignSelf:'flex-end', height:"100%", width:"100%"}}
          disableElevation
        >
          <SettingsIcon
            sx={{fontSize:'xxx-large', height:"100%", width:"100%"}} 
            onClick={() => setCurrentPage(Page.SETTINGS)}
          />
        </Button>
        </div>
      </Stack>
      <GameMenu 
        sx={{alignItems:'center', display:'flex', height:"85%", paddingBottom:3}}
        onSubmit={() => setCurrentPage(Page.PLAYING)} 
        children={
          <div style={{height:"100%"}}>
            <img src={logo} alt="Logo" style={{height:"100%"}}/>
          </div>
        }
        buttonName="Start Game"
      /> 
    </Stack>
  )
}