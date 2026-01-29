import { Stack, Typography } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';


interface GameStatsProps {
  children?: React.ReactNode;
  scoreRound: number[];
  roundAmount: number;
}

export default function GameStats({scoreRound, roundAmount}: GameStatsProps) {
  
  return(
    <Stack
      direction="row"
      display="flex"
      justifyContent="space-evenly"
      sx={{width:"auto", height:"auto"}}
    >
      <Typography>
        Round: {scoreRound[1]}/{roundAmount}
      </Typography>
  
      <PublicIcon />

      <Typography>
        Total: {scoreRound[0]}
      </Typography>
    </Stack>
  );
}