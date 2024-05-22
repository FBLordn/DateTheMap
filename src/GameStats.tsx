import { Stack, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';


export default function GameStats() {
    
    
    
    return(
        <Stack
            direction="row"
            display="flex"
            justifyContent="space-evenly"
            sx={{width:"auto", height:"auto"}}
        >
            <Typography>
                Round: 1/5
            </Typography>
        
            <PublicIcon />

            <Typography>
                Score: 30000
            </Typography>
        </Stack>
    );
}