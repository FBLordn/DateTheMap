import { Button, Stack, SxProps, Theme, Typography } from '@mui/material';
import * as React from 'react';


interface MenuProps {
  sx?: SxProps<Theme>;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  title?: string;
  buttonName?: string;
}

export default function Menu({sx, onSubmit, title, buttonName, children}: React.PropsWithChildren<MenuProps>) {
  return (
    <Stack sx={sx}>
      <Typography variant='h1'>
        {title}
      </Typography>

      {children}
      
      <Button onClick={onSubmit} color="primary" variant="contained" sx={{minWidth:1/4, maxWidth:1/3, alignSelf:'center'}}>
        {buttonName}
      </Button>
    </Stack>
  ) 
}