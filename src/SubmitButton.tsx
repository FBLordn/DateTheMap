import * as React from 'react';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/material/styles';

function handleClick(){
    return 
}

interface ListHeaderProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function SubmitButton({ sx = [], children }: ListHeaderProps) {
    return (
        <Button
            sx={sx}
            variant="contained"
            onClick={handleClick}    
        >Submit</Button>
    );
}
