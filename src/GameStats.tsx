import { Stack, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';


interface ListHeaderProps {
  children?: React.ReactNode;
  round?: number;
  score?: number;
}

export default function GameStats({round, score, children}: ListHeaderProps) {
    
    return(
        <Stack
            direction="row"
            display="flex"
            justifyContent="space-evenly"
            sx={{width:"auto", height:"auto"}}
        >
            <Typography>
                Round: {round}/5
            </Typography>
        
            <PublicIcon />

            <Typography>
                Score: {score}
            </Typography>
        </Stack>
    );
}