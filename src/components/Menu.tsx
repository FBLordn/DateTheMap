import { Button, Stack, SxProps, Theme, Typography } from '@mui/material';
import * as React from 'react';


interface MenuProps {
  sx?: SxProps<Theme>;
  onSubmit?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  title?: string;
  buttonName?: string;
}

export default function Menu({sx, onSubmit, title, buttonName, children}: React.PropsWithChildren<MenuProps>) {
  if(title) {
    return (
      <Stack sx={sx}>
        <Typography variant='h1' sx={{height:"10%"}}>
          {title}
        </Typography>

        <div style={{height:"80%"}}>
        {children}
        </div>
        
        <Button onClick={onSubmit} color="primary" variant="contained" sx={{minWidth:1/4, maxWidth:1/3, alignSelf:'center', height:"10%"}}>
          <Typography sx={{height:"100%"}}>
            {buttonName}
          </Typography>
        </Button>
      </Stack>
    ) 
  } else {
    return (
      <Stack sx={sx}>
        <div style={{height:"93%"}}>
          {children}
        </div>

        <Button onClick={onSubmit} color="primary" variant="contained" sx={{minWidth:1/4, maxWidth:1/3, alignSelf:'center', height:"7%"}}>
          <Typography sx={{fontSize:"3vh"}}>
            {buttonName}
          </Typography>
        </Button>
      </Stack>
    ) 
  }
}