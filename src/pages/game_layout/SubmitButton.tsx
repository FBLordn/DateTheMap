import * as React from 'react';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { invoke } from '@tauri-apps/api';
import { GameState } from './ApiTypes';

interface ListHeaderProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  guess: number[];
  setGameState: (newGameState: GameState) => void;
}

export default function SubmitButton({ sx = [], guess, setGameState: setGameState, children}: ListHeaderProps) {

    function handleClick(){
        console.log("Button", guess);
        invoke('finish_round', {guess: guess});
        invoke('get_game_state').then((gS) => gS as GameState).then((gameState) => setGameState(gameState));
        return 
    }
    return (
        <Button
            sx={sx}
            variant="contained"
            onClick={handleClick}    
        >Submit</Button>
    );
}