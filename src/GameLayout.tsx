import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import WorldMap from './WorldMap';
import YearSelection from './YearSelection';
import GameStats from './GameStats';
import SubmitButton from './SubmitButton';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function GameLayout() {
  return (
    <Stack spacing={3} height="100vh" display="flex" flexDirection="column">
      <Item> <GameStats /> </Item>
      <Item sx={{flexGrow:1}}> <WorldMap /> </Item>
      <Item> 
        <Stack
          direction="row"
          spacing={3}
        >
          <YearSelection 
            sx={{width:"86%"}}
          /> 
          <SubmitButton
            sx={{width:"14%"}}
          />
        </Stack>
      </Item>
    </Stack>
  );
}
