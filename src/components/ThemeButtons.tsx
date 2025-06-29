import React from "react";
import { Theme } from "../Definitions";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

interface ThemeButtonProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}


export default function ThemeButtons({theme, setTheme}: ThemeButtonProps) {

  const handleClick = (
    _event: React.MouseEvent<HTMLElement>,
    newTheme: Theme,
  ) => { 
    setTheme(newTheme);
  }

  return (
    <ToggleButtonGroup
      value={theme}
      exclusive
      onChange={handleClick}
      aria-label="theme setting"
      color="primary"
    >
      <ToggleButton value={Theme.Light} aria-label="light">
        <LightModeIcon/>
      </ToggleButton>
      <ToggleButton value={Theme.System} aria-label="system">
        <DisplaySettingsIcon/>
      </ToggleButton>
      <ToggleButton value={Theme.Dark} aria-label="dark">
        <DarkModeIcon/>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}