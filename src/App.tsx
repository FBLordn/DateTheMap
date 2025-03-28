import React from "react";
import "./App.css";
import GameLayout from "./pages/game_layout/GameLayout.tsx";
import { ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "./Themes.tsx";
import { CssBaseline, IconButton, Stack, useMediaQuery } from "@mui/material";
import GameMenu from "./components/Menu.tsx";
import SettingsIcon from '@mui/icons-material/Settings';
import { Page } from "./Definitions.ts";
import _default from "@emotion/styled";

function App() {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [currentPage, setCurrentPage] = React.useState<Page>(Page.MENU);

  const theme = React.useMemo(
    () =>
      prefersDarkMode ? darkTheme : lightTheme,
    [prefersDarkMode],
  );

  function getPageHtml(page: Page) {
    switch (page) {
      case Page.PLAYING:
        return <GameLayout setCurrentPage={setCurrentPage} /> 
      case Page.SETTINGS:
        return 
      default:
        return (
          <Stack
            sx={{p:2, minHeight:'100vh'}}
            spacing={3}
          >
            <SettingsIcon 
              sx={{fontSize:'xxx-large', alignSelf:'flex-end', margin:"1%"}} 
              onClick={() => setCurrentPage(Page.SETTINGS)}
            />
            <GameMenu 
              sx={{flexGrow:1, justifyContent:"center"}}
              onSubmit={() => setCurrentPage(Page.PLAYING)} 
              title="Date The Map" 
              buttonName="Start Game"
            /> 
          </Stack>
        )
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {getPageHtml(currentPage)}
    </ThemeProvider>
  );
}

export default App;