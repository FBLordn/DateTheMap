import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { SxProps, Theme } from '@mui/material/styles';

interface GameEndDialogProps {
  children?: React.ReactNode; 
  sx?: SxProps<Theme>;
  onReturnToMenu: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  scoreText: string;
  resetGame: () => void;
}

export default function GameEndDialog({sx, onReturnToMenu, scoreText, setIsOpen, isOpen, resetGame} : GameEndDialogProps) {

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
      sx={sx}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
    <DialogContent>
      <DialogContentText id="alert-dialog-description" sx={{h:2/3, w:4/5}}>
          {scoreText}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleFinishButton}>Main Menu</Button>
        <Button onClick={handleNewButton} autoFocus>New Game</Button>
    </DialogActions>
    </Dialog>
  );
}
