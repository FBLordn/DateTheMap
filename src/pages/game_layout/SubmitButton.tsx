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
  setRoundEnded: (roundEnded: boolean) => void;
}

export default function SubmitButton({ sx = [], guess, setGameState: setGameState, setRoundEnded, children}: ListHeaderProps) {

  function handleClick(){
    invoke('make_guess', {guess: guess});
    invoke('get_game_state').then((gS) => gS as GameState).then((gameState) => setGameState(gameState));    
    setRoundEnded(true);
  }

  return (
    <Button
      sx={sx}
      variant="contained"
      onClick={handleClick}    
    >Submit</Button>
  );
}