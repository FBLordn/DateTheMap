import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import WorldMap from './WorldMap';
import InputRangeSlider from '../../components/InputRangeSlider';
import GameStats from './GameStats';
import SubmitButton from './SubmitButton';
import { GameState } from '../../ApiTypes';
import { invoke } from '@tauri-apps/api';
import RoundEndPopUp from './RoundEndPopUp';
import { Typography } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const minValue = 1000;
const maxValue = 2024;

interface ListHeaderProps {
  setIsPlaying: (isPlaying: boolean) => void;
}

export default function GameLayout({setIsPlaying}: ListHeaderProps) {
  
  const [guessRange, setRange] = React.useState<number[]>([minValue, maxValue]);
  
  const [gameState, setGameState] = React.useState<GameState>();

  const [roundEndOpen, setRoundEndOpen] = React.useState<boolean>(false);
  
  if (gameState && gameState.round === 6) {
    invoke('reset')
    setIsPlaying(false);
  }

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
      <RoundEndPopUp 
        scoreRound={[gameState.score, gameState.round]} 
        isLastRound={gameState.round > 4} 
        isOpen={roundEndOpen} 
        setClosed={setRoundEndOpen} 
        setGameState={setGameState}
      /> 
      <Stack sx={{p:2}} spacing={3} height="100vh" display="flex" flexDirection="column">
      <Item> <GameStats scoreRound={[gameState.total, gameState.round]} /> </Item>

        <Item sx={{flexGrow:1}}> <WorldMap/> </Item>
        <Item> 
          <Stack
            direction="row"
            spacing={2}
          >
            <InputRangeSlider 
              sx={{width:17/20}}
              callbackFunction={setRange}
              minValue={minValue}
              maxValue={maxValue}
            /> 
            <SubmitButton
              sx={{width:3/20}}
              guess={guessRange}
              setGameState={setGameState}
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
