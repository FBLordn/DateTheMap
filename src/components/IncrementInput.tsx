import { IconButton, Input, PaletteColor, Stack, useTheme } from "@mui/material"
import { InputProps } from "@mui/material"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React from "react";

const WIDTH_MULTIPLIER = 13;

type InputPropsNoOnChange = Omit<InputProps, "onChange">

interface IncrementInputProps extends InputPropsNoOnChange {
  bgColor?: PaletteColor,
  buttonColor?: PaletteColor,
  onChange?: (event: SyntheticIncrementEvent) => void
}


export default function IncrementInput(props : IncrementInputProps) {
  const [value, setValue] = React.useState(props.value as number)
  const theme = useTheme();
  const step = React.useMemo(() => (props.inputProps?.step || 1), [props.inputProps])
  const maxInputLength = React.useMemo(
    () => Math.max(props.value as number, props.inputProps?.min, props.inputProps?.max).toString().length,
    [props.value, props.inputProps?.min, props.inputProps?.max]
  )

  React.useEffect(() => { setValue(props.value as number) }, [props.value]);

  const onIncrement = () => {
    if (!props.disabled) {
      const newValue = Math.min(value + step, (props.inputProps?.max || Number.MAX_VALUE))
      setValue(newValue)
      if (props?.onChange) { props?.onChange({ target: { value: newValue } }) }
    }
  }

  const onDecrement = () => {
    if (!props.disabled) {
      const newValue = Math.max(value - step, (props.inputProps?.min || Number.MIN_VALUE))
      setValue(newValue)
      if (props?.onChange) { props?.onChange({ target: { value: newValue } }) }
    }
  }

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.target.value.length <= maxInputLength) {
      if (props?.onChange) { props.onChange({ target: { value: Number(event.target.value) } }) }
    }
  }

  const onInputBlur = () => {
    const newValue = Math.min(
      (props.inputProps?.max || Number.MAX_VALUE),
      Math.max(value, (props.inputProps?.min || Number.MIN_VALUE))
    )
    setValue(newValue)
    if (props?.onChange) { props.onChange({ target: { value: newValue } }) }
  }

  return (
    <Stack direction="row">
      <Input {...props}
        sx={[
          {
            "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
              WebkitAppearance: "none",
              margin: 0,
            },
            "input[type=number]": {
              MozAppearance: "textfield",
            },
          },
          ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
          {
            minWidth: maxInputLength * WIDTH_MULTIPLIER,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: theme.shape.borderRadius,
            borderBottomLeftRadius: theme.shape.borderRadius,
            pl: 1,
            backgroundColor: props.bgColor?.main || theme.palette.secondary.main
          },
        ]}
        disableUnderline={true}
        value={value}
        onChange={onInputChange}
        onBlur={onInputBlur}
      >
      </Input>
      <Stack direction="column">
        <IconButton
          sx={{
            minHeight: 1 / 2,
            maxHeight: 1 / 2,
            borderTopRightRadius: theme.shape.borderRadius,
            borderBottomRightRadius: 0,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            backgroundColor: props.buttonColor?.main || theme.palette.primary.main,
            padding: 0
          }}
          onClick={onIncrement}
        >
          <ArrowDropUpIcon sx={{ fontSize: 14 }} />
        </IconButton>
        <IconButton
          sx={{
            minHeight: 1 / 2,
            maxHeight: 1 / 2,
            borderTopRightRadius: 0,
            borderBottomRightRadius: theme.shape.borderRadius,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            backgroundColor: props.buttonColor?.main || theme.palette.primary.main,
            padding: 0
          }}
          onClick={onDecrement}
        >
          <ArrowDropDownIcon sx={{ fontSize: 14 }} />
        </IconButton>
      </Stack>
    </Stack>
  )
}