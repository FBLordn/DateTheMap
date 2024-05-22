import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { Stack } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

const minValue = 1000;
const maxValue = 2024;

const Input = styled(MuiInput)`
  width: 42px;
`;

interface ListHeaderProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function YearSelection({sx = [], children }: ListHeaderProps) {
  const [value, setValue] = React.useState<(number | '')[]>([minValue, maxValue]);

  const handleSliderChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([newValue[0], value[1]]);
    } else {
      setValue([value[0], newValue[1]]);
    }
  };

  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue([
      event.target.value === '' ? '' : Number(event.target.value),
      value[1]
    ]);
  };

  const handleMaxInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue([
      value[0], 
      event.target.value === '' ? '' : Number(event.target.value)
    ]);
  };

  return (
    <Stack 
      direction="row"
      spacing={3}
      sx={sx}
    >

      <Input
        value={value[0]}
        size="small"
        sx={{width:75}}
        onChange={handleMinInputChange}
        inputProps={{
          step: 5,
          min: minValue,
          max: maxValue,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
      
      <Slider
        getAriaLabel={() => 'year range'}
        sx={{ ml:5, mr:5,}}
        min={minValue} 
        max={maxValue}
        value={[value[0] || minValue, value[1] || maxValue]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        getAriaValueText={(v)=> `${v}`}
      />

      <Input
        value={value[1]}
        size="small"
        sx={{width:75}}
        onChange={handleMaxInputChange}
        inputProps={{
          step: 5,
          min: minValue,
          max: maxValue,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
      />
        
    </Stack>
  );
}