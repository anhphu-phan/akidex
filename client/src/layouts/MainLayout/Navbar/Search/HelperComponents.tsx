import React from "react"
import {
    Box,
    Typography,
    inputBaseClasses,
    TextField as MuiTextField,
    styled,
    paperClasses,
    TypographyProps,
    Checkbox,
    checkboxClasses,
    CheckboxProps,
} from "@mui/material"
import { blue, green, purple } from "@mui/material/colors"
import { MediaType } from "types"

const inputHeight = 40

export function getSearchBoxWidth(expand: boolean) {
    return expand ? 400 : 200
}

export const TextField = styled(MuiTextField, {
    shouldForwardProp: (props) => props !== "expand" && props !== "ref", // prevent pass this prop down to avoid warning
})<{ expand: boolean }>(({ theme, expand }) => {
    return {
        backgroundColor: theme.palette.background.default,
        borderRadius: 999,
        height: inputHeight,
        [theme.breakpoints.up("xs")]: {
            width: "100%",
        },
        [theme.breakpoints.up("md")]: {
            width: expand ? "100%" : 200,
            maxWidth: 400,
            transition: theme.transitions.create("width", {
                duration: theme.transitions.getAutoHeightDuration(getSearchBoxWidth(true) - getSearchBoxWidth(false)),
            }),
        },

        [`& .${inputBaseClasses.root}`]: {
            height: "100%",
            borderRadius: "inherit",
        },

        [`& fieldset`]: {
            border: "none",
        },
    }
})

export const Title = styled((props) => <Typography variant="h6" {...props} />)(({ theme }) => ({
    width: "100%",
    fontSize: theme.typography.pxToRem(18),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontFamily: "inherit",
    fontWeight: 400,
})) as typeof Typography

export const Info = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(13),
    fontFamily: "inherit",
}))

export const MediaTypeName = styled((props) => <Typography component="span" {...props} />, {
    shouldForwardProp: (props) => props !== "type",
})<{ type: string } & TypographyProps>(({ theme, type }) => ({
    color: type.toUpperCase() === MediaType.Anime ? blue[700] : MediaType.Manga ? green[500] : purple[500],
    display: "inline-block",
    fontSize: theme.typography.pxToRem(13),
    fontWeight: 600,
    fontFamily: "inherit",
}))

export const ResultItemWrapper = styled((props) => <Box {...props} />)(({ theme }) => ({
    textDecoration: "none",

    [`&&& .${paperClasses.root}`]: { paddingInline: theme.spacing(0.5) },
    [`& .${paperClasses.root}:hover`]: { backgroundColor: theme.palette.background.hover },
    fontFamily: "Roboto",
})) as typeof Box

export const MediaTypeCheckbox = styled((props) => <Checkbox {...props} />, {
    shouldForwardProp: (props) => props !== "mediaType",
})<{ mediaType: MediaType } & CheckboxProps>(({ theme, mediaType }) => ({
    color: theme.palette.mediaType[mediaType][800],
    [`&.${checkboxClasses.checked}`]: {
        color: theme.palette.mediaType[mediaType][600],
    },
}))
