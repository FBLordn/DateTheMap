import * as React from 'react';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';
import { invoke } from '@tauri-apps/api';
import YearSelection from './YearSelection';

interface ListHeaderProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  guess: number[];
}

export default function SubmitButton({ sx = [], guess, children}: ListHeaderProps) {

    function handleClick(){
        console.log("Button", guess);
        invoke('finish_round', {guess: guess});
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
