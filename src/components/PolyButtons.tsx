import * as React from 'react';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

interface PolyButtonsProp {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  labels?: string[];
  clickHandlers: React.MouseEventHandler<HTMLButtonElement>[];
  index: number;
}

export default function PolyButtons({ sx = [], labels, clickHandlers, index}: PolyButtonsProp) {

  return (
    <Button
      sx={sx}
      variant="contained"
      onClick={clickHandlers[index]}    
    >{labels ? labels[index] : ""}</Button>
  );
}