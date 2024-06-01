import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import WorldMap from './WorldMap';
import YearSelection from './YearSelection';
import GameStats from './GameStats';
import SubmitButton from './SubmitButton';
import { GameState } from '../../ApiTypes';
import { invoke } from '@tauri-apps/api';
import RoundEnd from '../../RoundEnd';
import { Typography } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const minValue = 1000;
const maxValue = 2024;


export default function GameLayout() {
  
  const [guessRange, setRange] = React.useState<number[]>([minValue, maxValue]);
  
  const [gameState, setGameState] = React.useState<GameState>();
  
  const [RoundEndOpen, setRoundEndOpen] = React.useState(false);
  
  React.useEffect(() => {
    async function getGameState() {
      const game: GameState = await invoke('get_game_state')
      setGameState(game);
    }
    getGameState();
  }, []);

  return (
    gameState ?
      <>
      <RoundEnd 
        scoreRound={[gameState.score, gameState.round]} 
        isLastRound={gameState.round > 4} 
        isOpen={RoundEndOpen} 
        setClosed={setRoundEndOpen} 
      /> 
      <Stack sx={{p:2}} spacing={3} height="100vh" display="flex" flexDirection="column">
      <Item> <GameStats scoreRound={[gameState.total, gameState.round]} /> </Item>

        <Item sx={{flexGrow:1}}> <WorldMap/> </Item>
        <Item> 
          <Stack
            direction="row"
            spacing={2}
          >
            <YearSelection 
              sx={{width:17/20}}
              callbackFunction={setRange}
            /> 
            <SubmitButton
              sx={{width:3/20}}
              guess={guessRange}
              setGameState={setGameState}
              isLastRound={gameState.round > 4}
              setRoundEnded={setRoundEndOpen}
            />
          </Stack>
        </Item>
      </Stack>
      </>
      :
      <Item>
        <Typography> "Sorgy, accident" </Typography>
      </Item>
  );
}
