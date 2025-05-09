import { Divider, Stack } from "@mui/material";
import Menu from "../components/Menu";
import PrefLine from "../components/PrefLine";

interface SettingsProps {
    onApply : () => void
    children: [string, JSX.Element][];
}

export default function Settings({onApply, children}: SettingsProps) {

  function applySettings() {
    onApply();
  }

  return (
    <Menu
      onSubmit={applySettings}
      title="Settings"
      buttonName="Apply"
      sx={{height:'100vh'}}
    >
      <Stack 
        spacing={2}
        margin={5} 
        direction="column" sx={{ alignItems: 'center', mb: 1 }}
        divider={<Divider flexItem orientation="horizontal"/>}
      >
        {children.map((child) => <PrefLine title={child[0]}> {child[1]} </PrefLine>)}
      <Divider/>
      </Stack>
    </Menu>
  );
}