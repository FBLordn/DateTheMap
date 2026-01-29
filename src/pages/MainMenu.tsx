import { Button, Stack } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import logo from '../assets/dtm_logo.png';
import GameMenu from "../components/Menu.tsx";
import { Page } from "../Definitions";

interface MainMenuProps {
  onPageSelect: (page: Page) => void;
}

export default function MainMenu({onPageSelect : setCurrentPage} : MainMenuProps) {
  return (
    <Stack
      sx={{height:'100vh', display:"flex"}}
    >
      <Stack sx={{minHeight:1/10}} direction={"row"} justifyContent="space-between">
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
        sx={{alignItems:'center', display:'flex', minHeight:8/10, padding:5}}
        onSubmit={() => setCurrentPage(Page.PLAYING)} 
        //title="Date The Map"
        children={
          <div style={{flexGrow:1}}>
            <img src={logo} alt="Logo" style={{minHeight:"30%"}}/>
          </div>
        }
        buttonName="Start Game"
      /> 
    </Stack>
  )
}