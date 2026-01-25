import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { SxProps, Theme } from '@mui/material/styles';
import PrefLine from '../../components/PrefLine';
import { Stack, Typography } from '@mui/material';

interface GameEndDialogProps {
  children?: React.ReactNode; 
  sx?: SxProps<Theme>;
  paperSx?: SxProps<Theme>;
  onReturnToMenu: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  resetGame: () => void;
  score: number;
  roundAmount: number;
}

export default function GameEndDialog({paperSx, sx, onReturnToMenu, score, roundAmount, setIsOpen, isOpen, resetGame} : GameEndDialogProps) {

  const handleClose = () => {
    setIsOpen(false);
  };

  function handleFinishButton() {
    resetGame();
    onReturnToMenu();
    handleClose();
  }

  function handleNewButton() {
    resetGame();
    handleClose();
  }

  return (
    <Dialog
      slotProps={{paper:{sx:paperSx}}}
      sx={sx}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <PrefLine title="Score" sx={{width:1, justifyContent:"space-between"}}>
            <Typography sx={{alignContent:'center'}}>
              {`${score} / ${5000*roundAmount}`}
            </Typography>
          </PrefLine>
          <PrefLine title="Average" sx={{width:1, justifyContent:"space-between"}}>
            <Typography sx={{alignContent:'center'}}>
              {`${Math.round(score/roundAmount)} / 5000`}
            </Typography>
          </PrefLine>
          
        </DialogContentText>
      </DialogContent>
      <Stack
        sx={{p:1, ml:2, mr:2}}
        direction={'row'}
        justifyContent={'space-between'}
      >
        <Button onClick={handleFinishButton}>Main Menu</Button>
        <Button onClick={handleNewButton} autoFocus>New Game</Button>
      </Stack>
    </Dialog>
  );
}
