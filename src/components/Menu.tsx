import { Button, Stack, SxProps, Theme, Typography, useTheme } from '@mui/material';
import * as React from 'react';


interface ListHeaderProps {
  sx?: SxProps<Theme>;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  title?: string;
  buttonName?: string;
}

export default function Menu({sx, onSubmit, title, buttonName, children}: React.PropsWithChildren<ListHeaderProps>) {
  return (
    <Stack sx={sx}>
      <Typography variant='h1'>
        {title}
      </Typography>

      {children}

      <Button onClick={onSubmit} color="primary" variant="contained">
        {buttonName}
      </Button>
    </Stack>
  ) 
}