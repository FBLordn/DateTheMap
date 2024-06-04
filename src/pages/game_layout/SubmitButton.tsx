import * as React from 'react';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { invoke } from '@tauri-apps/api';
import { GameState } from '../../ApiTypes';

interface ListHeaderProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  guess: number[];
  setGameState: (newGameState: GameState) => void;
  isLastRound: boolean;
  setRoundEnded: (roundEnded: boolean) => void;
}

export default function SubmitButton({ sx = [], guess, setGameState: setGameState, isLastRound, setRoundEnded, children}: ListHeaderProps) {

  function handleClick(){
    setRoundEnded(true);
    invoke('make_guess', {guess: guess});
    invoke('get_game_state').then((gS) => gS as GameState).then((gameState) => setGameState(gameState));    
    if(!isLastRound) {
      invoke('new_round');
    } else {
      invoke('reset')
    }
  }

  return (
    <Button
      sx={sx}
      variant="contained"
      onClick={handleClick}    
    >Submit</Button>
  );
}