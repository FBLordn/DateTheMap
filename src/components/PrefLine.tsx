import { Stack, SxProps, Theme, Typography } from "@mui/material";

interface PrefLineProps {
  title?: string;
  sx?: SxProps<Theme>;
}

export default function PrefLine({title, children, sx}: React.PropsWithChildren<PrefLineProps>) {
  return (
    <Stack 
      sx={sx}
      direction={"row"}
      display={"flex"}
    >
      <Typography variant="h6" sx={{width:"20%"}}> {title} </Typography>
      <div style={{width:"80%"}}>
        {children}
      </div>
    </Stack>
  )
}