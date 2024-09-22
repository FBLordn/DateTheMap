import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import InputRangeSlider from '../../components/InputRangeSlider';
import GameStats from './GameStats';
import { GameState, Range } from '../../ApiTypes';
import { invoke } from '@tauri-apps/api';
import { Typography } from '@mui/material';
import PolyButtons from '../../components/PolyButtons';
import { ThemeProvider } from '@emotion/react';
import GameEndDialog from './GameEndDialog';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface ListHeaderProps {
  setIsPlaying: (isPlaying: boolean) => void;
}

const css:React.CSSProperties={"height":"100%", "maxWidth":"100%"};

let round_amount: number;
invoke('get_round_amount').then((result) => round_amount = result as number);
let possible_range: Range;
invoke('get_possible_range').then((range) =>  possible_range = range as Range);

export default function GameLayout({setIsPlaying}: ListHeaderProps) {
  
  const [gameState, setGameState] = React.useState<GameState>();

  const [roundOver, setRoundOver] = React.useState<boolean>(false);

  const [guessRange, setRange] = React.useState([possible_range.lower_bound, possible_range.upper_bound]);

  function getGameState() {
    invoke('get_game_state').then((gameState) => setGameState(gameState as GameState));
  }

  React.useEffect(() => {
    getGameState();
  }, []);

  function getActiveButtonIndex(roundOver: boolean, round: number | undefined) {
    if (roundOver) {
      return round===round_amount ? 2 : 1;
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

  const [gameEndOpen, setGameEndOpen] = React.useState(false);

  function handleFinishGameButton() {
    setGameEndOpen(true);
  }
  
  function resetGame() {
    invoke('reset');
    getGameState();
    setRange([possible_range.lower_bound,possible_range.upper_bound]);
    setRoundOver(false);
  }

  return (
    gameState ?
      <Stack sx={{p:2}} spacing={3} height="100vh" display="flex" flexDirection="column">
        <Item> <GameStats scoreRound={[gameState.total, gameState.round]} /> </Item>
        <Item sx={{m:1, flexGrow:1}}> <div dangerouslySetInnerHTML={{__html: gameState.world_map.html}} style={css} /> </Item>
        <Item> 
          <Stack
            direction="row"
            spacing={2}
          >
            <InputRangeSlider 
              sx={{width:17/20}}
              callbackFunction={setRange}
              minValue={possible_range.lower_bound}
              maxValue={possible_range.upper_bound}
              disabled={roundOver}
              additionalThumbs={roundOver ? [gameState.world_map.correct] : []}
            />
            <PolyButtons
              sx={{width:3/20, minWidth:90}}
              labels={["Submit", "Continue", "Finish"]}
              clickHandlers={[handleSubmitButtonClick, handleNextRoundButtonClick, handleFinishGameButton]}
              index={buttonInUse}
            />
            <GameEndDialog 
              resetGame={resetGame}
              isOpen={gameEndOpen}
              setIsOpen={setGameEndOpen}
              setIsPlaying={setIsPlaying}
              scoreText= {`${gameState.total} / ${5000*round_amount}`}
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
