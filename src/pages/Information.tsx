import { Button, Divider, Stack, Typography } from "@mui/material";
import PrefLine from "../components/PrefLine";

interface InformationProps {
  onApply : () => void 
}

export default function Information({onApply} : InformationProps) {
    return <Stack height="100vh">
      <Typography variant='h1'>
        {"Credits"}
      </Typography>
      <Stack 
        spacing={3}
        margin={4}
        direction="column" sx={{ alignItems: 'center', mb: 1}}
        divider={<Divider flexItem orientation="horizontal"/>}
      >
        <PrefLine title="Creator">
          <a href='https://github.com/FBLordn' color="inherit" target="_blank" rel="noopener"> <Typography variant="h5"> {"FBLordn"} </Typography> </a>
        </PrefLine>
        <PrefLine title="Source">
          <a href='https://www.openhistoricalmap.org/' color="inherit" target="_blank" rel="noopener"> <Typography variant="h5"> {"OpenHistoricalMap"} </Typography> </a>
        </PrefLine>
      <PrefLine>
        <Button onClick={onApply} color="primary" variant="contained" sx={{minWidth:1/4, maxWidth:1/3, alignSelf:'center'}}>
          {"Main Menu"}
        </Button>
      </PrefLine>
      </Stack>
    </Stack>
}