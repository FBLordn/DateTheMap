import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import PrefLine from "../components/PrefLine";

interface InformationProps {
  onApply : () => void 
}

export default function Information({onApply} : InformationProps) {
  return (
    <Stack height="100vh" width="100vw">
      <Typography variant='h1'>
        {"Credits"}
      </Typography>
      <Box
        overflow={'auto'}
        sx={{height:"100vh"}}
      >
        <Stack 
          spacing={3}
          margin={4}
          direction="column" sx={{ alignItems: 'center', mb: 1}}
          divider={<Divider flexItem orientation="horizontal"/>}
        >
          <PrefLine title="Creator" sx={{width:1, justifyContent:"space-between", paddingRight:5}}>
            <a href='https://github.com/FBLordn' color="inherit" target="_blank" rel="noopener"> <Typography variant="h5"> {"FBLordn"} </Typography> </a>
          </PrefLine>
          <PrefLine title="Source" sx={{width:1, justifyContent:"space-between", paddingRight:5}}>
            <a href='https://www.openhistoricalmap.org/' color="inherit" target="_blank" rel="noopener"> <Typography variant="h5"> {"OpenHistoricalMap"} </Typography> </a>
          </PrefLine>
          <PrefLine title="Logo Design" sx={{width:1, justifyContent:"space-between", paddingRight:5}}>
            <Typography variant="h5"> {"Jarenissen"} </Typography>
          </PrefLine>
          <PrefLine title="Consultant" sx={{width:1, justifyContent:"space-between", paddingRight:5}}>
            <a href='https://github.com/StanleyRoberts' color="inherit" target="_blank" rel="noopener"> <Typography variant="h5"> {"Stan"} </Typography> </a>
          </PrefLine>
        </Stack>
      </Box>
      <Button onClick={onApply} color="primary" variant="contained" sx={{minWidth:1/4, maxWidth:1/3, alignSelf:'center', margin:3}}>
        {"Main Menu"}
      </Button>
    </Stack>
)}