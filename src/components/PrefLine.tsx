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
    >
      <Typography variant="h6" sx={{width:1/4}}> {title} </Typography>
      {children}
    </Stack>
  )
}