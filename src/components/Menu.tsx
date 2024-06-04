import { Button, Stack, Typography } from '@mui/material';
import * as React from 'react';


interface ListHeaderProps {
  onSubmit?: React.MouseEventHandler<HTMLButtonElement> | undefined
  title?: string;
  buttonName?: string;
}

export default function Menu({onSubmit, title, buttonName, children}: React.PropsWithChildren<ListHeaderProps>) {

  return (
    <Stack sx={{p:2}} direction={'column'} >
      <Typography variant='h1'>
        {title}
      </Typography>

      {children}

      <Button onClick={onSubmit}>
        {buttonName}
      </Button>
    </Stack>
  ) 
}