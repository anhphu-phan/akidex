import React from "react"
import { IconButton, SxProps, Theme } from "@mui/material"
import LightModeIcon from "@mui/icons-material/LightMode"
import BedtimeIcon from "@mui/icons-material/Bedtime"
import { useAppDispatch, useAppSelector } from "store/hooks"
import { selectColorScheme, toggleMode } from "store/slices/customizationSlice"

interface ColorModeSwitchingProps {
    sx?: SxProps<Theme>
}

const ColorModeSwitching = ({ sx }: ColorModeSwitchingProps) => {
    const colorMode = useAppSelector(selectColorScheme)
    const dispatch = useAppDispatch()

    const handleToggleColorMode = () => {
        dispatch(toggleMode())
    }

    return (
        <IconButton
            sx={{
                p: 0.5,
                color: "#fff",
                border: "1px solid #E0E3E7",
                width: 40,
                height: 40,
                ...sx,
            }}
            onClick={handleToggleColorMode}
        >
            {colorMode === "light" ? <BedtimeIcon /> : <LightModeIcon color="warning" />}
        </IconButton>
    )
}

export default ColorModeSwitching
