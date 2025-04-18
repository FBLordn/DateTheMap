import { Stack, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';


interface GameStatsProps {
  children?: React.ReactNode;
  scoreRound: number[];
}

export default function GameStats({scoreRound}: GameStatsProps) {
  
  return(
    <Stack
      direction="row"
      display="flex"
      justifyContent="space-evenly"
      sx={{width:"auto", height:"auto"}}
    >
      <Typography>
        Round: {scoreRound[1]}/5
      </Typography>
  
      <PublicIcon />

      <Typography>
        Total: {scoreRound[0]}
      </Typography>
    </Stack>
  );
}