import React from "react";
import { Theme } from "../Definitions";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';

interface ThemeButtonProps {
  onThemeChange: (theme: Theme) => void;
}


export default function ThemeButtons({onThemeChange}: ThemeButtonProps) {
  const [theme, setTheme] = React.useState<Theme>(Theme.System);

  const handleClick = (
    _event: React.MouseEvent<HTMLElement>,
    newTheme: Theme,
  ) => { 
    setTheme(newTheme);
    onThemeChange(newTheme);
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