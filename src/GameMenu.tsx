import { Button, Stack, Typography } from '@mui/material';
import * as React from 'react';


interface ListHeaderProps {
  setIsPlaying: (isPlaying: boolean) => void;
}

export default function GameMenu({setIsPlaying}: ListHeaderProps) {
    
  function onButtonClick() {
    setIsPlaying(true);
  }

  return (
    <Stack sx={{p:2}} direction={'column'} >
      <Typography variant='h1'>
        Date The Map
      </Typography>

      <Button onClick={onButtonClick}>
        Start Game
      </Button>
    </Stack>
  ) 
}