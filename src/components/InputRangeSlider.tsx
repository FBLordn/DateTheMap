import * as React from 'react';
import Slider from '@mui/material/Slider';
import { Stack, Tooltip, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import NumberField from './NumberField';


interface InputRangeSliderProps {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  additionalThumbs?: number[];
  callbackFunction: (val: number[]) => void;
  minValue: number
  maxValue: number
}

export default function InputRangeSlider({sx = [], callbackFunction, minValue, maxValue, disabled, additionalThumbs }: InputRangeSliderProps) {
  const [wasDisabled, setDisabled] = React.useState<boolean>(disabled || false);
  const [value, setValue] = React.useState<(number)[]>([minValue, maxValue]);
  if(wasDisabled != disabled) {
    if(wasDisabled) {
      setValue([minValue, maxValue]);
      callbackFunction([minValue, maxValue]);
    }
    setDisabled(disabled || false);
  }
  const thumbs = [value[0] || minValue, value[1] || maxValue, ...additionalThumbs || []];
  const theme = useTheme();

  const onSliderChange = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => onValueChange(newValue, activeThumb)

  const onValueChange = (
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!disabled) {
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
      callbackFunction([newValue[0], newValue[1]]);
    }
  };

  const onChangeCommited = (event: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) =>
    {
      onSliderChange(event as unknown as Event, value, 2)
    }
  
  function isInGuessRange(val: number) {
    const first = thumbs[0];
    const second = thumbs[1];
    return ((val >= first && val <= second) || (val <= first && val >= second));
  }

  function getThumbColours() { 
    const sortedThumbs = thumbs.toSorted();
    let list = {};
    let index = 0;
    for(let thumb of sortedThumbs) {
      list = {
        ...list, 
        ...({[`&[data-index='${index}']`]: 
          { backgroundColor: 
            ((additionalThumbs || []).includes(thumb)) ? 
              (isInGuessRange(thumb) ? 
                theme.palette.success.main 
                : 
                theme.palette.error.main
              ) 
              : 
              theme.palette.secondary.main
          }
        })
      }; //I'm sorry
      index += 1;
    }
    return list;
  }

  interface CustomValueLabelProps {
    children: React.ReactElement;
    open: boolean;
    value: number;
    index: number;
  }

  const CustomValueLabel: React.FC<CustomValueLabelProps> = ({ children, open, value }) => {
    return (
      <Tooltip
        open={open || (additionalThumbs || []).includes(value) } // Always show correct button
        enterTouchDelay={0}
        placement="top"
        title={value}
      >
        {children}
      </Tooltip>
    );
  };

  return (
    <Stack 
      direction="row"
      spacing={3}
      sx={sx}
    >
      <NumberField
        disabled={disabled}
        label="From" 
        value={value[0]} 
        onValueCommitted={(new_val) => onValueChange(new_val==null ? value[0] : Math.round(new_val), 0)}
        min={minValue}
        max={maxValue}
        size='small'
        format={{useGrouping:false}}
      />

      <Slider
        getAriaLabel={() => 'year range'}
        color='secondary'
        sx={{ ml:5, mr:5,
          "& .MuiSlider-thumb": {
            ...getThumbColours()
          }
        }}
        track={disabled ? false : "normal"}
        min={minValue} 
        max={maxValue}
        value={thumbs}
        onChange={onSliderChange}
        onChangeCommitted={onChangeCommited}
        getAriaValueText={(v)=> `${v}`}
        valueLabelDisplay='auto'
        slotProps={{valueLabel: CustomValueLabel}}
      />

      <NumberField
        disabled={disabled}
        label="To" 
        value={value[1]} 
        onValueCommitted={(new_val) => onValueChange(new_val==null ? value[0] : Math.round(new_val), 0)}
        min={minValue}
        max={maxValue}
        size='small'
        format={{useGrouping:false}}
      />
    </Stack>
  );
}