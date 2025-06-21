import { Box, Slider, Stack } from "@mui/material";
import React from "react";

interface VolumeSliderProps {
  onChange: (volume: number) => void;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

export default function VolumeSlider({ onChange, volume, setVolume} : VolumeSliderProps) {
  
  function onVolumeChange(_event: Event, value: number | number[], _activeThumb: number) {
    setVolume(Array.isArray(value) ? value[0] : value);
  }

  return (
    <Box sx={{ width:1}}>
      <Stack direction={"row"}>
        <Slider 
          aria-label="Volume" 
          value={volume} 
          valueLabelFormat={(value: number) => `${value}%`}
          onChange={onVolumeChange} 
          valueLabelDisplay="auto"
          onChangeCommitted={() => onChange(volume/100)}
        />
      </Stack> 
    </Box>
  )
}