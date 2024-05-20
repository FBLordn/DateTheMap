import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import WorldMap from './WorldMap';
import MinimumDistanceSlider from './MinimumDistanceSlider';
import GameStats from './GameStats';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function GameLayout() {
  return (
    <Stack spacing={2}>
      <Item> <GameStats /> </Item>
      <Item> <WorldMap /> </Item>
      <Item> <MinimumDistanceSlider /> </Item>
    </Stack>
  );
}
