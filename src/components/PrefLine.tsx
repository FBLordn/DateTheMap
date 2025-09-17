import { Stack, Typography } from "@mui/material";

interface PrefLineProps {
  title?: string;
}

export default function PrefLine({title, children}: React.PropsWithChildren<PrefLineProps>) {
  return (
    <Stack 
      sx={{width:1}}
      direction={"row"}
    >
      <Typography variant="h6" sx={{width:0.25}}> {title} </Typography>
      {children}
    </Stack>
  )
}