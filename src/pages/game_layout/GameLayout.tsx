import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import WorldMap from './WorldMap';
import InputRangeSlider from '../../components/InputRangeSlider';
import GameStats from './GameStats';
import { GameState } from '../../ApiTypes';
import { invoke } from '@tauri-apps/api';
import { Typography } from '@mui/material';
import PolyButtons from '../../components/PolyButtons';


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

  const [roundOver, setRoundOver] = React.useState<boolean>(false);
  

  function getGameState() {
    invoke('get_game_state').then((gS) => gS as GameState).then((gameState) => setGameState(gameState));    
  }

  React.useEffect(() => {
    getGameState();
  }, []);

  function getActiveButtonIndex(roundOver: boolean, round: number | undefined) {
    if (roundOver) {
      return round===5 ? 2 : 1;
    } else {
      return 0;
    }
  }

  const buttonInUse = React.useMemo( () => getActiveButtonIndex(roundOver, gameState?.round),[roundOver, gameState?.round],);

  function handleSubmitButtonClick(){
    invoke('make_guess', {guess: guessRange});
    getGameState();
    setRoundOver(true);
  }

  function handleNextRoundButtonClick() {
    setRoundOver(false);
    invoke('new_round');
    getGameState();
  };

  function handleFinishButtonClick() {
    invoke('reset')
    setIsPlaying(false);
  }

  return (
    gameState ?
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
            <PolyButtons
              sx={{width:3/20}}
              labels={["Submit", "Continue", "Finish"]}
              clickHandlers={[handleSubmitButtonClick, handleNextRoundButtonClick, handleFinishButtonClick]}
              index={buttonInUse}
            />
          </Stack>
        </Item>
      </Stack>
      :
      <Item>
        <Typography> "Sorgy, accident" </Typography>
      </Item>
  );
}
