import * as React from 'react';
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import { Stack } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import IncrementInput from '../../components/IncrementInput';

const minValue = 1000;
const maxValue = 2024;

const Input = styled(MuiInput)`
  width: 42px;
`;

interface ListHeaderProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  callbackFunction: (val: number[]) => void;
}

export default function YearSelection({sx = [], callbackFunction, children }: ListHeaderProps) {
  const [value, setValue] = React.useState<(number | '')[]>([minValue, maxValue]);

  const handleSliderChange = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      newValue = [newValue, newValue]
    }

    if (activeThumb === 0) {
      setValue([newValue[0], value[1]]);
    } else if (activeThumb === 1) {
      setValue([value[0], newValue[1]]);
    } else {
      setValue(newValue)
    }
    console.log("Slider", value);
    callbackFunction([newValue[0] || minValue, newValue[1] || maxValue]);
  };


  const handleMinInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSliderChange(event as unknown as Event, '' ? 0 : Number(event.target.value), 0)
  };

  const handleMaxInputChange = (event: SyntheticIncrementEvent) => {
    handleSliderChange(event as unknown as Event, '' ? 0 : Number(event.target.value), 1)
  };

  const onChangeCommited = (event: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) =>
    {
      handleSliderChange(event as unknown as Event, value, 2)
    }

  return (
    <Stack 
      direction="row"
      spacing={3}
      sx={sx}
    >

      <Input
        value={value[0]}
        size="small"
        sx={{minWidth:65}}
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
        color='secondary'
        sx={{ ml:5, mr:5,}}
        min={minValue} 
        max={maxValue}
        value={[value[0] || minValue, value[1] || maxValue]}
        onChange={handleSliderChange}
        onChangeCommitted={onChangeCommited}
        valueLabelDisplay="auto"
        getAriaValueText={(v)=> `${v}`}
      />

      <IncrementInput
        value={value[1]}
        size="small"
        sx={{minWidth:65}}
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