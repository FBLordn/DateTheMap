import * as React from 'react';
import Button from '@mui/material/Button';
import { Theme, styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import { invoke } from '@tauri-apps/api';
import { GameState } from '../../ApiTypes';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface ListHeaderProps {
  children?: React.ReactNode;
  scoreRound: number[];
  isLastRound: boolean;
  isOpen: boolean;
  setClosed: (open: boolean) => void;
  setGameState: (newGameState: GameState) => void;
}

export default function CustomizedDialogs({scoreRound, isLastRound, isOpen, setClosed, setGameState, children}: ListHeaderProps) {

  
  const handleClose = () => {
    setClosed(false);
    invoke('new_round');
    invoke('get_game_state').then((gS) => gS as GameState).then((gameState) => setGameState(gameState));    
  };

  const buttonName = isLastRound ? "Finish" : "Next Round";

  return (
    <React.Fragment>
      <BootstrapDialog
        sx={{p:2}}
        fullWidth={true}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        onClose={handleClose}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Round {scoreRound[1]}
        </DialogTitle>
        <DialogContent dividers> 
        <Typography > 
          Score: {scoreRound[0]} 
        </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {buttonName}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}