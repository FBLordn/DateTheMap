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

export default function IncrementInput(props: IncrementInputProps) {
    console.log(props.value)
    const [value, setValue] = React.useState(props.value as number)
    const theme = useTheme();
    const step = React.useMemo(() => (props.inputProps?.step || 1), [props.inputProps])
    const max_input_length = React.useMemo(
        () => Math.max(props.value as number, props.inputProps?.min, props.inputProps?.max).toString().length,
        [props.value, props.inputProps?.min, props.inputProps?.max]
    )

    React.useEffect(() => { setValue(props.value as number) }, [props.value]);

    const onIncrement = () => {
        const new_val = value + step
        if ((new_val) <= (props.inputProps?.max || Number.MAX_VALUE)) {
            setValue(new_val)
            if (props?.onChange) {props?.onChange({target: {value: new_val}})}
        }
    }

    const onDecrement = () => {
        const new_val = value - step
        if ((new_val) >= (props.inputProps?.min || Number.MIN_VALUE)) {
            setValue(value - step)
            if (props?.onChange) {props?.onChange({target: {value: new_val}})}
        }
    }

    return (
        <Stack direction="row">
            <Input {...props}
                sx = {[
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
                        minWidth: max_input_length*WIDTH_MULTIPLIER,
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
                onChange={(event) => {
                    if (props?.onChange) {
                        props.onChange({target: {value: Number(event.target.value)}})
                    }
                }}
            >
            </Input>
        <Stack direction="column">
            <IconButton
                sx = {{
                    minHeight: 1/2,
                    maxHeight: 1/2,
                    borderTopRightRadius: theme.shape.borderRadius,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    backgroundColor: props.bgColor?.main || theme.palette.primary.main,
                    padding: 0
                }}
                onClick={onIncrement}
            >
                <ArrowDropUpIcon sx={{ fontSize: 14 }}/>
            </IconButton>
            <IconButton
                sx = {{
                    minHeight: 1/2,
                    maxHeight: 1/2,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: theme.shape.borderRadius,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    backgroundColor: props.bgColor?.main || theme.palette.primary.main,
                    padding: 0
                }}
                onClick={onDecrement}
            >
                <ArrowDropDownIcon sx={{ fontSize: 14 }}/>
            </IconButton>
        </Stack>
        </Stack>
    )
}